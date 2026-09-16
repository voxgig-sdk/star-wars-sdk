# StarWars Ruby SDK



The Ruby SDK for the StarWars API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Film` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/star-wars-sdk/releases](https://github.com/voxgig-sdk/star-wars-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "StarWars_sdk"

client = StarWarsSDK.new
```

### 2. List film records

```ruby
begin
  # list returns an Array of Film records — iterate directly.
  films = client.Film.list
  films.each do |item|
    puts "#{item["id"]} #{item["characters"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```

### 3. Load a film

```ruby
begin
  # load returns the ENTITY — call data_get for the Film record (raises on error).
  film = client.Film.load({ "id" => 1 })
  puts film
rescue => err
  warn "load failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  persons = client.Person.list()
rescue => err
  warn "list failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```ruby
client = StarWarsSDK.test({
  "entity" => { "person" => { "test01" => { "id" => "test01" } } },
})

# Entity ops return the ENTITY (raises on error);
# call data_get for the mock record.
person = client.Person.list()
puts person
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = StarWarsSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
STAR_WARS_TEST_LIVE=TRUE
```

Then run:

```bash
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### StarWarsSDK

```ruby
require_relative "StarWars_sdk"
client = StarWarsSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = StarWarsSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### StarWarsSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
| `Film` | `(data) -> FilmEntity` | Create a Film entity instance. |
| `PeopleList` | `(data) -> PeopleListEntity` | Create a PeopleList entity instance. |
| `Person` | `(data) -> PersonEntity` | Create a Person entity instance. |
| `Planet` | `(data) -> PlanetEntity` | Create a Planet entity instance. |
| `Species` | `(data) -> SpeciesEntity` | Create a Species entity instance. |
| `Starship` | `(data) -> StarshipEntity` | Create a Starship entity instance. |
| `Vehicle` | `(data) -> VehicleEntity` | Create a Vehicle entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all). Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `StarWarsError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

### Entities

#### Film

| Field | Description |
| --- | --- |
| `characters` | An array of people resource URLs that are in this film |
| `created` | The ISO 8601 date format of the time that this resource was created |
| `director` | The name of the director of this film |
| `edited` | The ISO 8601 date format of the time that this resource was edited |
| `episode_id` | The episode number of this film |
| `id` |  |
| `opening_crawl` | The opening paragraphs at the beginning of this film |
| `planets` | An array of planet resource URLs that are in this film |
| `producer` | The name(s) of the producer(s) of this film |
| `release_date` | The release date of this film |
| `species` | An array of species resource URLs that are in this film |
| `starships` | An array of starship resource URLs that are in this film |
| `title` | The title of this film |
| `url` | The hypermedia URL of this resource |
| `vehicles` | An array of vehicle resource URLs that are in this film |

Operations: List, Load.

API path: `/films`

#### PeopleList

| Field | Description |
| --- | --- |

Operations: .

API path: ``

#### Person

| Field | Description |
| --- | --- |
| `birth_year` | The birth year of the person, using the in-universe standard of BBY or ABY |
| `created` | The ISO 8601 date format of the time that this resource was created |
| `edited` | The ISO 8601 date format of the time that this resource was edited |
| `eye_color` | The eye color of this person |
| `films` | An array of film resource URLs that this person has been in |
| `gender` | The gender of this person |
| `hair_color` | The hair color of this person |
| `height` | The height of the person in centimeters |
| `homeworld` | The URL of the planet resource that this person was born on |
| `id` |  |
| `mass` | The mass of the person in kilograms |
| `name` | The name of this person |
| `skin_color` | The skin color of this person |
| `species` | An array of species resource URLs that this person belongs to |
| `starships` | An array of starship resource URLs that this person has piloted |
| `url` | The hypermedia URL of this resource |
| `vehicles` | An array of vehicle resource URLs that this person has piloted |

Operations: List, Load.

API path: `/people`

#### Planet

