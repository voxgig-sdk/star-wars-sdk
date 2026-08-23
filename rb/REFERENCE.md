# StarWars Ruby SDK Reference

Complete API reference for the StarWars Ruby SDK.


## StarWarsSDK

### Constructor

```ruby
require_relative 'StarWars_sdk'

client = StarWarsSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `StarWarsSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = StarWarsSDK.test
```


### Instance Methods

#### `Film(data = nil)`

Create a new `Film` entity instance. Pass `nil` for no initial data.

#### `PeopleList(data = nil)`

Create a new `PeopleList` entity instance. Pass `nil` for no initial data.

#### `Person(data = nil)`

Create a new `Person` entity instance. Pass `nil` for no initial data.

#### `Planet(data = nil)`

Create a new `Planet` entity instance. Pass `nil` for no initial data.

#### `Species(data = nil)`

Create a new `Species` entity instance. Pass `nil` for no initial data.

#### `Starship(data = nil)`

Create a new `Starship` entity instance. Pass `nil` for no initial data.

#### `Vehicle(data = nil)`

Create a new `Vehicle` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## FilmEntity

```ruby
film = client.Film
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `characters` | `Array` | No | An array of people resource URLs that are in this film |
| `created` | `String` | No | The ISO 8601 date format of the time that this resource was created |
| `director` | `String` | No | The name of the director of this film |
| `edited` | `String` | No | The ISO 8601 date format of the time that this resource was edited |
| `episode_id` | `Integer` | No | The episode number of this film |
| `opening_crawl` | `String` | No | The opening paragraphs at the beginning of this film |
| `planets` | `Array` | No | An array of planet resource URLs that are in this film |
| `producer` | `String` | No | The name(s) of the producer(s) of this film |
| `release_date` | `String` | No | The release date of this film |
| `species` | `Array` | No | An array of species resource URLs that are in this film |
| `starships` | `Array` | No | An array of starship resource URLs that are in this film |
| `title` | `String` | No | The title of this film |
| `url` | `String` | No | The hypermedia URL of this resource |
| `vehicles` | `Array` | No | An array of vehicle resource URLs that are in this film |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Film.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Film.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `FilmEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PeopleListEntity

```ruby
people_list = client.PeopleList
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PeopleListEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PersonEntity

```ruby
person = client.Person
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `birth_year` | `String` | No | The birth year of the person, using the in-universe standard of BBY or ABY |
| `created` | `String` | No | The ISO 8601 date format of the time that this resource was created |
| `edited` | `String` | No | The ISO 8601 date format of the time that this resource was edited |
| `eye_color` | `String` | No | The eye color of this person |
| `films` | `Array` | No | An array of film resource URLs that this person has been in |
| `gender` | `String` | No | The gender of this person |
| `hair_color` | `String` | No | The hair color of this person |
| `height` | `String` | No | The height of the person in centimeters |
| `homeworld` | `String` | No | The URL of the planet resource that this person was born on |
| `mass` | `String` | No | The mass of the person in kilograms |
| `name` | `String` | No | The name of this person |
| `skin_color` | `String` | No | The skin color of this person |
| `species` | `Array` | No | An array of species resource URLs that this person belongs to |
| `starships` | `Array` | No | An array of starship resource URLs that this person has piloted |
| `url` | `String` | No | The hypermedia URL of this resource |
| `vehicles` | `Array` | No | An array of vehicle resource URLs that this person has piloted |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Person.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Person.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PersonEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PlanetEntity

```ruby
planet = client.Planet
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `climate` | `String` | No | The climate of this planet |
| `created` | `String` | No | The ISO 8601 date format of the time that this resource was created |
| `diameter` | `String` | No | The diameter of this planet in kilometers |
| `edited` | `String` | No | The ISO 8601 date format of the time that this resource was edited |
| `films` | `Array` | No | An array of Film URL Resources that this planet has appeared in |
| `gravity` | `String` | No | A number denoting the gravity of this planet |
| `name` | `String` | No | The name of this planet |
| `orbital_period` | `String` | No | The number of standard days it takes for this planet to complete a single orbit of its local star |
| `population` | `String` | No | The average population of sentient beings inhabiting this planet |
| `residents` | `Array` | No | An array of People URL Resources that live on this planet |
| `rotation_period` | `String` | No | The number of standard hours it takes for this planet to complete a single rotation on its axis |
| `surface_water` | `String` | No | The percentage of the planet surface that is naturally occurring water |
| `terrain` | `String` | No | The terrain of this planet |
| `url` | `String` | No | The hypermedia URL of this resource |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Planet.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Planet.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PlanetEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SpeciesEntity

