# StarWars Ruby SDK Reference

Complete API reference for the StarWars Ruby SDK.


## StarWarsSDK

### Constructor

```ruby
require_relative 'star-wars_sdk'

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
film = client.film
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `character` | ``$ARRAY`` | No |  |
| `created` | ``$STRING`` | No |  |
| `director` | ``$STRING`` | No |  |
| `edited` | ``$STRING`` | No |  |
| `episode_id` | ``$INTEGER`` | No |  |
| `opening_crawl` | ``$STRING`` | No |  |
| `planet` | ``$ARRAY`` | No |  |
| `producer` | ``$STRING`` | No |  |
| `release_date` | ``$STRING`` | No |  |
| `species` | ``$ARRAY`` | No |  |
| `starship` | ``$ARRAY`` | No |  |
| `title` | ``$STRING`` | No |  |
| `url` | ``$STRING`` | No |  |
| `vehicle` | ``$ARRAY`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.film.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.film.load({ "id" => "film_id" })
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
people_list = client.people_list
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
person = client.person
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `birth_year` | ``$STRING`` | No |  |
| `created` | ``$STRING`` | No |  |
| `edited` | ``$STRING`` | No |  |
| `eye_color` | ``$STRING`` | No |  |
| `film` | ``$ARRAY`` | No |  |
| `gender` | ``$STRING`` | No |  |
| `hair_color` | ``$STRING`` | No |  |
| `height` | ``$STRING`` | No |  |
| `homeworld` | ``$STRING`` | No |  |
| `mass` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `skin_color` | ``$STRING`` | No |  |
| `species` | ``$ARRAY`` | No |  |
| `starship` | ``$ARRAY`` | No |  |
| `url` | ``$STRING`` | No |  |
| `vehicle` | ``$ARRAY`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.person.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.person.load({ "id" => "person_id" })
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
planet = client.planet
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `climate` | ``$STRING`` | No |  |
| `created` | ``$STRING`` | No |  |
| `diameter` | ``$STRING`` | No |  |
| `edited` | ``$STRING`` | No |  |
| `film` | ``$ARRAY`` | No |  |
| `gravity` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `orbital_period` | ``$STRING`` | No |  |
| `population` | ``$STRING`` | No |  |
| `resident` | ``$ARRAY`` | No |  |
| `rotation_period` | ``$STRING`` | No |  |
| `surface_water` | ``$STRING`` | No |  |
| `terrain` | ``$STRING`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.planet.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.planet.load({ "id" => "planet_id" })
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
species = client.species
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `average_height` | ``$STRING`` | No |  |
| `average_lifespan` | ``$STRING`` | No |  |
| `classification` | ``$STRING`` | No |  |
| `created` | ``$STRING`` | No |  |
| `designation` | ``$STRING`` | No |  |
| `edited` | ``$STRING`` | No |  |
| `eye_color` | ``$STRING`` | No |  |
| `film` | ``$ARRAY`` | No |  |
| `hair_color` | ``$STRING`` | No |  |
| `homeworld` | ``$STRING`` | No |  |
| `language` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `person` | ``$ARRAY`` | No |  |
| `skin_color` | ``$STRING`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.species.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.species.load({ "id" => "species_id" })
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
starship = client.starship
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cargo_capacity` | ``$STRING`` | No |  |
| `consumable` | ``$STRING`` | No |  |
| `cost_in_credit` | ``$STRING`` | No |  |
| `created` | ``$STRING`` | No |  |
| `crew` | ``$STRING`` | No |  |
| `edited` | ``$STRING`` | No |  |
| `film` | ``$ARRAY`` | No |  |
| `hyperdrive_rating` | ``$STRING`` | No |  |
| `length` | ``$STRING`` | No |  |
| `manufacturer` | ``$STRING`` | No |  |
| `max_atmosphering_speed` | ``$STRING`` | No |  |
| `mglt` | ``$STRING`` | No |  |
| `model` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `passenger` | ``$STRING`` | No |  |
| `pilot` | ``$ARRAY`` | No |  |
| `starship_class` | ``$STRING`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.starship.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.starship.load({ "id" => "starship_id" })
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
vehicle = client.vehicle
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cargo_capacity` | ``$STRING`` | No |  |
| `consumable` | ``$STRING`` | No |  |
| `cost_in_credit` | ``$STRING`` | No |  |
| `created` | ``$STRING`` | No |  |
| `crew` | ``$STRING`` | No |  |
| `edited` | ``$STRING`` | No |  |
| `film` | ``$ARRAY`` | No |  |
| `length` | ``$STRING`` | No |  |
| `manufacturer` | ``$STRING`` | No |  |
| `max_atmosphering_speed` | ``$STRING`` | No |  |
| `model` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `passenger` | ``$STRING`` | No |  |
| `pilot` | ``$ARRAY`` | No |  |
| `url` | ``$STRING`` | No |  |
| `vehicle_class` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.vehicle.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.vehicle.load({ "id" => "vehicle_id" })
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

