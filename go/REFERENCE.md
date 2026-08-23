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
fmt.Println(film.GetName()) // "film"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `characters` | `[]any` | No | An array of people resource URLs that are in this film |
| `created` | `string` | No | The ISO 8601 date format of the time that this resource was created |
| `director` | `string` | No | The name of the director of this film |
| `edited` | `string` | No | The ISO 8601 date format of the time that this resource was edited |
| `episode_id` | `int` | No | The episode number of this film |
| `opening_crawl` | `string` | No | The opening paragraphs at the beginning of this film |
| `planets` | `[]any` | No | An array of planet resource URLs that are in this film |
| `producer` | `string` | No | The name(s) of the producer(s) of this film |
| `release_date` | `string` | No | The release date of this film |
| `species` | `[]any` | No | An array of species resource URLs that are in this film |
| `starships` | `[]any` | No | An array of starship resource URLs that are in this film |
| `title` | `string` | No | The title of this film |
| `url` | `string` | No | The hypermedia URL of this resource |
| `vehicles` | `[]any` | No | An array of vehicle resource URLs that are in this film |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Film(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Film(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
peopleList := client.PeopleList(nil)
fmt.Println(peopleList.GetName()) // "people_list"
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
fmt.Println(person.GetName()) // "person"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `birth_year` | `string` | No | The birth year of the person, using the in-universe standard of BBY or ABY |
| `created` | `string` | No | The ISO 8601 date format of the time that this resource was created |
| `edited` | `string` | No | The ISO 8601 date format of the time that this resource was edited |
| `eye_color` | `string` | No | The eye color of this person |
| `films` | `[]any` | No | An array of film resource URLs that this person has been in |
| `gender` | `string` | No | The gender of this person |
| `hair_color` | `string` | No | The hair color of this person |
| `height` | `string` | No | The height of the person in centimeters |
| `homeworld` | `string` | No | The URL of the planet resource that this person was born on |
| `mass` | `string` | No | The mass of the person in kilograms |
| `name` | `string` | No | The name of this person |
| `skin_color` | `string` | No | The skin color of this person |
| `species` | `[]any` | No | An array of species resource URLs that this person belongs to |
| `starships` | `[]any` | No | An array of starship resource URLs that this person has piloted |
| `url` | `string` | No | The hypermedia URL of this resource |
| `vehicles` | `[]any` | No | An array of vehicle resource URLs that this person has piloted |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Person(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Person(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(planet.GetName()) // "planet"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `climate` | `string` | No | The climate of this planet |
| `created` | `string` | No | The ISO 8601 date format of the time that this resource was created |
| `diameter` | `string` | No | The diameter of this planet in kilometers |
| `edited` | `string` | No | The ISO 8601 date format of the time that this resource was edited |
| `films` | `[]any` | No | An array of Film URL Resources that this planet has appeared in |
| `gravity` | `string` | No | A number denoting the gravity of this planet |
| `name` | `string` | No | The name of this planet |
| `orbital_period` | `string` | No | The number of standard days it takes for this planet to complete a single orbit of its local star |
| `population` | `string` | No | The average population of sentient beings inhabiting this planet |
| `residents` | `[]any` | No | An array of People URL Resources that live on this planet |
| `rotation_period` | `string` | No | The number of standard hours it takes for this planet to complete a single rotation on its axis |
| `surface_water` | `string` | No | The percentage of the planet surface that is naturally occurring water |
| `terrain` | `string` | No | The terrain of this planet |
| `url` | `string` | No | The hypermedia URL of this resource |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Planet(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Planet(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(species.GetName()) // "species"
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
| `films` | `[]any` | No | An array of Film URL Resources that this species has appeared in |
| `hair_colors` | `string` | No | A comma-separated string of common hair colors for this species |
| `homeworld` | `string` | No | The URL of a planet resource that is the homeworld of this species |
| `language` | `string` | No | The language commonly spoken by this species |
| `name` | `string` | No | The name of this species |
| `people` | `[]any` | No | An array of People URL Resources that are a part of this species |
| `skin_colors` | `string` | No | A comma-separated string of common skin colors for this species |
| `url` | `string` | No | The hypermedia URL of this resource |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Species(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Species(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(starship.GetName()) // "starship"
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
| `films` | `[]any` | No | An array of Film URL Resources that this starship has appeared in |
| `hyperdrive_rating` | `string` | No | The class of this starships hyperdrive |
| `length` | `string` | No | The length of this starship in meters |
| `manufacturer` | `string` | No | The manufacturer of this starship |
| `max_atmosphering_speed` | `string` | No | The maximum speed of this starship in atmosphere |
| `model` | `string` | No | The model or official name of this starship |
| `name` | `string` | No | The name of this starship |
| `passengers` | `string` | No | The number of non-essential people this starship can transport |
| `pilots` | `[]any` | No | An array of People URL Resources that this starship has been piloted by |
| `starship_class` | `string` | No | The class of this starship |
| `url` | `string` | No | The hypermedia URL of this resource |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Starship(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Starship(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(vehicle.GetName()) // "vehicle"
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
| `films` | `[]any` | No | An array of Film URL Resources that this vehicle has appeared in |
| `length` | `string` | No | The length of this vehicle in meters |
| `manufacturer` | `string` | No | The manufacturer of this vehicle |
| `max_atmosphering_speed` | `string` | No | The maximum speed of this vehicle in atmosphere |
| `model` | `string` | No | The model or official name of this vehicle |
| `name` | `string` | No | The name of this vehicle |
| `passengers` | `string` | No | The number of non-essential people this vehicle can transport |
| `pilots` | `[]any` | No | An array of People URL Resources that this vehicle has been piloted by |
| `url` | `string` | No | The hypermedia URL of this resource |
| `vehicle_class` | `string` | No | The class of this vehicle |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Vehicle(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Vehicle(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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