| Field | Description |
| --- | --- |
| `climate` | The climate of this planet |
| `created` | The ISO 8601 date format of the time that this resource was created |
| `diameter` | The diameter of this planet in kilometers |
| `edited` | The ISO 8601 date format of the time that this resource was edited |
| `films` | An array of Film URL Resources that this planet has appeared in |
| `gravity` | A number denoting the gravity of this planet |
| `id` |  |
| `name` | The name of this planet |
| `orbital_period` | The number of standard days it takes for this planet to complete a single orbit of its local star |
| `population` | The average population of sentient beings inhabiting this planet |
| `residents` | An array of People URL Resources that live on this planet |
| `rotation_period` | The number of standard hours it takes for this planet to complete a single rotation on its axis |
| `surface_water` | The percentage of the planet surface that is naturally occurring water |
| `terrain` | The terrain of this planet |
| `url` | The hypermedia URL of this resource |

Operations: List, Load.

API path: `/planets`

#### Species

| Field | Description |
| --- | --- |
| `average_height` | The average height of this species in centimeters |
| `average_lifespan` | The average lifespan of this species in years |
| `classification` | The classification of this species |
| `created` | The ISO 8601 date format of the time that this resource was created |
| `designation` | The designation of this species |
| `edited` | The ISO 8601 date format of the time that this resource was edited |
| `eye_colors` | A comma-separated string of common eye colors for this species |
| `films` | An array of Film URL Resources that this species has appeared in |
| `hair_colors` | A comma-separated string of common hair colors for this species |
| `homeworld` | The URL of a planet resource that is the homeworld of this species |
| `id` |  |
| `language` | The language commonly spoken by this species |
| `name` | The name of this species |
| `people` | An array of People URL Resources that are a part of this species |
| `skin_colors` | A comma-separated string of common skin colors for this species |
| `url` | The hypermedia URL of this resource |

Operations: List, Load.

API path: `/species`

#### Starship

| Field | Description |
| --- | --- |
| `MGLT` | The Maximum number of Megalights this starship can travel in a standard hour |
| `cargo_capacity` | The maximum number of kilograms that this starship can transport |
| `consumables` | The maximum length of time that this starship can provide consumables for its entire crew without having to resupply |
| `cost_in_credits` | The cost of this starship new, in galactic credits |
| `created` | The ISO 8601 date format of the time that this resource was created |
| `crew` | The number of personnel needed to run or pilot this starship |
| `edited` | The ISO 8601 date format of the time that this resource was edited |
| `films` | An array of Film URL Resources that this starship has appeared in |
| `hyperdrive_rating` | The class of this starships hyperdrive |
| `id` |  |
| `length` | The length of this starship in meters |
| `manufacturer` | The manufacturer of this starship |
| `max_atmosphering_speed` | The maximum speed of this starship in atmosphere |
| `model` | The model or official name of this starship |
| `name` | The name of this starship |
| `passengers` | The number of non-essential people this starship can transport |
| `pilots` | An array of People URL Resources that this starship has been piloted by |
| `starship_class` | The class of this starship |
| `url` | The hypermedia URL of this resource |

Operations: List, Load.

API path: `/starships`

#### Vehicle

| Field | Description |
| --- | --- |
| `cargo_capacity` | The maximum number of kilograms that this vehicle can transport |
| `consumables` | The maximum length of time that this vehicle can provide consumables for its entire crew without having to resupply |
| `cost_in_credits` | The cost of this vehicle new, in galactic credits |
| `created` | The ISO 8601 date format of the time that this resource was created |
| `crew` | The number of personnel needed to run or pilot this vehicle |
| `edited` | The ISO 8601 date format of the time that this resource was edited |
| `films` | An array of Film URL Resources that this vehicle has appeared in |
| `id` |  |
| `length` | The length of this vehicle in meters |
| `manufacturer` | The manufacturer of this vehicle |
| `max_atmosphering_speed` | The maximum speed of this vehicle in atmosphere |
| `model` | The model or official name of this vehicle |
| `name` | The name of this vehicle |
| `passengers` | The number of non-essential people this vehicle can transport |
| `pilots` | An array of People URL Resources that this vehicle has been piloted by |
| `url` | The hypermedia URL of this resource |
| `vehicle_class` | The class of this vehicle |

Operations: List, Load.

API path: `/vehicles`



## Entities


### Film

