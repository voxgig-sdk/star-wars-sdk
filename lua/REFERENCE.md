# StarWars Lua SDK Reference

Complete API reference for the StarWars Lua SDK.


## StarWarsSDK

### Constructor

```lua
local sdk = require("star-wars_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Film(data)`

Create a new `Film` entity instance. Pass `nil` for no initial data.

#### `PeopleList(data)`

Create a new `PeopleList` entity instance. Pass `nil` for no initial data.

#### `Person(data)`

Create a new `Person` entity instance. Pass `nil` for no initial data.

#### `Planet(data)`

Create a new `Planet` entity instance. Pass `nil` for no initial data.

#### `Species(data)`

Create a new `Species` entity instance. Pass `nil` for no initial data.

#### `Starship(data)`

Create a new `Starship` entity instance. Pass `nil` for no initial data.

#### `Vehicle(data)`

Create a new `Vehicle` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## FilmEntity

```lua
local film = client:Film(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Film():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Film():load({ id = "film_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FilmEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PeopleListEntity

```lua
local people_list = client:PeopleList(nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PeopleListEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PersonEntity

```lua
local person = client:Person(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Person():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Person():load({ id = "person_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PersonEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PlanetEntity

```lua
local planet = client:Planet(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Planet():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Planet():load({ id = "planet_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PlanetEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## SpeciesEntity

```lua
local species = client:Species(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Species():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Species():load({ id = "species_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SpeciesEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## StarshipEntity

```lua
local starship = client:Starship(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Starship():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Starship():load({ id = "starship_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `StarshipEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## VehicleEntity

```lua
local vehicle = client:Vehicle(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Vehicle():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Vehicle():load({ id = "vehicle_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VehicleEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

