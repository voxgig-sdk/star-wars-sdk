# StarWars Golang SDK Reference

Complete API reference for the StarWars Golang SDK.


## StarWarsSDK

### Constructor

```go
func NewStarWarsSDK(options map[string]any) *StarWarsSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *StarWarsSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *StarWarsSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Film(data map[string]any) StarWarsEntity`

Create a new `Film` entity instance. Pass `nil` for no initial data.

#### `PeopleList(data map[string]any) StarWarsEntity`

Create a new `PeopleList` entity instance. Pass `nil` for no initial data.

#### `Person(data map[string]any) StarWarsEntity`

Create a new `Person` entity instance. Pass `nil` for no initial data.

#### `Planet(data map[string]any) StarWarsEntity`

Create a new `Planet` entity instance. Pass `nil` for no initial data.

#### `Species(data map[string]any) StarWarsEntity`

Create a new `Species` entity instance. Pass `nil` for no initial data.

#### `Starship(data map[string]any) StarWarsEntity`

Create a new `Starship` entity instance. Pass `nil` for no initial data.

#### `Vehicle(data map[string]any) StarWarsEntity`

Create a new `Vehicle` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## FilmEntity

```go
film := client.Film(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `character` | `[]any` | No |  |
| `created` | `string` | No |  |
| `director` | `string` | No |  |
| `edited` | `string` | No |  |
| `episode_id` | `int` | No |  |
| `opening_crawl` | `string` | No |  |
| `planet` | `[]any` | No |  |
| `producer` | `string` | No |  |
| `release_date` | `string` | No |  |
| `species` | `[]any` | No |  |
| `starship` | `[]any` | No |  |
| `title` | `string` | No |  |
| `url` | `string` | No |  |
| `vehicle` | `[]any` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Film(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Film(nil).Load(map[string]any{"id": "film_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `FilmEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PeopleListEntity

```go
people_list := client.PeopleList(nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PeopleListEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PersonEntity

```go
person := client.Person(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `birth_year` | `string` | No |  |
| `created` | `string` | No |  |
| `edited` | `string` | No |  |
| `eye_color` | `string` | No |  |
| `film` | `[]any` | No |  |
| `gender` | `string` | No |  |
| `hair_color` | `string` | No |  |
| `height` | `string` | No |  |
| `homeworld` | `string` | No |  |
| `mass` | `string` | No |  |
| `name` | `string` | No |  |
| `skin_color` | `string` | No |  |
| `species` | `[]any` | No |  |
| `starship` | `[]any` | No |  |
| `url` | `string` | No |  |
| `vehicle` | `[]any` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Person(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Person(nil).Load(map[string]any{"id": "person_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PersonEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PlanetEntity

```go
planet := client.Planet(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `climate` | `string` | No |  |
| `created` | `string` | No |  |
| `diameter` | `string` | No |  |
| `edited` | `string` | No |  |
| `film` | `[]any` | No |  |
| `gravity` | `string` | No |  |
| `name` | `string` | No |  |
| `orbital_period` | `string` | No |  |
| `population` | `string` | No |  |
| `resident` | `[]any` | No |  |
| `rotation_period` | `string` | No |  |
| `surface_water` | `string` | No |  |
| `terrain` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Planet(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Planet(nil).Load(map[string]any{"id": "planet_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PlanetEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## SpeciesEntity

```go
species := client.Species(nil)
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
| `film` | `[]any` | No |  |
| `hair_color` | `string` | No |  |
| `homeworld` | `string` | No |  |
| `language` | `string` | No |  |
| `name` | `string` | No |  |
| `person` | `[]any` | No |  |
| `skin_color` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Species(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Species(nil).Load(map[string]any{"id": "species_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SpeciesEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## StarshipEntity

```go
starship := client.Starship(nil)
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
| `film` | `[]any` | No |  |
| `hyperdrive_rating` | `string` | No |  |
| `length` | `string` | No |  |
| `manufacturer` | `string` | No |  |
| `max_atmosphering_speed` | `string` | No |  |
| `mglt` | `string` | No |  |
| `model` | `string` | No |  |
| `name` | `string` | No |  |
| `passenger` | `string` | No |  |
| `pilot` | `[]any` | No |  |
| `starship_class` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Starship(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Starship(nil).Load(map[string]any{"id": "starship_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `StarshipEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## VehicleEntity

```go
vehicle := client.Vehicle(nil)
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
| `film` | `[]any` | No |  |
| `length` | `string` | No |  |
| `manufacturer` | `string` | No |  |
| `max_atmosphering_speed` | `string` | No |  |
| `model` | `string` | No |  |
| `name` | `string` | No |  |
| `passenger` | `string` | No |  |
| `pilot` | `[]any` | No |  |
| `url` | `string` | No |  |
| `vehicle_class` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Vehicle(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Vehicle(nil).Load(map[string]any{"id": "vehicle_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `VehicleEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewStarWarsSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