Create an instance: `film = client.Film`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `characters` | `Array` | An array of people resource URLs that are in this film |
| `created` | `String` | The ISO 8601 date format of the time that this resource was created |
| `director` | `String` | The name of the director of this film |
| `edited` | `String` | The ISO 8601 date format of the time that this resource was edited |
| `episode_id` | `Integer` | The episode number of this film |
| `id` | `String` |  |
| `opening_crawl` | `String` | The opening paragraphs at the beginning of this film |
| `planets` | `Array` | An array of planet resource URLs that are in this film |
| `producer` | `String` | The name(s) of the producer(s) of this film |
| `release_date` | `String` | The release date of this film |
| `species` | `Array` | An array of species resource URLs that are in this film |
| `starships` | `Array` | An array of starship resource URLs that are in this film |
| `title` | `String` | The title of this film |
| `url` | `String` | The hypermedia URL of this resource |
| `vehicles` | `Array` | An array of vehicle resource URLs that are in this film |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Film record (raises on error).
film = client.Film.load({ "id" => 1 })
```

#### Example: List

```ruby
# list returns an Array of Film records (raises on error).
films = client.Film.list
```


### PeopleList

Create an instance: `people_list = client.PeopleList`


### Person

Create an instance: `person = client.Person`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `birth_year` | `String` | The birth year of the person, using the in-universe standard of BBY or ABY |
| `created` | `String` | The ISO 8601 date format of the time that this resource was created |
| `edited` | `String` | The ISO 8601 date format of the time that this resource was edited |
| `eye_color` | `String` | The eye color of this person |
| `films` | `Array` | An array of film resource URLs that this person has been in |
| `gender` | `String` | The gender of this person |
| `hair_color` | `String` | The hair color of this person |
| `height` | `String` | The height of the person in centimeters |
| `homeworld` | `String` | The URL of the planet resource that this person was born on |
| `id` | `String` |  |
| `mass` | `String` | The mass of the person in kilograms |
| `name` | `String` | The name of this person |
| `skin_color` | `String` | The skin color of this person |
| `species` | `Array` | An array of species resource URLs that this person belongs to |
| `starships` | `Array` | An array of starship resource URLs that this person has piloted |
| `url` | `String` | The hypermedia URL of this resource |
| `vehicles` | `Array` | An array of vehicle resource URLs that this person has piloted |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Person record (raises on error).
person = client.Person.load({ "id" => 1 })
```

#### Example: List

```ruby
# list returns an Array of Person records (raises on error).
persons = client.Person.list
```


### Planet

Create an instance: `planet = client.Planet`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `climate` | `String` | The climate of this planet |
| `created` | `String` | The ISO 8601 date format of the time that this resource was created |
| `diameter` | `String` | The diameter of this planet in kilometers |
| `edited` | `String` | The ISO 8601 date format of the time that this resource was edited |
| `films` | `Array` | An array of Film URL Resources that this planet has appeared in |
| `gravity` | `String` | A number denoting the gravity of this planet |
| `id` | `String` |  |
| `name` | `String` | The name of this planet |
| `orbital_period` | `String` | The number of standard days it takes for this planet to complete a single orbit of its local star |
| `population` | `String` | The average population of sentient beings inhabiting this planet |
| `residents` | `Array` | An array of People URL Resources that live on this planet |
| `rotation_period` | `String` | The number of standard hours it takes for this planet to complete a single rotation on its axis |
| `surface_water` | `String` | The percentage of the planet surface that is naturally occurring water |
| `terrain` | `String` | The terrain of this planet |
| `url` | `String` | The hypermedia URL of this resource |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Planet record (raises on error).
planet = client.Planet.load({ "id" => 1 })
```

#### Example: List

```ruby
# list returns an Array of Planet records (raises on error).
planets = client.Planet.list
```


### Species

Create an instance: `species = client.Species`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `average_height` | `String` | The average height of this species in centimeters |
| `average_lifespan` | `String` | The average lifespan of this species in years |
| `classification` | `String` | The classification of this species |
| `created` | `String` | The ISO 8601 date format of the time that this resource was created |
| `designation` | `String` | The designation of this species |
| `edited` | `String` | The ISO 8601 date format of the time that this resource was edited |
| `eye_colors` | `String` | A comma-separated string of common eye colors for this species |
| `films` | `Array` | An array of Film URL Resources that this species has appeared in |
| `hair_colors` | `String` | A comma-separated string of common hair colors for this species |
| `homeworld` | `String` | The URL of a planet resource that is the homeworld of this species |
| `id` | `String` |  |
| `language` | `String` | The language commonly spoken by this species |
| `name` | `String` | The name of this species |
| `people` | `Array` | An array of People URL Resources that are a part of this species |
| `skin_colors` | `String` | A comma-separated string of common skin colors for this species |
| `url` | `String` | The hypermedia URL of this resource |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Species record (raises on error).
species = client.Species.load({ "id" => 1 })
```

