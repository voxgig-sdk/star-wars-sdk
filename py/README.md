# StarWars Python SDK



The Python SDK for the StarWars API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Film()` — each
carrying a small, uniform set of operations (`list`, `load`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/star-wars-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
from starwars_sdk import StarWarsSDK

client = StarWarsSDK()
```

### 2. List film records

`list()` returns a `list` of records (each a `dict`) and raises on
error — iterate it directly.

```python
try:
    films = client.Film().list()
    for film in films:
        print(film)
except Exception as err:
    print(f"list failed: {err}")
```

### 3. Load a film

`load()` returns the bare record (a `dict`) and raises on error.

```python
try:
    film = client.Film().load({"id": 1})
    print(film)
except Exception as err:
    print(f"load failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    films = client.Film().list()
    print(films)
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = StarWarsSDK.test()

# Entity ops return the bare record and raise on error.
film = client.Film().list()
# film contains the mock response record
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
STAR_WARS_TEST_LIVE=TRUE
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
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
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
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the bare result data (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

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

Create an instance: `film = client.Film()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `character` | `list` |  |
| `created` | `str` |  |
| `director` | `str` |  |
| `edited` | `str` |  |
| `episode_id` | `int` |  |
| `opening_crawl` | `str` |  |
| `planet` | `list` |  |
| `producer` | `str` |  |
| `release_date` | `str` |  |
| `species` | `list` |  |
| `starship` | `list` |  |
| `title` | `str` |  |
| `url` | `str` |  |
| `vehicle` | `list` |  |

#### Example: Load

```python
film = client.Film().load({"id": 1})
```

#### Example: List

```python
films = client.Film().list()
```


### PeopleList

Create an instance: `people_list = client.PeopleList()`


### Person

Create an instance: `person = client.Person()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `birth_year` | `str` |  |
| `created` | `str` |  |
| `edited` | `str` |  |
| `eye_color` | `str` |  |
| `film` | `list` |  |
| `gender` | `str` |  |
| `hair_color` | `str` |  |
| `height` | `str` |  |
| `homeworld` | `str` |  |
| `mass` | `str` |  |
| `name` | `str` |  |
| `skin_color` | `str` |  |
| `species` | `list` |  |
| `starship` | `list` |  |
| `url` | `str` |  |
| `vehicle` | `list` |  |

#### Example: Load

```python
person = client.Person().load({"id": 1})
```

#### Example: List

```python
persons = client.Person().list()
```


### Planet

Create an instance: `planet = client.Planet()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `climate` | `str` |  |
| `created` | `str` |  |
| `diameter` | `str` |  |
| `edited` | `str` |  |
| `film` | `list` |  |
| `gravity` | `str` |  |
| `name` | `str` |  |
| `orbital_period` | `str` |  |
| `population` | `str` |  |
| `resident` | `list` |  |
| `rotation_period` | `str` |  |
| `surface_water` | `str` |  |
| `terrain` | `str` |  |
| `url` | `str` |  |

#### Example: Load

```python
planet = client.Planet().load({"id": 1})
```

#### Example: List

```python
planets = client.Planet().list()
```


### Species

Create an instance: `species = client.Species()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `average_height` | `str` |  |
| `average_lifespan` | `str` |  |
| `classification` | `str` |  |
| `created` | `str` |  |
| `designation` | `str` |  |
| `edited` | `str` |  |
| `eye_color` | `str` |  |
| `film` | `list` |  |
| `hair_color` | `str` |  |
| `homeworld` | `str` |  |
| `language` | `str` |  |
| `name` | `str` |  |
| `person` | `list` |  |
| `skin_color` | `str` |  |
| `url` | `str` |  |

#### Example: Load

```python
species = client.Species().load({"id": 1})
```

#### Example: List

```python
speciess = client.Species().list()
```


### Starship

Create an instance: `starship = client.Starship()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cargo_capacity` | `str` |  |
| `consumable` | `str` |  |
| `cost_in_credit` | `str` |  |
| `created` | `str` |  |
| `crew` | `str` |  |
| `edited` | `str` |  |
| `film` | `list` |  |
| `hyperdrive_rating` | `str` |  |
| `length` | `str` |  |
| `manufacturer` | `str` |  |
| `max_atmosphering_speed` | `str` |  |
| `mglt` | `str` |  |
| `model` | `str` |  |
| `name` | `str` |  |
| `passenger` | `str` |  |
| `pilot` | `list` |  |
| `starship_class` | `str` |  |
| `url` | `str` |  |

#### Example: Load

```python
starship = client.Starship().load({"id": 1})
```

#### Example: List

```python
starships = client.Starship().list()
```


### Vehicle

Create an instance: `vehicle = client.Vehicle()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cargo_capacity` | `str` |  |
| `consumable` | `str` |  |
| `cost_in_credit` | `str` |  |
| `created` | `str` |  |
| `crew` | `str` |  |
| `edited` | `str` |  |
| `film` | `list` |  |
| `length` | `str` |  |
| `manufacturer` | `str` |  |
| `max_atmosphering_speed` | `str` |  |
| `model` | `str` |  |
| `name` | `str` |  |
| `passenger` | `str` |  |
| `pilot` | `list` |  |
| `url` | `str` |  |
| `vehicle_class` | `str` |  |

#### Example: Load

```python
vehicle = client.Vehicle().load({"id": 1})
```

#### Example: List

```python
vehicles = client.Vehicle().list()
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

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
film = client.Film()
film.list()

# film.data_get() now returns the film data from the last list
# film.match_get() returns the last match criteria
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
