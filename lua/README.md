# StarWars Lua SDK



The Lua SDK for the StarWars API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Film()` — each with the same small set of operations (`list`, `load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/star-wars-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("star-wars_sdk")

local client = sdk.new()
```

### 2. List film records

Entity operations return `(value, err)`. For `list`, `value` is the
array of records itself — iterate it directly (there is no wrapper).

```lua
local films, err = client:Film():list()
if err then error(err) end

for _, item in ipairs(films) do
  print(item["created"])
end
```

### 3. Load a film

```lua
local film, err = client:Film():load({ id = 1 })
if err then error(err) end
print(film)
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local persons, err = client:Person():list()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:Person():list()
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
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
cd lua && busted test/
```


## Reference

### StarWarsSDK

```lua
local sdk = require("star-wars_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### StarWarsSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
| `Film` | `(data) -> FilmEntity` | Create a Film entity instance. |
| `PeopleList` | `(data) -> PeopleListEntity` | Create a PeopleList entity instance. |
| `Person` | `(data) -> PersonEntity` | Create a Person entity instance. |
| `Planet` | `(data) -> PlanetEntity` | Create a Planet entity instance. |
| `Species` | `(data) -> SpeciesEntity` | Create a Species entity instance. |
| `Starship` | `(data) -> StarshipEntity` | Create a Starship entity instance. |
| `Vehicle` | `(data) -> VehicleEntity` | Create a Vehicle entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local film, err = client:Film():load({ id = "example_id" })
    if err then error(err) end
    -- film is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

### Entities

#### Film

| Field | Description |
| --- | --- |
| `characters` | An array of people resource URLs that are in this film |
| `created` | The ISO 8601 date format of the time that this resource was created |
| `director` | The name of the director of this film |
| `edited` | The ISO 8601 date format of the time that this resource was edited |
| `episode_id` | The episode number of this film |
| `opening_crawl` | The opening paragraphs at the beginning of this film |
| `planets` | An array of planet resource URLs that are in this film |
| `producer` | The name(s) of the producer(s) of this film |
| `release_date` | The release date of this film |
| `species` | An array of species resource URLs that are in this film |
| `starships` | An array of starship resource URLs that are in this film |
| `title` | The title of this film |
| `url` | The hypermedia URL of this resource |
| `vehicles` | An array of vehicle resource URLs that are in this film |

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
| `birth_year` | The birth year of the person, using the in-universe standard of BBY or ABY |
| `created` | The ISO 8601 date format of the time that this resource was created |
| `edited` | The ISO 8601 date format of the time that this resource was edited |
| `eye_color` | The eye color of this person |
| `films` | An array of film resource URLs that this person has been in |
| `gender` | The gender of this person |
| `hair_color` | The hair color of this person |
| `height` | The height of the person in centimeters |
| `homeworld` | The URL of the planet resource that this person was born on |
| `mass` | The mass of the person in kilograms |
| `name` | The name of this person |
| `skin_color` | The skin color of this person |
| `species` | An array of species resource URLs that this person belongs to |
| `starships` | An array of starship resource URLs that this person has piloted |
| `url` | The hypermedia URL of this resource |
| `vehicles` | An array of vehicle resource URLs that this person has piloted |

Operations: List, Load.

API path: `/people`

#### Planet

| Field | Description |
| --- | --- |
| `climate` | The climate of this planet |
| `created` | The ISO 8601 date format of the time that this resource was created |
| `diameter` | The diameter of this planet in kilometers |
| `edited` | The ISO 8601 date format of the time that this resource was edited |
| `films` | An array of Film URL Resources that this planet has appeared in |
| `gravity` | A number denoting the gravity of this planet |
| `name` | The name of this planet |
| `orbital_period` | The number of standard days it takes for this planet to complete a single orbit of its local star |
| `population` | The average population of sentient beings inhabiting this planet |
| `residents` | An array of People URL Resources that live on this planet |
| `rotation_period` | The number of standard hours it takes for this planet to complete a single rotation on its axis |
| `surface_water` | The percentage of the planet surface that is naturally occurring water |
| `terrain` | The terrain of this planet |
| `url` | The hypermedia URL of this resource |

Operations: List, Load.

API path: `/planets`

#### Species

| Field | Description |
| --- | --- |
| `average_height` | The average height of this species in centimeters |
| `average_lifespan` | The average lifespan of this species in years |
| `classification` | The classification of this species |
| `created` | The ISO 8601 date format of the time that this resource was created |
| `designation` | The designation of this species |
| `edited` | The ISO 8601 date format of the time that this resource was edited |
| `eye_colors` | A comma-separated string of common eye colors for this species |
| `films` | An array of Film URL Resources that this species has appeared in |
| `hair_colors` | A comma-separated string of common hair colors for this species |
| `homeworld` | The URL of a planet resource that is the homeworld of this species |
| `language` | The language commonly spoken by this species |
| `name` | The name of this species |
| `people` | An array of People URL Resources that are a part of this species |
| `skin_colors` | A comma-separated string of common skin colors for this species |
| `url` | The hypermedia URL of this resource |

Operations: List, Load.

API path: `/species`

#### Starship

| Field | Description |
| --- | --- |
| `MGLT` | The Maximum number of Megalights this starship can travel in a standard hour |
| `cargo_capacity` | The maximum number of kilograms that this starship can transport |
| `consumables` | The maximum length of time that this starship can provide consumables for its entire crew without having to resupply |
| `cost_in_credits` | The cost of this starship new, in galactic credits |
| `created` | The ISO 8601 date format of the time that this resource was created |
| `crew` | The number of personnel needed to run or pilot this starship |
| `edited` | The ISO 8601 date format of the time that this resource was edited |
| `films` | An array of Film URL Resources that this starship has appeared in |
| `hyperdrive_rating` | The class of this starships hyperdrive |
| `length` | The length of this starship in meters |
| `manufacturer` | The manufacturer of this starship |
| `max_atmosphering_speed` | The maximum speed of this starship in atmosphere |
| `model` | The model or official name of this starship |
| `name` | The name of this starship |
| `passengers` | The number of non-essential people this starship can transport |
| `pilots` | An array of People URL Resources that this starship has been piloted by |
| `starship_class` | The class of this starship |
| `url` | The hypermedia URL of this resource |

Operations: List, Load.

API path: `/starships`

#### Vehicle

| Field | Description |
| --- | --- |
| `cargo_capacity` | The maximum number of kilograms that this vehicle can transport |
| `consumables` | The maximum length of time that this vehicle can provide consumables for its entire crew without having to resupply |
| `cost_in_credits` | The cost of this vehicle new, in galactic credits |
| `created` | The ISO 8601 date format of the time that this resource was created |
| `crew` | The number of personnel needed to run or pilot this vehicle |
| `edited` | The ISO 8601 date format of the time that this resource was edited |
| `films` | An array of Film URL Resources that this vehicle has appeared in |
| `length` | The length of this vehicle in meters |
| `manufacturer` | The manufacturer of this vehicle |
| `max_atmosphering_speed` | The maximum speed of this vehicle in atmosphere |
| `model` | The model or official name of this vehicle |
| `name` | The name of this vehicle |
| `passengers` | The number of non-essential people this vehicle can transport |
| `pilots` | An array of People URL Resources that this vehicle has been piloted by |
| `url` | The hypermedia URL of this resource |
| `vehicle_class` | The class of this vehicle |

Operations: List, Load.

API path: `/vehicles`



## Entities


### Film

Create an instance: `local film = client:Film(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `characters` | `table` | An array of people resource URLs that are in this film |
| `created` | `string` | The ISO 8601 date format of the time that this resource was created |
| `director` | `string` | The name of the director of this film |
| `edited` | `string` | The ISO 8601 date format of the time that this resource was edited |
| `episode_id` | `number` | The episode number of this film |
| `opening_crawl` | `string` | The opening paragraphs at the beginning of this film |
| `planets` | `table` | An array of planet resource URLs that are in this film |
| `producer` | `string` | The name(s) of the producer(s) of this film |
| `release_date` | `string` | The release date of this film |
| `species` | `table` | An array of species resource URLs that are in this film |
| `starships` | `table` | An array of starship resource URLs that are in this film |
| `title` | `string` | The title of this film |
| `url` | `string` | The hypermedia URL of this resource |
| `vehicles` | `table` | An array of vehicle resource URLs that are in this film |

#### Example: Load

```lua
local film, err = client:Film():load({ id = 1 })
```

#### Example: List

```lua
local films, err = client:Film():list()
```


### PeopleList

Create an instance: `local people_list = client:PeopleList(nil)`


### Person

Create an instance: `local person = client:Person(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `birth_year` | `string` | The birth year of the person, using the in-universe standard of BBY or ABY |
| `created` | `string` | The ISO 8601 date format of the time that this resource was created |
| `edited` | `string` | The ISO 8601 date format of the time that this resource was edited |
| `eye_color` | `string` | The eye color of this person |
| `films` | `table` | An array of film resource URLs that this person has been in |
| `gender` | `string` | The gender of this person |
| `hair_color` | `string` | The hair color of this person |
| `height` | `string` | The height of the person in centimeters |
| `homeworld` | `string` | The URL of the planet resource that this person was born on |
| `mass` | `string` | The mass of the person in kilograms |
| `name` | `string` | The name of this person |
| `skin_color` | `string` | The skin color of this person |
| `species` | `table` | An array of species resource URLs that this person belongs to |
| `starships` | `table` | An array of starship resource URLs that this person has piloted |
| `url` | `string` | The hypermedia URL of this resource |
| `vehicles` | `table` | An array of vehicle resource URLs that this person has piloted |

#### Example: Load

```lua
local person, err = client:Person():load({ id = 1 })
```

#### Example: List

```lua
local persons, err = client:Person():list()
```


### Planet

Create an instance: `local planet = client:Planet(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `climate` | `string` | The climate of this planet |
| `created` | `string` | The ISO 8601 date format of the time that this resource was created |
| `diameter` | `string` | The diameter of this planet in kilometers |
| `edited` | `string` | The ISO 8601 date format of the time that this resource was edited |
| `films` | `table` | An array of Film URL Resources that this planet has appeared in |
| `gravity` | `string` | A number denoting the gravity of this planet |
| `name` | `string` | The name of this planet |
| `orbital_period` | `string` | The number of standard days it takes for this planet to complete a single orbit of its local star |
| `population` | `string` | The average population of sentient beings inhabiting this planet |
| `residents` | `table` | An array of People URL Resources that live on this planet |
| `rotation_period` | `string` | The number of standard hours it takes for this planet to complete a single rotation on its axis |
| `surface_water` | `string` | The percentage of the planet surface that is naturally occurring water |
| `terrain` | `string` | The terrain of this planet |
| `url` | `string` | The hypermedia URL of this resource |

#### Example: Load

```lua
local planet, err = client:Planet():load({ id = 1 })
```

#### Example: List

```lua
local planets, err = client:Planet():list()
```


### Species

Create an instance: `local species = client:Species(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

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
| `films` | `table` | An array of Film URL Resources that this species has appeared in |
| `hair_colors` | `string` | A comma-separated string of common hair colors for this species |
| `homeworld` | `string` | The URL of a planet resource that is the homeworld of this species |
| `language` | `string` | The language commonly spoken by this species |
| `name` | `string` | The name of this species |
| `people` | `table` | An array of People URL Resources that are a part of this species |
| `skin_colors` | `string` | A comma-separated string of common skin colors for this species |
| `url` | `string` | The hypermedia URL of this resource |

#### Example: Load

```lua
local species, err = client:Species():load({ id = 1 })
```

#### Example: List

```lua
local speciess, err = client:Species():list()
```


### Starship

Create an instance: `local starship = client:Starship(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

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
| `films` | `table` | An array of Film URL Resources that this starship has appeared in |
| `hyperdrive_rating` | `string` | The class of this starships hyperdrive |
| `length` | `string` | The length of this starship in meters |
| `manufacturer` | `string` | The manufacturer of this starship |
| `max_atmosphering_speed` | `string` | The maximum speed of this starship in atmosphere |
| `model` | `string` | The model or official name of this starship |
| `name` | `string` | The name of this starship |
| `passengers` | `string` | The number of non-essential people this starship can transport |
| `pilots` | `table` | An array of People URL Resources that this starship has been piloted by |
| `starship_class` | `string` | The class of this starship |
| `url` | `string` | The hypermedia URL of this resource |

#### Example: Load

```lua
local starship, err = client:Starship():load({ id = 1 })
```

#### Example: List

```lua
local starships, err = client:Starship():list()
```


### Vehicle

Create an instance: `local vehicle = client:Vehicle(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cargo_capacity` | `string` | The maximum number of kilograms that this vehicle can transport |
| `consumables` | `string` | The maximum length of time that this vehicle can provide consumables for its entire crew without having to resupply |
| `cost_in_credits` | `string` | The cost of this vehicle new, in galactic credits |
| `created` | `string` | The ISO 8601 date format of the time that this resource was created |
| `crew` | `string` | The number of personnel needed to run or pilot this vehicle |
| `edited` | `string` | The ISO 8601 date format of the time that this resource was edited |
| `films` | `table` | An array of Film URL Resources that this vehicle has appeared in |
| `length` | `string` | The length of this vehicle in meters |
| `manufacturer` | `string` | The manufacturer of this vehicle |
| `max_atmosphering_speed` | `string` | The maximum speed of this vehicle in atmosphere |
| `model` | `string` | The model or official name of this vehicle |
| `name` | `string` | The name of this vehicle |
| `passengers` | `string` | The number of non-essential people this vehicle can transport |
| `pilots` | `table` | An array of People URL Resources that this vehicle has been piloted by |
| `url` | `string` | The hypermedia URL of this resource |
| `vehicle_class` | `string` | The class of this vehicle |

#### Example: Load

```lua
local vehicle, err = client:Vehicle():load({ id = 1 })
```

#### Example: List

```lua
local vehicles, err = client:Vehicle():list()
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

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── star-wars_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`star-wars_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```lua
local person = client:Person()
person:list()

-- person:data_get() now returns the person data from the last list
-- person:match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
