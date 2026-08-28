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
| `characters` | `table` | No | An array of people resource URLs that are in this film |
| `created` | `string` | No | The ISO 8601 date format of the time that this resource was created |
| `director` | `string` | No | The name of the director of this film |
| `edited` | `string` | No | The ISO 8601 date format of the time that this resource was edited |
| `episode_id` | `number` | No | The episode number of this film |
| `id` | `string` | No |  |
| `opening_crawl` | `string` | No | The opening paragraphs at the beginning of this film |
| `planets` | `table` | No | An array of planet resource URLs that are in this film |
| `producer` | `string` | No | The name(s) of the producer(s) of this film |
| `release_date` | `string` | No | The release date of this film |
| `species` | `table` | No | An array of species resource URLs that are in this film |
| `starships` | `table` | No | An array of starship resource URLs that are in this film |
| `title` | `string` | No | The title of this film |
| `url` | `string` | No | The hypermedia URL of this resource |
| `vehicles` | `table` | No | An array of vehicle resource URLs that are in this film |

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
| `birth_year` | `string` | No | The birth year of the person, using the in-universe standard of BBY or ABY |
| `created` | `string` | No | The ISO 8601 date format of the time that this resource was created |
| `edited` | `string` | No | The ISO 8601 date format of the time that this resource was edited |
| `eye_color` | `string` | No | The eye color of this person |
| `films` | `table` | No | An array of film resource URLs that this person has been in |
| `gender` | `string` | No | The gender of this person |
| `hair_color` | `string` | No | The hair color of this person |
| `height` | `string` | No | The height of the person in centimeters |
| `homeworld` | `string` | No | The URL of the planet resource that this person was born on |
| `id` | `string` | No |  |
| `mass` | `string` | No | The mass of the person in kilograms |
| `name` | `string` | No | The name of this person |
| `skin_color` | `string` | No | The skin color of this person |
| `species` | `table` | No | An array of species resource URLs that this person belongs to |
| `starships` | `table` | No | An array of starship resource URLs that this person has piloted |
| `url` | `string` | No | The hypermedia URL of this resource |
| `vehicles` | `table` | No | An array of vehicle resource URLs that this person has piloted |

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
| `climate` | `string` | No | The climate of this planet |
| `created` | `string` | No | The ISO 8601 date format of the time that this resource was created |
| `diameter` | `string` | No | The diameter of this planet in kilometers |
| `edited` | `string` | No | The ISO 8601 date format of the time that this resource was edited |
| `films` | `table` | No | An array of Film URL Resources that this planet has appeared in |
| `gravity` | `string` | No | A number denoting the gravity of this planet |
| `id` | `string` | No |  |
| `name` | `string` | No | The name of this planet |
| `orbital_period` | `string` | No | The number of standard days it takes for this planet to complete a single orbit of its local star |
| `population` | `string` | No | The average population of sentient beings inhabiting this planet |
| `residents` | `table` | No | An array of People URL Resources that live on this planet |
| `rotation_period` | `string` | No | The number of standard hours it takes for this planet to complete a single rotation on its axis |
| `surface_water` | `string` | No | The percentage of the planet surface that is naturally occurring water |
| `terrain` | `string` | No | The terrain of this planet |
| `url` | `string` | No | The hypermedia URL of this resource |

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
| `average_height` | `string` | No | The average height of this species in centimeters |
| `average_lifespan` | `string` | No | The average lifespan of this species in years |
| `classification` | `string` | No | The classification of this species |
| `created` | `string` | No | The ISO 8601 date format of the time that this resource was created |
| `designation` | `string` | No | The designation of this species |
| `edited` | `string` | No | The ISO 8601 date format of the time that this resource was edited |
| `eye_colors` | `string` | No | A comma-separated string of common eye colors for this species |
| `films` | `table` | No | An array of Film URL Resources that this species has appeared in |
| `hair_colors` | `string` | No | A comma-separated string of common hair colors for this species |
| `homeworld` | `string` | No | The URL of a planet resource that is the homeworld of this species |
| `id` | `string` | No |  |
| `language` | `string` | No | The language commonly spoken by this species |
| `name` | `string` | No | The name of this species |
| `people` | `table` | No | An array of People URL Resources that are a part of this species |
| `skin_colors` | `string` | No | A comma-separated string of common skin colors for this species |
| `url` | `string` | No | The hypermedia URL of this resource |

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
| `MGLT` | `string` | No | The Maximum number of Megalights this starship can travel in a standard hour |
| `cargo_capacity` | `string` | No | The maximum number of kilograms that this starship can transport |
| `consumables` | `string` | No | The maximum length of time that this starship can provide consumables for its entire crew without having to resupply |
| `cost_in_credits` | `string` | No | The cost of this starship new, in galactic credits |
| `created` | `string` | No | The ISO 8601 date format of the time that this resource was created |
| `crew` | `string` | No | The number of personnel needed to run or pilot this starship |
| `edited` | `string` | No | The ISO 8601 date format of the time that this resource was edited |
| `films` | `table` | No | An array of Film URL Resources that this starship has appeared in |
| `hyperdrive_rating` | `string` | No | The class of this starships hyperdrive |
| `id` | `string` | No |  |
| `length` | `string` | No | The length of this starship in meters |
| `manufacturer` | `string` | No | The manufacturer of this starship |
| `max_atmosphering_speed` | `string` | No | The maximum speed of this starship in atmosphere |
| `model` | `string` | No | The model or official name of this starship |
| `name` | `string` | No | The name of this starship |
| `passengers` | `string` | No | The number of non-essential people this starship can transport |
| `pilots` | `table` | No | An array of People URL Resources that this starship has been piloted by |
| `starship_class` | `string` | No | The class of this starship |
| `url` | `string` | No | The hypermedia URL of this resource |

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
| `cargo_capacity` | `string` | No | The maximum number of kilograms that this vehicle can transport |
| `consumables` | `string` | No | The maximum length of time that this vehicle can provide consumables for its entire crew without having to resupply |
| `cost_in_credits` | `string` | No | The cost of this vehicle new, in galactic credits |
| `created` | `string` | No | The ISO 8601 date format of the time that this resource was created |
| `crew` | `string` | No | The number of personnel needed to run or pilot this vehicle |
| `edited` | `string` | No | The ISO 8601 date format of the time that this resource was edited |
| `films` | `table` | No | An array of Film URL Resources that this vehicle has appeared in |
| `id` | `string` | No |  |
| `length` | `string` | No | The length of this vehicle in meters |
| `manufacturer` | `string` | No | The manufacturer of this vehicle |
| `max_atmosphering_speed` | `string` | No | The maximum speed of this vehicle in atmosphere |
| `model` | `string` | No | The model or official name of this vehicle |
| `name` | `string` | No | The name of this vehicle |
| `passengers` | `string` | No | The number of non-essential people this vehicle can transport |
| `pilots` | `table` | No | An array of People URL Resources that this vehicle has been piloted by |
| `url` | `string` | No | The hypermedia URL of this resource |
| `vehicle_class` | `string` | No | The class of this vehicle |

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


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