#### Example: List

```ruby
# list returns an Array of Species records (raises on error).
speciess = client.Species.list
```


### Starship

Create an instance: `starship = client.Starship`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `MGLT` | `String` | The Maximum number of Megalights this starship can travel in a standard hour |
| `cargo_capacity` | `String` | The maximum number of kilograms that this starship can transport |
| `consumables` | `String` | The maximum length of time that this starship can provide consumables for its entire crew without having to resupply |
| `cost_in_credits` | `String` | The cost of this starship new, in galactic credits |
| `created` | `String` | The ISO 8601 date format of the time that this resource was created |
| `crew` | `String` | The number of personnel needed to run or pilot this starship |
| `edited` | `String` | The ISO 8601 date format of the time that this resource was edited |
| `films` | `Array` | An array of Film URL Resources that this starship has appeared in |
| `hyperdrive_rating` | `String` | The class of this starships hyperdrive |
| `id` | `String` |  |
| `length` | `String` | The length of this starship in meters |
| `manufacturer` | `String` | The manufacturer of this starship |
| `max_atmosphering_speed` | `String` | The maximum speed of this starship in atmosphere |
| `model` | `String` | The model or official name of this starship |
| `name` | `String` | The name of this starship |
| `passengers` | `String` | The number of non-essential people this starship can transport |
| `pilots` | `Array` | An array of People URL Resources that this starship has been piloted by |
| `starship_class` | `String` | The class of this starship |
| `url` | `String` | The hypermedia URL of this resource |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Starship record (raises on error).
starship = client.Starship.load({ "id" => 1 })
```

#### Example: List

```ruby
# list returns an Array of Starship records (raises on error).
starships = client.Starship.list
```


### Vehicle

Create an instance: `vehicle = client.Vehicle`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cargo_capacity` | `String` | The maximum number of kilograms that this vehicle can transport |
| `consumables` | `String` | The maximum length of time that this vehicle can provide consumables for its entire crew without having to resupply |
| `cost_in_credits` | `String` | The cost of this vehicle new, in galactic credits |
| `created` | `String` | The ISO 8601 date format of the time that this resource was created |
| `crew` | `String` | The number of personnel needed to run or pilot this vehicle |
| `edited` | `String` | The ISO 8601 date format of the time that this resource was edited |
| `films` | `Array` | An array of Film URL Resources that this vehicle has appeared in |
| `id` | `String` |  |
| `length` | `String` | The length of this vehicle in meters |
| `manufacturer` | `String` | The manufacturer of this vehicle |
| `max_atmosphering_speed` | `String` | The maximum speed of this vehicle in atmosphere |
| `model` | `String` | The model or official name of this vehicle |
| `name` | `String` | The name of this vehicle |
| `passengers` | `String` | The number of non-essential people this vehicle can transport |
| `pilots` | `Array` | An array of People URL Resources that this vehicle has been piloted by |
| `url` | `String` | The hypermedia URL of this resource |
| `vehicle_class` | `String` | The class of this vehicle |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Vehicle record (raises on error).
vehicle = client.Vehicle.load({ "id" => 1 })
```

#### Example: List

```ruby
# list returns an Array of Vehicle records (raises on error).
vehicles = client.Vehicle.list
```

## Features

This SDK ships 4 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`ratelimit`](#ratelimit) | Client-side rate limiting via a token bucket |
| [`retry`](#retry) | Automatic retry of transient failures with exponential backoff |
| [`test`](#test) | In-memory mock transport for testing without a live server |
| [`timeout`](#timeout) | Per-request timeout with transport abort |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### ratelimit

Client-side rate limiting via a token bucket.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Automatic retry of transient failures with exponential backoff.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Per-request timeout with transport abort.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Client-side rate limiting via a token bucket
- **RetryFeature**: Automatic retry of transient failures with exponential backoff
- **TestFeature**: In-memory mock transport for testing without a live server
- **TimeoutFeature**: Per-request timeout with transport abort

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── StarWars_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`StarWars_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```ruby
person = client.Person
person.list()

# person.data_get now returns the person data from the last list
# person.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
