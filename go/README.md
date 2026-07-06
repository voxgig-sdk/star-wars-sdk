# StarWars Golang SDK



The Golang SDK for the StarWars API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Film(nil)` — each with the same small set of operations (`List`, `Load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/star-wars-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/star-wars-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/star-wars-sdk/go=../star-wars-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    sdk "github.com/voxgig-sdk/star-wars-sdk/go"
)

func main() {
    client := sdk.New()

    // List film records — the value is the array of records itself.
    films, err := client.Film(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range films.([]any) {
        fmt.Println(item)
    }

    // Load a single film — the value is the loaded record.
    film, err := client.Film(nil).Load(map[string]any{"id": 1}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(film)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
films, err := client.Film(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = films
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

film, err := client.Film(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(film) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewStarWarsSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
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
cd go && go test ./test/...
```


## Reference

### NewStarWarsSDK

```go
func NewStarWarsSDK(options map[string]any) *StarWarsSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *StarWarsSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### StarWarsSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Film` | `(data map[string]any) StarWarsEntity` | Create a Film entity instance. |
| `PeopleList` | `(data map[string]any) StarWarsEntity` | Create a PeopleList entity instance. |
| `Person` | `(data map[string]any) StarWarsEntity` | Create a Person entity instance. |
| `Planet` | `(data map[string]any) StarWarsEntity` | Create a Planet entity instance. |
| `Species` | `(data map[string]any) StarWarsEntity` | Create a Species entity instance. |
| `Starship` | `(data map[string]any) StarWarsEntity` | Create a Starship entity instance. |
| `Vehicle` | `(data map[string]any) StarWarsEntity` | Create a Vehicle entity instance. |

### Entity interface (StarWarsEntity)

All entities implement the `StarWarsEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    film, err := client.Film(nil).List(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // film is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Film

| Field | Description |
| --- | --- |
| `"character"` |  |
| `"created"` |  |
| `"director"` |  |
| `"edited"` |  |
| `"episode_id"` |  |
| `"opening_crawl"` |  |
| `"planet"` |  |
| `"producer"` |  |
| `"release_date"` |  |
| `"species"` |  |
| `"starship"` |  |
| `"title"` |  |
| `"url"` |  |
| `"vehicle"` |  |

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
| `"birth_year"` |  |
| `"created"` |  |
| `"edited"` |  |
| `"eye_color"` |  |
| `"film"` |  |
| `"gender"` |  |
| `"hair_color"` |  |
| `"height"` |  |
| `"homeworld"` |  |
| `"mass"` |  |
| `"name"` |  |
| `"skin_color"` |  |
| `"species"` |  |
| `"starship"` |  |
| `"url"` |  |
| `"vehicle"` |  |

Operations: List, Load.

API path: `/people`

#### Planet

| Field | Description |
| --- | --- |
| `"climate"` |  |
| `"created"` |  |
| `"diameter"` |  |
| `"edited"` |  |
| `"film"` |  |
| `"gravity"` |  |
| `"name"` |  |
| `"orbital_period"` |  |
| `"population"` |  |
| `"resident"` |  |
| `"rotation_period"` |  |
| `"surface_water"` |  |
| `"terrain"` |  |
| `"url"` |  |

Operations: List, Load.

API path: `/planets`

#### Species

| Field | Description |
| --- | --- |
| `"average_height"` |  |
| `"average_lifespan"` |  |
| `"classification"` |  |
| `"created"` |  |
| `"designation"` |  |
| `"edited"` |  |
| `"eye_color"` |  |
| `"film"` |  |
| `"hair_color"` |  |
| `"homeworld"` |  |
| `"language"` |  |
| `"name"` |  |
| `"person"` |  |
| `"skin_color"` |  |
| `"url"` |  |

Operations: List, Load.

API path: `/species`

#### Starship

| Field | Description |
| --- | --- |
| `"cargo_capacity"` |  |
| `"consumable"` |  |
| `"cost_in_credit"` |  |
| `"created"` |  |
| `"crew"` |  |
| `"edited"` |  |
| `"film"` |  |
| `"hyperdrive_rating"` |  |
| `"length"` |  |
| `"manufacturer"` |  |
| `"max_atmosphering_speed"` |  |
| `"mglt"` |  |
| `"model"` |  |
| `"name"` |  |
| `"passenger"` |  |
| `"pilot"` |  |
| `"starship_class"` |  |
| `"url"` |  |

Operations: List, Load.

API path: `/starships`

#### Vehicle

| Field | Description |
| --- | --- |
| `"cargo_capacity"` |  |
| `"consumable"` |  |
| `"cost_in_credit"` |  |
| `"created"` |  |
| `"crew"` |  |
| `"edited"` |  |
| `"film"` |  |
| `"length"` |  |
| `"manufacturer"` |  |
| `"max_atmosphering_speed"` |  |
| `"model"` |  |
| `"name"` |  |
| `"passenger"` |  |
| `"pilot"` |  |
| `"url"` |  |
| `"vehicle_class"` |  |

Operations: List, Load.

API path: `/vehicles`



## Entities


### Film

Create an instance: `film := client.Film(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `character` | `[]any` |  |
| `created` | `string` |  |
| `director` | `string` |  |
| `edited` | `string` |  |
| `episode_id` | `int` |  |
| `opening_crawl` | `string` |  |
| `planet` | `[]any` |  |
| `producer` | `string` |  |
| `release_date` | `string` |  |
| `species` | `[]any` |  |
| `starship` | `[]any` |  |
| `title` | `string` |  |
| `url` | `string` |  |
| `vehicle` | `[]any` |  |

#### Example: Load

```go
film, err := client.Film(nil).Load(map[string]any{"id": "film_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(film) // the loaded record
```

#### Example: List

```go
films, err := client.Film(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(films) // the array of records
```


### PeopleList

Create an instance: `people_list := client.PeopleList(nil)`


### Person

Create an instance: `person := client.Person(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `birth_year` | `string` |  |
| `created` | `string` |  |
| `edited` | `string` |  |
| `eye_color` | `string` |  |
| `film` | `[]any` |  |
| `gender` | `string` |  |
| `hair_color` | `string` |  |
| `height` | `string` |  |
| `homeworld` | `string` |  |
| `mass` | `string` |  |
| `name` | `string` |  |
| `skin_color` | `string` |  |
| `species` | `[]any` |  |
| `starship` | `[]any` |  |
| `url` | `string` |  |
| `vehicle` | `[]any` |  |

#### Example: Load

```go
person, err := client.Person(nil).Load(map[string]any{"id": "person_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(person) // the loaded record
```

#### Example: List

```go
persons, err := client.Person(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(persons) // the array of records
```


### Planet

Create an instance: `planet := client.Planet(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `climate` | `string` |  |
| `created` | `string` |  |
| `diameter` | `string` |  |
| `edited` | `string` |  |
| `film` | `[]any` |  |
| `gravity` | `string` |  |
| `name` | `string` |  |
| `orbital_period` | `string` |  |
| `population` | `string` |  |
| `resident` | `[]any` |  |
| `rotation_period` | `string` |  |
| `surface_water` | `string` |  |
| `terrain` | `string` |  |
| `url` | `string` |  |

#### Example: Load

```go
planet, err := client.Planet(nil).Load(map[string]any{"id": "planet_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(planet) // the loaded record
```

#### Example: List

```go
planets, err := client.Planet(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(planets) // the array of records
```


### Species

Create an instance: `species := client.Species(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `average_height` | `string` |  |
| `average_lifespan` | `string` |  |
| `classification` | `string` |  |
| `created` | `string` |  |
| `designation` | `string` |  |
| `edited` | `string` |  |
| `eye_color` | `string` |  |
| `film` | `[]any` |  |
| `hair_color` | `string` |  |
| `homeworld` | `string` |  |
| `language` | `string` |  |
| `name` | `string` |  |
| `person` | `[]any` |  |
| `skin_color` | `string` |  |
| `url` | `string` |  |

#### Example: Load

```go
species, err := client.Species(nil).Load(map[string]any{"id": "species_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(species) // the loaded record
```

#### Example: List

```go
speciess, err := client.Species(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(speciess) // the array of records
```


### Starship

Create an instance: `starship := client.Starship(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cargo_capacity` | `string` |  |
| `consumable` | `string` |  |
| `cost_in_credit` | `string` |  |
| `created` | `string` |  |
| `crew` | `string` |  |
| `edited` | `string` |  |
| `film` | `[]any` |  |
| `hyperdrive_rating` | `string` |  |
| `length` | `string` |  |
| `manufacturer` | `string` |  |
| `max_atmosphering_speed` | `string` |  |
| `mglt` | `string` |  |
| `model` | `string` |  |
| `name` | `string` |  |
| `passenger` | `string` |  |
| `pilot` | `[]any` |  |
| `starship_class` | `string` |  |
| `url` | `string` |  |

#### Example: Load

```go
starship, err := client.Starship(nil).Load(map[string]any{"id": "starship_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(starship) // the loaded record
```

#### Example: List

```go
starships, err := client.Starship(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(starships) // the array of records
```


### Vehicle

Create an instance: `vehicle := client.Vehicle(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cargo_capacity` | `string` |  |
| `consumable` | `string` |  |
| `cost_in_credit` | `string` |  |
| `created` | `string` |  |
| `crew` | `string` |  |
| `edited` | `string` |  |
| `film` | `[]any` |  |
| `length` | `string` |  |
| `manufacturer` | `string` |  |
| `max_atmosphering_speed` | `string` |  |
| `model` | `string` |  |
| `name` | `string` |  |
| `passenger` | `string` |  |
| `pilot` | `[]any` |  |
| `url` | `string` |  |
| `vehicle_class` | `string` |  |

#### Example: Load

```go
vehicle, err := client.Vehicle(nil).Load(map[string]any{"id": "vehicle_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(vehicle) // the loaded record
```

#### Example: List

```go
vehicles, err := client.Vehicle(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(vehicles) // the array of records
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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/star-wars-sdk/go/
├── star-wars.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/star-wars-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
film := client.Film(nil)
film.List(nil, nil)

// film.Data() now returns the film data from the last list
// film.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
