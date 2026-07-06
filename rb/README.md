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
    puts "#{item["character"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```

### 3. Load a film

```ruby
begin
  # load returns the bare Film record (raises on error).
  film = client.Film.load({ "id" => "example_id" })
  puts film
rescue => err
  warn "load failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  films = client.Film.list()
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
  "entity" => { "film" => { "test01" => { "id" => "test01" } } },
})

# Entity ops return the bare mock record (raises on error).
film = client.Film.list()
puts film
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
| `character` |  |
| `created` |  |
| `director` |  |
| `edited` |  |
| `episode_id` |  |
| `opening_crawl` |  |
| `planet` |  |
| `producer` |  |
| `release_date` |  |
| `species` |  |
| `starship` |  |
| `title` |  |
| `url` |  |
| `vehicle` |  |

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
| `birth_year` |  |
| `created` |  |
| `edited` |  |
| `eye_color` |  |
| `film` |  |
| `gender` |  |
| `hair_color` |  |
| `height` |  |
| `homeworld` |  |
| `mass` |  |
| `name` |  |
| `skin_color` |  |
| `species` |  |
| `starship` |  |
| `url` |  |
| `vehicle` |  |

Operations: List, Load.

API path: `/people`

#### Planet

| Field | Description |
| --- | --- |
| `climate` |  |
| `created` |  |
| `diameter` |  |
| `edited` |  |
| `film` |  |
| `gravity` |  |
| `name` |  |
| `orbital_period` |  |
| `population` |  |
| `resident` |  |
| `rotation_period` |  |
| `surface_water` |  |
| `terrain` |  |
| `url` |  |

Operations: List, Load.

API path: `/planets`

#### Species

| Field | Description |
| --- | --- |
| `average_height` |  |
| `average_lifespan` |  |
| `classification` |  |
| `created` |  |
| `designation` |  |
| `edited` |  |
| `eye_color` |  |
| `film` |  |
| `hair_color` |  |
| `homeworld` |  |
| `language` |  |
| `name` |  |
| `person` |  |
| `skin_color` |  |
| `url` |  |

Operations: List, Load.

API path: `/species`

#### Starship

| Field | Description |
| --- | --- |
| `cargo_capacity` |  |
| `consumable` |  |
| `cost_in_credit` |  |
| `created` |  |
| `crew` |  |
| `edited` |  |
| `film` |  |
| `hyperdrive_rating` |  |
| `length` |  |
| `manufacturer` |  |
| `max_atmosphering_speed` |  |
| `mglt` |  |
| `model` |  |
| `name` |  |
| `passenger` |  |
| `pilot` |  |
| `starship_class` |  |
| `url` |  |

Operations: List, Load.

API path: `/starships`

#### Vehicle

| Field | Description |
| --- | --- |
| `cargo_capacity` |  |
| `consumable` |  |
| `cost_in_credit` |  |
| `created` |  |
| `crew` |  |
| `edited` |  |
| `film` |  |
| `length` |  |
| `manufacturer` |  |
| `max_atmosphering_speed` |  |
| `model` |  |
| `name` |  |
| `passenger` |  |
| `pilot` |  |
| `url` |  |
| `vehicle_class` |  |

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
| `character` | `Array` |  |
| `created` | `String` |  |
| `director` | `String` |  |
| `edited` | `String` |  |
| `episode_id` | `Integer` |  |
| `opening_crawl` | `String` |  |
| `planet` | `Array` |  |
| `producer` | `String` |  |
| `release_date` | `String` |  |
| `species` | `Array` |  |
| `starship` | `Array` |  |
| `title` | `String` |  |
| `url` | `String` |  |
| `vehicle` | `Array` |  |

#### Example: Load

```ruby
# load returns the bare Film record (raises on error).
film = client.Film.load({ "id" => "film_id" })
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
| `birth_year` | `String` |  |
| `created` | `String` |  |
| `edited` | `String` |  |
| `eye_color` | `String` |  |
| `film` | `Array` |  |
| `gender` | `String` |  |
| `hair_color` | `String` |  |
| `height` | `String` |  |
| `homeworld` | `String` |  |
| `mass` | `String` |  |
| `name` | `String` |  |
| `skin_color` | `String` |  |
| `species` | `Array` |  |
| `starship` | `Array` |  |
| `url` | `String` |  |
| `vehicle` | `Array` |  |

#### Example: Load

```ruby
# load returns the bare Person record (raises on error).
person = client.Person.load({ "id" => "person_id" })
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
| `climate` | `String` |  |
| `created` | `String` |  |
| `diameter` | `String` |  |
| `edited` | `String` |  |
| `film` | `Array` |  |
| `gravity` | `String` |  |
| `name` | `String` |  |
| `orbital_period` | `String` |  |
| `population` | `String` |  |
| `resident` | `Array` |  |
| `rotation_period` | `String` |  |
| `surface_water` | `String` |  |
| `terrain` | `String` |  |
| `url` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Planet record (raises on error).
planet = client.Planet.load({ "id" => "planet_id" })
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
| `average_height` | `String` |  |
| `average_lifespan` | `String` |  |
| `classification` | `String` |  |
| `created` | `String` |  |
| `designation` | `String` |  |
| `edited` | `String` |  |
| `eye_color` | `String` |  |
| `film` | `Array` |  |
| `hair_color` | `String` |  |
| `homeworld` | `String` |  |
| `language` | `String` |  |
| `name` | `String` |  |
| `person` | `Array` |  |
| `skin_color` | `String` |  |
| `url` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Species record (raises on error).
species = client.Species.load({ "id" => "species_id" })
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
| `cargo_capacity` | `String` |  |
| `consumable` | `String` |  |
| `cost_in_credit` | `String` |  |
| `created` | `String` |  |
| `crew` | `String` |  |
| `edited` | `String` |  |
| `film` | `Array` |  |
| `hyperdrive_rating` | `String` |  |
| `length` | `String` |  |
| `manufacturer` | `String` |  |
| `max_atmosphering_speed` | `String` |  |
| `mglt` | `String` |  |
| `model` | `String` |  |
| `name` | `String` |  |
| `passenger` | `String` |  |
| `pilot` | `Array` |  |
| `starship_class` | `String` |  |
| `url` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Starship record (raises on error).
starship = client.Starship.load({ "id" => "starship_id" })
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
| `cargo_capacity` | `String` |  |
| `consumable` | `String` |  |
| `cost_in_credit` | `String` |  |
| `created` | `String` |  |
| `crew` | `String` |  |
| `edited` | `String` |  |
| `film` | `Array` |  |
| `length` | `String` |  |
| `manufacturer` | `String` |  |
| `max_atmosphering_speed` | `String` |  |
| `model` | `String` |  |
| `name` | `String` |  |
| `passenger` | `String` |  |
| `pilot` | `Array` |  |
| `url` | `String` |  |
| `vehicle_class` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Vehicle record (raises on error).
vehicle = client.Vehicle.load({ "id" => "vehicle_id" })
```

#### Example: List

```ruby
# list returns an Array of Vehicle records (raises on error).
vehicles = client.Vehicle.list
```


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

- **TestFeature**: In-memory mock transport for testing without a live server

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
film = client.Film
film.list()

# film.data_get now returns the film data from the last list
# film.match_get returns the last match criteria
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
