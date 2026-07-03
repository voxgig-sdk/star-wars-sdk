# StarWars Python SDK



The Python SDK for the StarWars API — an entity-oriented client following Pythonic conventions.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
pip install star-wars-sdk
```

Or install from source:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
import os
from starwars_sdk import StarWarsSDK

client = StarWarsSDK({
    "apikey": os.environ.get("STAR-WARS_APIKEY"),
})
```

### 2. List films

```python
result, err = client.Film().list()
if err:
    raise Exception(err)

if isinstance(result, list):
    for item in result:
        d = item.data_get()
        print(d["id"], d["name"])
```

### 3. Load a film

```python
result, err = client.Film().load({"id": "example_id"})
if err:
    raise Exception(err)
print(result)
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
if err:
    raise Exception(err)

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
```

### Prepare a request without sending it

```python
fetchdef, err = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})
if err:
    raise Exception(err)

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = StarWarsSDK.test()

result, err = client.StarWars().load({"id": "test01"})
# result contains mock response data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = StarWarsSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### StarWarsSDK

```python
from starwars_sdk import StarWarsSDK

client = StarWarsSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = StarWarsSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### StarWarsSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> (dict, err)` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> (dict, err)` | Build and send an HTTP request. |
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
| `load` | `(reqmatch, ctrl) -> (any, err)` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> (any, err)` | List entities matching the criteria. |
| `create` | `(reqdata, ctrl) -> (any, err)` | Create a new entity. |
| `update` | `(reqdata, ctrl) -> (any, err)` | Update an existing entity. |
| `remove` | `(reqmatch, ctrl) -> (any, err)` | Remove an entity. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return `(any, err)`. The first value is a
`dict` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

### Entities

#### Film

| Field | Description |
| --- | --- |
| `character` |  |
| `created` |  |
| `director` |  |
| `edited` |  |
| `episode_id` |  |
| `opening_crawl` |  |
| `planet` |  |
| `producer` |  |
| `release_date` |  |
| `species` |  |
| `starship` |  |
| `title` |  |
| `url` |  |
| `vehicle` |  |

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
| `birth_year` |  |
| `created` |  |
| `edited` |  |
| `eye_color` |  |
| `film` |  |
| `gender` |  |
| `hair_color` |  |
| `height` |  |
| `homeworld` |  |
| `mass` |  |
| `name` |  |
| `skin_color` |  |
| `species` |  |
| `starship` |  |
| `url` |  |
| `vehicle` |  |

Operations: List, Load.

API path: `/people`

#### Planet

| Field | Description |
| --- | --- |
| `climate` |  |
| `created` |  |
| `diameter` |  |
| `edited` |  |
| `film` |  |
| `gravity` |  |
| `name` |  |
| `orbital_period` |  |
| `population` |  |
| `resident` |  |
| `rotation_period` |  |
| `surface_water` |  |
| `terrain` |  |
| `url` |  |

Operations: List, Load.

API path: `/planets`

#### Species

| Field | Description |
| --- | --- |
| `average_height` |  |
| `average_lifespan` |  |
| `classification` |  |
| `created` |  |
| `designation` |  |
| `edited` |  |
| `eye_color` |  |
| `film` |  |
| `hair_color` |  |
| `homeworld` |  |
| `language` |  |
| `name` |  |
| `person` |  |
| `skin_color` |  |
| `url` |  |

Operations: List, Load.

API path: `/species`

#### Starship

| Field | Description |
| --- | --- |
| `cargo_capacity` |  |
| `consumable` |  |
| `cost_in_credit` |  |
| `created` |  |
| `crew` |  |
| `edited` |  |
| `film` |  |
| `hyperdrive_rating` |  |
| `length` |  |
| `manufacturer` |  |
| `max_atmosphering_speed` |  |
| `mglt` |  |
| `model` |  |
| `name` |  |
| `passenger` |  |
| `pilot` |  |
| `starship_class` |  |
| `url` |  |

Operations: List, Load.

API path: `/starships`

#### Vehicle

| Field | Description |
| --- | --- |
| `cargo_capacity` |  |
| `consumable` |  |
| `cost_in_credit` |  |
| `created` |  |
| `crew` |  |
| `edited` |  |
| `film` |  |
| `length` |  |
| `manufacturer` |  |
| `max_atmosphering_speed` |  |
| `model` |  |
| `name` |  |
| `passenger` |  |
| `pilot` |  |
| `url` |  |
| `vehicle_class` |  |

Operations: List, Load.

API path: `/vehicles`



## Entities


### Film

Create an instance: `const film = client.Film()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

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

```ts
const film = await client.Film().load({ id: 'film_id' })
```

#### Example: List

```ts
const films = await client.Film().list()
```


### PeopleList

Create an instance: `const people_list = client.PeopleList()`


### Person

Create an instance: `const person = client.Person()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

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

```ts
const person = await client.Person().load({ id: 'person_id' })
```

#### Example: List

```ts
const persons = await client.Person().list()
```


### Planet

Create an instance: `const planet = client.Planet()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

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

```ts
const planet = await client.Planet().load({ id: 'planet_id' })
```

#### Example: List

```ts
const planets = await client.Planet().list()
```


### Species

Create an instance: `const species = client.Species()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

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

```ts
const species = await client.Species().load({ id: 'species_id' })
```

#### Example: List

```ts
const speciess = await client.Species().list()
```


### Starship

Create an instance: `const starship = client.Starship()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

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

```ts
const starship = await client.Starship().load({ id: 'starship_id' })
```

#### Example: List

```ts
const starships = await client.Starship().list()
```


### Vehicle

Create an instance: `const vehicle = client.Vehicle()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

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

```ts
const vehicle = await client.Vehicle().load({ id: 'vehicle_id' })
```

#### Example: List

```ts
const vehicles = await client.Vehicle().list()
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
error is returned to the caller as the second element in the return tuple.

### Features and hooks

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── starwars_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`starwars_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```python
moon = client.Moon()
moon.load({"planet_id": "earth", "id": "luna"})

# moon.data_get() now returns the loaded moon data
# moon.match_get() returns the last match criteria
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