```ruby
species = client.Species
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `average_height` | `String` | No | The average height of this species in centimeters |
| `average_lifespan` | `String` | No | The average lifespan of this species in years |
| `classification` | `String` | No | The classification of this species |
| `created` | `String` | No | The ISO 8601 date format of the time that this resource was created |
| `designation` | `String` | No | The designation of this species |
| `edited` | `String` | No | The ISO 8601 date format of the time that this resource was edited |
| `eye_colors` | `String` | No | A comma-separated string of common eye colors for this species |
| `films` | `Array` | No | An array of Film URL Resources that this species has appeared in |
| `hair_colors` | `String` | No | A comma-separated string of common hair colors for this species |
| `homeworld` | `String` | No | The URL of a planet resource that is the homeworld of this species |
| `language` | `String` | No | The language commonly spoken by this species |
| `name` | `String` | No | The name of this species |
| `people` | `Array` | No | An array of People URL Resources that are a part of this species |
| `skin_colors` | `String` | No | A comma-separated string of common skin colors for this species |
| `url` | `String` | No | The hypermedia URL of this resource |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Species.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Species.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SpeciesEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## StarshipEntity

```ruby
starship = client.Starship
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `MGLT` | `String` | No | The Maximum number of Megalights this starship can travel in a standard hour |
| `cargo_capacity` | `String` | No | The maximum number of kilograms that this starship can transport |
| `consumables` | `String` | No | The maximum length of time that this starship can provide consumables for its entire crew without having to resupply |
| `cost_in_credits` | `String` | No | The cost of this starship new, in galactic credits |
| `created` | `String` | No | The ISO 8601 date format of the time that this resource was created |
| `crew` | `String` | No | The number of personnel needed to run or pilot this starship |
| `edited` | `String` | No | The ISO 8601 date format of the time that this resource was edited |
| `films` | `Array` | No | An array of Film URL Resources that this starship has appeared in |
| `hyperdrive_rating` | `String` | No | The class of this starships hyperdrive |
| `length` | `String` | No | The length of this starship in meters |
| `manufacturer` | `String` | No | The manufacturer of this starship |
| `max_atmosphering_speed` | `String` | No | The maximum speed of this starship in atmosphere |
| `model` | `String` | No | The model or official name of this starship |
| `name` | `String` | No | The name of this starship |
| `passengers` | `String` | No | The number of non-essential people this starship can transport |
| `pilots` | `Array` | No | An array of People URL Resources that this starship has been piloted by |
| `starship_class` | `String` | No | The class of this starship |
| `url` | `String` | No | The hypermedia URL of this resource |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Starship.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Starship.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `StarshipEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## VehicleEntity

```ruby
vehicle = client.Vehicle
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cargo_capacity` | `String` | No | The maximum number of kilograms that this vehicle can transport |
| `consumables` | `String` | No | The maximum length of time that this vehicle can provide consumables for its entire crew without having to resupply |
| `cost_in_credits` | `String` | No | The cost of this vehicle new, in galactic credits |
| `created` | `String` | No | The ISO 8601 date format of the time that this resource was created |
| `crew` | `String` | No | The number of personnel needed to run or pilot this vehicle |
| `edited` | `String` | No | The ISO 8601 date format of the time that this resource was edited |
| `films` | `Array` | No | An array of Film URL Resources that this vehicle has appeared in |
| `length` | `String` | No | The length of this vehicle in meters |
| `manufacturer` | `String` | No | The manufacturer of this vehicle |
| `max_atmosphering_speed` | `String` | No | The maximum speed of this vehicle in atmosphere |
| `model` | `String` | No | The model or official name of this vehicle |
| `name` | `String` | No | The name of this vehicle |
| `passengers` | `String` | No | The number of non-essential people this vehicle can transport |
| `pilots` | `Array` | No | An array of People URL Resources that this vehicle has been piloted by |
| `url` | `String` | No | The hypermedia URL of this resource |
| `vehicle_class` | `String` | No | The class of this vehicle |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Vehicle.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Vehicle.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `VehicleEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = StarWarsSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

