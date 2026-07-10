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
| `character` | `Array` | No |  |
| `created` | `String` | No |  |
| `director` | `String` | No |  |
| `edited` | `String` | No |  |
| `episode_id` | `Integer` | No |  |
| `opening_crawl` | `String` | No |  |
| `planet` | `Array` | No |  |
| `producer` | `String` | No |  |
| `release_date` | `String` | No |  |
| `species` | `Array` | No |  |
| `starship` | `Array` | No |  |
| `title` | `String` | No |  |
| `url` | `String` | No |  |
| `vehicle` | `Array` | No |  |

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
| `birth_year` | `String` | No |  |
| `created` | `String` | No |  |
| `edited` | `String` | No |  |
| `eye_color` | `String` | No |  |
| `film` | `Array` | No |  |
| `gender` | `String` | No |  |
| `hair_color` | `String` | No |  |
| `height` | `String` | No |  |
| `homeworld` | `String` | No |  |
| `mass` | `String` | No |  |
| `name` | `String` | No |  |
| `skin_color` | `String` | No |  |
| `species` | `Array` | No |  |
| `starship` | `Array` | No |  |
| `url` | `String` | No |  |
| `vehicle` | `Array` | No |  |

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
| `climate` | `String` | No |  |
| `created` | `String` | No |  |
| `diameter` | `String` | No |  |
| `edited` | `String` | No |  |
| `film` | `Array` | No |  |
| `gravity` | `String` | No |  |
| `name` | `String` | No |  |
| `orbital_period` | `String` | No |  |
| `population` | `String` | No |  |
| `resident` | `Array` | No |  |
| `rotation_period` | `String` | No |  |
| `surface_water` | `String` | No |  |
| `terrain` | `String` | No |  |
| `url` | `String` | No |  |

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
| `average_height` | `String` | No |  |
| `average_lifespan` | `String` | No |  |
| `classification` | `String` | No |  |
| `created` | `String` | No |  |
| `designation` | `String` | No |  |
| `edited` | `String` | No |  |
| `eye_color` | `String` | No |  |
| `film` | `Array` | No |  |
| `hair_color` | `String` | No |  |
| `homeworld` | `String` | No |  |
| `language` | `String` | No |  |
| `name` | `String` | No |  |
| `person` | `Array` | No |  |
| `skin_color` | `String` | No |  |
| `url` | `String` | No |  |

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
| `cargo_capacity` | `String` | No |  |
| `consumable` | `String` | No |  |
| `cost_in_credit` | `String` | No |  |
| `created` | `String` | No |  |
| `crew` | `String` | No |  |
| `edited` | `String` | No |  |
| `film` | `Array` | No |  |
| `hyperdrive_rating` | `String` | No |  |
| `length` | `String` | No |  |
| `manufacturer` | `String` | No |  |
| `max_atmosphering_speed` | `String` | No |  |
| `mglt` | `String` | No |  |
| `model` | `String` | No |  |
| `name` | `String` | No |  |
| `passenger` | `String` | No |  |
| `pilot` | `Array` | No |  |
| `starship_class` | `String` | No |  |
| `url` | `String` | No |  |

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
| `cargo_capacity` | `String` | No |  |
| `consumable` | `String` | No |  |
| `cost_in_credit` | `String` | No |  |
| `created` | `String` | No |  |
| `crew` | `String` | No |  |
| `edited` | `String` | No |  |
| `film` | `Array` | No |  |
| `length` | `String` | No |  |
| `manufacturer` | `String` | No |  |
| `max_atmosphering_speed` | `String` | No |  |
| `model` | `String` | No |  |
| `name` | `String` | No |  |
| `passenger` | `String` | No |  |
| `pilot` | `Array` | No |  |
| `url` | `String` | No |  |
| `vehicle_class` | `String` | No |  |

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

