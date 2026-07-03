# StarWars Golang SDK



The Golang SDK for the StarWars API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/star-wars-sdk/go
```

If the module is not yet published to a registry, use a `replace` directive
in your `go.mod` to point to a local checkout:

```bash
go mod edit -replace github.com/voxgig-sdk/star-wars-sdk/go=../path/to/github.com/voxgig-sdk/star-wars-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```go
package main

import (
    "fmt"
    "os"

    sdk "github.com/voxgig-sdk/star-wars-sdk/go"
    "github.com/voxgig-sdk/star-wars-sdk/go/core"
)

func main() {
    client := sdk.NewStarWarsSDK(map[string]any{
        "apikey": os.Getenv("STAR-WARS_APIKEY"),
    })
```

### 2. List films

```go
    result, err := client.Film(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }

    rm := core.ToMapAny(result)
    if rm["ok"] == true {
        for _, item := range rm["data"].([]any) {
            p := core.ToMapAny(item)
            fmt.Println(p["id"], p["name"])
        }
    }
```

### 3. Load a film

```go
    result, err = client.Film(nil).Load(
        map[string]any{"id": "example_id"}, nil,
    )
    if err != nil {
        panic(err)
    }

    rm = core.ToMapAny(result)
    if rm["ok"] == true {
        fmt.Println(rm["data"])
    }
}
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

result, err := client.Planet(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
// result contains mock response data
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
STAR-WARS_TEST_LIVE=TRUE
STAR-WARS_APIKEY=<your-key>
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
| `"apikey"` | `string` | API key for authentication. |
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
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(any, error)`. The `any` value is a
`map[string]any` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `"ok"` | `bool` | `true` if the HTTP status is 2xx. |
| `"status"` | `int` | HTTP status code. |
| `"headers"` | `map[string]any` | Response headers. |
| `"data"` | `any` | Parsed JSON response body. |

On error, `"ok"` is `false` and `"err"` contains the error value.

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
| `character` | ``$ARRAY`` |  |
| `created` | ``$STRING`` |  |
| `director` | ``$STRING`` |  |
| `edited` | ``$STRING`` |  |
| `episode_id` | ``$INTEGER`` |  |
| `opening_crawl` | ``$STRING`` |  |
| `planet` | ``$ARRAY`` |  |
| `producer` | ``$STRING`` |  |
| `release_date` | ``$STRING`` |  |
| `species` | ``$ARRAY`` |  |
| `starship` | ``$ARRAY`` |  |
| `title` | ``$STRING`` |  |
| `url` | ``$STRING`` |  |
| `vehicle` | ``$ARRAY`` |  |

#### Example: Load

```go
result, err := client.Film(nil).Load(map[string]any{"id": "film_id"}, nil)
```

#### Example: List

```go
results, err := client.Film(nil).List(nil, nil)
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
| `birth_year` | ``$STRING`` |  |
| `created` | ``$STRING`` |  |
| `edited` | ``$STRING`` |  |
| `eye_color` | ``$STRING`` |  |
| `film` | ``$ARRAY`` |  |
| `gender` | ``$STRING`` |  |
| `hair_color` | ``$STRING`` |  |
| `height` | ``$STRING`` |  |
| `homeworld` | ``$STRING`` |  |
| `mass` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `skin_color` | ``$STRING`` |  |
| `species` | ``$ARRAY`` |  |
| `starship` | ``$ARRAY`` |  |
| `url` | ``$STRING`` |  |
| `vehicle` | ``$ARRAY`` |  |

#### Example: Load

```go
result, err := client.Person(nil).Load(map[string]any{"id": "person_id"}, nil)
```

#### Example: List

```go
results, err := client.Person(nil).List(nil, nil)
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
| `climate` | ``$STRING`` |  |
| `created` | ``$STRING`` |  |
| `diameter` | ``$STRING`` |  |
| `edited` | ``$STRING`` |  |
| `film` | ``$ARRAY`` |  |
| `gravity` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `orbital_period` | ``$STRING`` |  |
| `population` | ``$STRING`` |  |
| `resident` | ``$ARRAY`` |  |
| `rotation_period` | ``$STRING`` |  |
| `surface_water` | ``$STRING`` |  |
| `terrain` | ``$STRING`` |  |
| `url` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.Planet(nil).Load(map[string]any{"id": "planet_id"}, nil)
```

#### Example: List

```go
results, err := client.Planet(nil).List(nil, nil)
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
| `average_height` | ``$STRING`` |  |
| `average_lifespan` | ``$STRING`` |  |
| `classification` | ``$STRING`` |  |
| `created` | ``$STRING`` |  |
| `designation` | ``$STRING`` |  |
| `edited` | ``$STRING`` |  |
| `eye_color` | ``$STRING`` |  |
| `film` | ``$ARRAY`` |  |
| `hair_color` | ``$STRING`` |  |
| `homeworld` | ``$STRING`` |  |
| `language` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `person` | ``$ARRAY`` |  |
| `skin_color` | ``$STRING`` |  |
| `url` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.Species(nil).Load(map[string]any{"id": "species_id"}, nil)
```

#### Example: List

```go
results, err := client.Species(nil).List(nil, nil)
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
| `cargo_capacity` | ``$STRING`` |  |
| `consumable` | ``$STRING`` |  |
| `cost_in_credit` | ``$STRING`` |  |
| `created` | ``$STRING`` |  |
| `crew` | ``$STRING`` |  |
| `edited` | ``$STRING`` |  |
| `film` | ``$ARRAY`` |  |
| `hyperdrive_rating` | ``$STRING`` |  |
| `length` | ``$STRING`` |  |
| `manufacturer` | ``$STRING`` |  |
| `max_atmosphering_speed` | ``$STRING`` |  |
| `mglt` | ``$STRING`` |  |
| `model` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `passenger` | ``$STRING`` |  |
| `pilot` | ``$ARRAY`` |  |
| `starship_class` | ``$STRING`` |  |
| `url` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.Starship(nil).Load(map[string]any{"id": "starship_id"}, nil)
```

#### Example: List

```go
results, err := client.Starship(nil).List(nil, nil)
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
| `cargo_capacity` | ``$STRING`` |  |
| `consumable` | ``$STRING`` |  |
| `cost_in_credit` | ``$STRING`` |  |
| `created` | ``$STRING`` |  |
| `crew` | ``$STRING`` |  |
| `edited` | ``$STRING`` |  |
| `film` | ``$ARRAY`` |  |
| `length` | ``$STRING`` |  |
| `manufacturer` | ``$STRING`` |  |
| `max_atmosphering_speed` | ``$STRING`` |  |
| `model` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `passenger` | ``$STRING`` |  |
| `pilot` | ``$ARRAY`` |  |
| `url` | ``$STRING`` |  |
| `vehicle_class` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.Vehicle(nil).Load(map[string]any{"id": "vehicle_id"}, nil)
```

#### Example: List

```go
results, err := client.Vehicle(nil).List(nil, nil)
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

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

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller. An unexpected panic triggers the
`PreUnexpected` hook.

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

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
moon := client.Moon(nil)
moon.Load(map[string]any{"planet_id": "earth", "id": "luna"}, nil)

// moon.Data() now returns the loaded moon data
// moon.Match() returns the last match criteria
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
