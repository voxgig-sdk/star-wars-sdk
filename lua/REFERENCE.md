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
| `character` | `table` | No |  |
| `created` | `string` | No |  |
| `director` | `string` | No |  |
| `edited` | `string` | No |  |
| `episode_id` | `number` | No |  |
| `opening_crawl` | `string` | No |  |
| `planet` | `table` | No |  |
| `producer` | `string` | No |  |
| `release_date` | `string` | No |  |
| `species` | `table` | No |  |
| `starship` | `table` | No |  |
| `title` | `string` | No |  |
| `url` | `string` | No |  |
| `vehicle` | `table` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Film():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Film():load({ id = 1 })
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
| `birth_year` | `string` | No |  |
| `created` | `string` | No |  |
| `edited` | `string` | No |  |
| `eye_color` | `string` | No |  |
| `film` | `table` | No |  |
| `gender` | `string` | No |  |
| `hair_color` | `string` | No |  |
| `height` | `string` | No |  |
| `homeworld` | `string` | No |  |
| `mass` | `string` | No |  |
| `name` | `string` | No |  |
| `skin_color` | `string` | No |  |
| `species` | `table` | No |  |
| `starship` | `table` | No |  |
| `url` | `string` | No |  |
| `vehicle` | `table` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Person():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Person():load({ id = 1 })
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
| `climate` | `string` | No |  |
| `created` | `string` | No |  |
| `diameter` | `string` | No |  |
| `edited` | `string` | No |  |
| `film` | `table` | No |  |
| `gravity` | `string` | No |  |
| `name` | `string` | No |  |
| `orbital_period` | `string` | No |  |
| `population` | `string` | No |  |
| `resident` | `table` | No |  |
| `rotation_period` | `string` | No |  |
| `surface_water` | `string` | No |  |
| `terrain` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Planet():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Planet():load({ id = 1 })
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
| `average_height` | `string` | No |  |
| `average_lifespan` | `string` | No |  |
| `classification` | `string` | No |  |
| `created` | `string` | No |  |
| `designation` | `string` | No |  |
| `edited` | `string` | No |  |
| `eye_color` | `string` | No |  |
| `film` | `table` | No |  |
| `hair_color` | `string` | No |  |
| `homeworld` | `string` | No |  |
| `language` | `string` | No |  |
| `name` | `string` | No |  |
| `person` | `table` | No |  |
| `skin_color` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Species():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Species():load({ id = 1 })
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
| `cargo_capacity` | `string` | No |  |
| `consumable` | `string` | No |  |
| `cost_in_credit` | `string` | No |  |
| `created` | `string` | No |  |
| `crew` | `string` | No |  |
| `edited` | `string` | No |  |
| `film` | `table` | No |  |
| `hyperdrive_rating` | `string` | No |  |
| `length` | `string` | No |  |
| `manufacturer` | `string` | No |  |
| `max_atmosphering_speed` | `string` | No |  |
| `mglt` | `string` | No |  |
| `model` | `string` | No |  |
| `name` | `string` | No |  |
| `passenger` | `string` | No |  |
| `pilot` | `table` | No |  |
| `starship_class` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Starship():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Starship():load({ id = 1 })
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
| `cargo_capacity` | `string` | No |  |
| `consumable` | `string` | No |  |
| `cost_in_credit` | `string` | No |  |
| `created` | `string` | No |  |
| `crew` | `string` | No |  |
| `edited` | `string` | No |  |
| `film` | `table` | No |  |
| `length` | `string` | No |  |
| `manufacturer` | `string` | No |  |
| `max_atmosphering_speed` | `string` | No |  |
| `model` | `string` | No |  |
| `name` | `string` | No |  |
| `passenger` | `string` | No |  |
| `pilot` | `table` | No |  |
| `url` | `string` | No |  |
| `vehicle_class` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Vehicle():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Vehicle():load({ id = 1 })
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

