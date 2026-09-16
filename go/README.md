# StarWars Golang SDK



The Golang SDK for the StarWars API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Film(nil)` — each with the same small set of operations (`List`, `Load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
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
persons, err := client.Person(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = persons
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

person, err := client.Person(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(person) // the returned mock data
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
| `"characters"` | An array of people resource URLs that are in this film |
| `"created"` | The ISO 8601 date format of the time that this resource was created |
| `"director"` | The name of the director of this film |
| `"edited"` | The ISO 8601 date format of the time that this resource was edited |
| `"episode_id"` | The episode number of this film |
| `"id"` |  |
| `"opening_crawl"` | The opening paragraphs at the beginning of this film |
| `"planets"` | An array of planet resource URLs that are in this film |
| `"producer"` | The name(s) of the producer(s) of this film |
| `"release_date"` | The release date of this film |
| `"species"` | An array of species resource URLs that are in this film |
| `"starships"` | An array of starship resource URLs that are in this film |
| `"title"` | The title of this film |
| `"url"` | The hypermedia URL of this resource |
| `"vehicles"` | An array of vehicle resource URLs that are in this film |

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
| `"birth_year"` | The birth year of the person, using the in-universe standard of BBY or ABY |
| `"created"` | The ISO 8601 date format of the time that this resource was created |
| `"edited"` | The ISO 8601 date format of the time that this resource was edited |
| `"eye_color"` | The eye color of this person |
| `"films"` | An array of film resource URLs that this person has been in |
| `"gender"` | The gender of this person |
| `"hair_color"` | The hair color of this person |
| `"height"` | The height of the person in centimeters |
| `"homeworld"` | The URL of the planet resource that this person was born on |
| `"id"` |  |
| `"mass"` | The mass of the person in kilograms |
| `"name"` | The name of this person |
| `"skin_color"` | The skin color of this person |
| `"species"` | An array of species resource URLs that this person belongs to |
| `"starships"` | An array of starship resource URLs that this person has piloted |
| `"url"` | The hypermedia URL of this resource |
| `"vehicles"` | An array of vehicle resource URLs that this person has piloted |

Operations: List, Load.

API path: `/people`

#### Planet

| Field | Description |
| --- | --- |
| `"climate"` | The climate of this planet |
| `"created"` | The ISO 8601 date format of the time that this resource was created |
| `"diameter"` | The diameter of this planet in kilometers |
| `"edited"` | The ISO 8601 date format of the time that this resource was edited |
| `"films"` | An array of Film URL Resources that this planet has appeared in |
| `"gravity"` | A number denoting the gravity of this planet |
| `"id"` |  |
| `"name"` | The name of this planet |
| `"orbital_period"` | The number of standard days it takes for this planet to complete a single orbit of its local star |
| `"population"` | The average population of sentient beings inhabiting this planet |
| `"residents"` | An array of People URL Resources that live on this planet |
| `"rotation_period"` | The number of standard hours it takes for this planet to complete a single rotation on its axis |
| `"surface_water"` | The percentage of the planet surface that is naturally occurring water |
| `"terrain"` | The terrain of this planet |
| `"url"` | The hypermedia URL of this resource |

Operations: List, Load.

API path: `/planets`

#### Species

| Field | Description |
| --- | --- |
| `"average_height"` | The average height of this species in centimeters |
| `"average_lifespan"` | The average lifespan of this species in years |
| `"classification"` | The classification of this species |
| `"created"` | The ISO 8601 date format of the time that this resource was created |
| `"designation"` | The designation of this species |
| `"edited"` | The ISO 8601 date format of the time that this resource was edited |
| `"eye_colors"` | A comma-separated string of common eye colors for this species |
| `"films"` | An array of Film URL Resources that this species has appeared in |
| `"hair_colors"` | A comma-separated string of common hair colors for this species |
| `"homeworld"` | The URL of a planet resource that is the homeworld of this species |
| `"id"` |  |
| `"language"` | The language commonly spoken by this species |
| `"name"` | The name of this species |
| `"people"` | An array of People URL Resources that are a part of this species |
| `"skin_colors"` | A comma-separated string of common skin colors for this species |
| `"url"` | The hypermedia URL of this resource |

Operations: List, Load.

API path: `/species`

#### Starship

| Field | Description |
| --- | --- |
| `"MGLT"` | The Maximum number of Megalights this starship can travel in a standard hour |
| `"cargo_capacity"` | The maximum number of kilograms that this starship can transport |
| `"consumables"` | The maximum length of time that this starship can provide consumables for its entire crew without having to resupply |
| `"cost_in_credits"` | The cost of this starship new, in galactic credits |
| `"created"` | The ISO 8601 date format of the time that this resource was created |
| `"crew"` | The number of personnel needed to run or pilot this starship |
| `"edited"` | The ISO 8601 date format of the time that this resource was edited |
| `"films"` | An array of Film URL Resources that this starship has appeared in |
| `"hyperdrive_rating"` | The class of this starships hyperdrive |
| `"id"` |  |
| `"length"` | The length of this starship in meters |
| `"manufacturer"` | The manufacturer of this starship |
| `"max_atmosphering_speed"` | The maximum speed of this starship in atmosphere |
| `"model"` | The model or official name of this starship |
| `"name"` | The name of this starship |
| `"passengers"` | The number of non-essential people this starship can transport |
| `"pilots"` | An array of People URL Resources that this starship has been piloted by |
| `"starship_class"` | The class of this starship |
| `"url"` | The hypermedia URL of this resource |

Operations: List, Load.

API path: `/starships`

#### Vehicle

| Field | Description |
| --- | --- |
| `"cargo_capacity"` | The maximum number of kilograms that this vehicle can transport |
| `"consumables"` | The maximum length of time that this vehicle can provide consumables for its entire crew without having to resupply |
| `"cost_in_credits"` | The cost of this vehicle new, in galactic credits |
| `"created"` | The ISO 8601 date format of the time that this resource was created |
| `"crew"` | The number of personnel needed to run or pilot this vehicle |
| `"edited"` | The ISO 8601 date format of the time that this resource was edited |
| `"films"` | An array of Film URL Resources that this vehicle has appeared in |
| `"id"` |  |
| `"length"` | The length of this vehicle in meters |
| `"manufacturer"` | The manufacturer of this vehicle |
| `"max_atmosphering_speed"` | The maximum speed of this vehicle in atmosphere |
| `"model"` | The model or official name of this vehicle |
| `"name"` | The name of this vehicle |
| `"passengers"` | The number of non-essential people this vehicle can transport |
| `"pilots"` | An array of People URL Resources that this vehicle has been piloted by |
| `"url"` | The hypermedia URL of this resource |
| `"vehicle_class"` | The class of this vehicle |

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
| `characters` | `[]any` | An array of people resource URLs that are in this film |
| `created` | `string` | The ISO 8601 date format of the time that this resource was created |
| `director` | `string` | The name of the director of this film |
| `edited` | `string` | The ISO 8601 date format of the time that this resource was edited |
| `episode_id` | `int` | The episode number of this film |
| `id` | `string` |  |
| `opening_crawl` | `string` | The opening paragraphs at the beginning of this film |
| `planets` | `[]any` | An array of planet resource URLs that are in this film |
| `producer` | `string` | The name(s) of the producer(s) of this film |
| `release_date` | `string` | The release date of this film |
| `species` | `[]any` | An array of species resource URLs that are in this film |
| `starships` | `[]any` | An array of starship resource URLs that are in this film |
| `title` | `string` | The title of this film |
| `url` | `string` | The hypermedia URL of this resource |
| `vehicles` | `[]any` | An array of vehicle resource URLs that are in this film |

#### Example: Load

```go
film, err := client.Film(nil).Load(map[string]any{"id": 1}, nil)
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

Create an instance: `peopleList := client.PeopleList(nil)`


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
| `birth_year` | `string` | The birth year of the person, using the in-universe standard of BBY or ABY |
| `created` | `string` | The ISO 8601 date format of the time that this resource was created |
| `edited` | `string` | The ISO 8601 date format of the time that this resource was edited |
| `eye_color` | `string` | The eye color of this person |
| `films` | `[]any` | An array of film resource URLs that this person has been in |
| `gender` | `string` | The gender of this person |
| `hair_color` | `string` | The hair color of this person |
| `height` | `string` | The height of the person in centimeters |
| `homeworld` | `string` | The URL of the planet resource that this person was born on |
| `id` | `string` |  |
| `mass` | `string` | The mass of the person in kilograms |
| `name` | `string` | The name of this person |
| `skin_color` | `string` | The skin color of this person |
| `species` | `[]any` | An array of species resource URLs that this person belongs to |
| `starships` | `[]any` | An array of starship resource URLs that this person has piloted |
| `url` | `string` | The hypermedia URL of this resource |
| `vehicles` | `[]any` | An array of vehicle resource URLs that this person has piloted |

#### Example: Load

```go
person, err := client.Person(nil).Load(map[string]any{"id": 1}, nil)
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
| `climate` | `string` | The climate of this planet |
| `created` | `string` | The ISO 8601 date format of the time that this resource was created |
| `diameter` | `string` | The diameter of this planet in kilometers |
| `edited` | `string` | The ISO 8601 date format of the time that this resource was edited |
| `films` | `[]any` | An array of Film URL Resources that this planet has appeared in |
| `gravity` | `string` | A number denoting the gravity of this planet |
| `id` | `string` |  |
| `name` | `string` | The name of this planet |
| `orbital_period` | `string` | The number of standard days it takes for this planet to complete a single orbit of its local star |
| `population` | `string` | The average population of sentient beings inhabiting this planet |
| `residents` | `[]any` | An array of People URL Resources that live on this planet |
| `rotation_period` | `string` | The number of standard hours it takes for this planet to complete a single rotation on its axis |
| `surface_water` | `string` | The percentage of the planet surface that is naturally occurring water |
| `terrain` | `string` | The terrain of this planet |
| `url` | `string` | The hypermedia URL of this resource |

#### Example: Load

```go
planet, err := client.Planet(nil).Load(map[string]any{"id": 1}, nil)
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
| `average_height` | `string` | The average height of this species in centimeters |
| `average_lifespan` | `string` | The average lifespan of this species in years |
| `classification` | `string` | The classification of this species |
| `created` | `string` | The ISO 8601 date format of the time that this resource was created |
| `designation` | `string` | The designation of this species |
| `edited` | `string` | The ISO 8601 date format of the time that this resource was edited |
| `eye_colors` | `string` | A comma-separated string of common eye colors for this species |
| `films` | `[]any` | An array of Film URL Resources that this species has appeared in |
| `hair_colors` | `string` | A comma-separated string of common hair colors for this species |
| `homeworld` | `string` | The URL of a planet resource that is the homeworld of this species |
| `id` | `string` |  |
| `language` | `string` | The language commonly spoken by this species |
| `name` | `string` | The name of this species |
| `people` | `[]any` | An array of People URL Resources that are a part of this species |
| `skin_colors` | `string` | A comma-separated string of common skin colors for this species |
| `url` | `string` | The hypermedia URL of this resource |

#### Example: Load

```go
species, err := client.Species(nil).Load(map[string]any{"id": 1}, nil)
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
| `MGLT` | `string` | The Maximum number of Megalights this starship can travel in a standard hour |
| `cargo_capacity` | `string` | The maximum number of kilograms that this starship can transport |
| `consumables` | `string` | The maximum length of time that this starship can provide consumables for its entire crew without having to resupply |
| `cost_in_credits` | `string` | The cost of this starship new, in galactic credits |
| `created` | `string` | The ISO 8601 date format of the time that this resource was created |
| `crew` | `string` | The number of personnel needed to run or pilot this starship |
| `edited` | `string` | The ISO 8601 date format of the time that this resource was edited |
| `films` | `[]any` | An array of Film URL Resources that this starship has appeared in |
| `hyperdrive_rating` | `string` | The class of this starships hyperdrive |
| `id` | `string` |  |
| `length` | `string` | The length of this starship in meters |
| `manufacturer` | `string` | The manufacturer of this starship |
| `max_atmosphering_speed` | `string` | The maximum speed of this starship in atmosphere |
| `model` | `string` | The model or official name of this starship |
| `name` | `string` | The name of this starship |
| `passengers` | `string` | The number of non-essential people this starship can transport |
| `pilots` | `[]any` | An array of People URL Resources that this starship has been piloted by |
| `starship_class` | `string` | The class of this starship |
| `url` | `string` | The hypermedia URL of this resource |

#### Example: Load

```go
starship, err := client.Starship(nil).Load(map[string]any{"id": 1}, nil)
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
| `cargo_capacity` | `string` | The maximum number of kilograms that this vehicle can transport |
| `consumables` | `string` | The maximum length of time that this vehicle can provide consumables for its entire crew without having to resupply |
| `cost_in_credits` | `string` | The cost of this vehicle new, in galactic credits |
| `created` | `string` | The ISO 8601 date format of the time that this resource was created |
| `crew` | `string` | The number of personnel needed to run or pilot this vehicle |
| `edited` | `string` | The ISO 8601 date format of the time that this resource was edited |
| `films` | `[]any` | An array of Film URL Resources that this vehicle has appeared in |
| `id` | `string` |  |
| `length` | `string` | The length of this vehicle in meters |
| `manufacturer` | `string` | The manufacturer of this vehicle |
| `max_atmosphering_speed` | `string` | The maximum speed of this vehicle in atmosphere |
| `model` | `string` | The model or official name of this vehicle |
| `name` | `string` | The name of this vehicle |
| `passengers` | `string` | The number of non-essential people this vehicle can transport |
| `pilots` | `[]any` | An array of People URL Resources that this vehicle has been piloted by |
| `url` | `string` | The hypermedia URL of this resource |
| `vehicle_class` | `string` | The class of this vehicle |

#### Example: Load

```go
vehicle, err := client.Vehicle(nil).Load(map[string]any{"id": 1}, nil)
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

## Features

This SDK ships 4 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`ratelimit`](#ratelimit) | Client-side rate limiting via a token bucket |
| [`retry`](#retry) | Automatic retry of transient failures with exponential backoff |
| [`test`](#test) | In-memory mock transport for testing without a live server |
| [`timeout`](#timeout) | Per-request timeout with transport abort |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### ratelimit

Client-side rate limiting via a token bucket.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Automatic retry of transient failures with exponential backoff.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Per-request timeout with transport abort.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


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

- **RatelimitFeature**: Client-side rate limiting via a token bucket
- **RetryFeature**: Automatic retry of transient failures with exponential backoff
- **TestFeature**: In-memory mock transport for testing without a live server
- **TimeoutFeature**: Per-request timeout with transport abort

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
person := client.Person(nil)
person.List(nil, nil)

// person.Data() now returns the person data from the last list
// person.Match() returns the last match criteria
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
