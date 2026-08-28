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

`load()` returns the ENTITY — call data_get() for the record — and raises on error.

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
    persons = client.Person().list()
    print(persons)
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

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
person = client.Person().list()
# person contains the mock response record
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

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
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
| `characters` | An array of people resource URLs that are in this film |
| `created` | The ISO 8601 date format of the time that this resource was created |
| `director` | The name of the director of this film |
| `edited` | The ISO 8601 date format of the time that this resource was edited |
| `episode_id` | The episode number of this film |
| `id` |  |
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
| `id` |  |
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
| `id` |  |
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
| `id` |  |
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
| `id` |  |
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
| `id` |  |
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

Create an instance: `film = client.Film()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `characters` | `list` | An array of people resource URLs that are in this film |
| `created` | `str` | The ISO 8601 date format of the time that this resource was created |
| `director` | `str` | The name of the director of this film |
| `edited` | `str` | The ISO 8601 date format of the time that this resource was edited |
| `episode_id` | `int` | The episode number of this film |
| `id` | `str` |  |
| `opening_crawl` | `str` | The opening paragraphs at the beginning of this film |
| `planets` | `list` | An array of planet resource URLs that are in this film |
| `producer` | `str` | The name(s) of the producer(s) of this film |
| `release_date` | `str` | The release date of this film |
| `species` | `list` | An array of species resource URLs that are in this film |
| `starships` | `list` | An array of starship resource URLs that are in this film |
| `title` | `str` | The title of this film |
| `url` | `str` | The hypermedia URL of this resource |
| `vehicles` | `list` | An array of vehicle resource URLs that are in this film |

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
| `birth_year` | `str` | The birth year of the person, using the in-universe standard of BBY or ABY |
| `created` | `str` | The ISO 8601 date format of the time that this resource was created |
| `edited` | `str` | The ISO 8601 date format of the time that this resource was edited |
| `eye_color` | `str` | The eye color of this person |
| `films` | `list` | An array of film resource URLs that this person has been in |
| `gender` | `str` | The gender of this person |
| `hair_color` | `str` | The hair color of this person |
| `height` | `str` | The height of the person in centimeters |
| `homeworld` | `str` | The URL of the planet resource that this person was born on |
| `id` | `str` |  |
| `mass` | `str` | The mass of the person in kilograms |
| `name` | `str` | The name of this person |
| `skin_color` | `str` | The skin color of this person |
| `species` | `list` | An array of species resource URLs that this person belongs to |
| `starships` | `list` | An array of starship resource URLs that this person has piloted |
| `url` | `str` | The hypermedia URL of this resource |
| `vehicles` | `list` | An array of vehicle resource URLs that this person has piloted |

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
| `climate` | `str` | The climate of this planet |
| `created` | `str` | The ISO 8601 date format of the time that this resource was created |
| `diameter` | `str` | The diameter of this planet in kilometers |
| `edited` | `str` | The ISO 8601 date format of the time that this resource was edited |
| `films` | `list` | An array of Film URL Resources that this planet has appeared in |
| `gravity` | `str` | A number denoting the gravity of this planet |
| `id` | `str` |  |
| `name` | `str` | The name of this planet |
| `orbital_period` | `str` | The number of standard days it takes for this planet to complete a single orbit of its local star |
| `population` | `str` | The average population of sentient beings inhabiting this planet |
| `residents` | `list` | An array of People URL Resources that live on this planet |
| `rotation_period` | `str` | The number of standard hours it takes for this planet to complete a single rotation on its axis |
| `surface_water` | `str` | The percentage of the planet surface that is naturally occurring water |
| `terrain` | `str` | The terrain of this planet |
| `url` | `str` | The hypermedia URL of this resource |

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
| `average_height` | `str` | The average height of this species in centimeters |
| `average_lifespan` | `str` | The average lifespan of this species in years |
| `classification` | `str` | The classification of this species |
| `created` | `str` | The ISO 8601 date format of the time that this resource was created |
| `designation` | `str` | The designation of this species |
| `edited` | `str` | The ISO 8601 date format of the time that this resource was edited |
| `eye_colors` | `str` | A comma-separated string of common eye colors for this species |
| `films` | `list` | An array of Film URL Resources that this species has appeared in |
| `hair_colors` | `str` | A comma-separated string of common hair colors for this species |
| `homeworld` | `str` | The URL of a planet resource that is the homeworld of this species |
| `id` | `str` |  |
| `language` | `str` | The language commonly spoken by this species |
| `name` | `str` | The name of this species |
| `people` | `list` | An array of People URL Resources that are a part of this species |
| `skin_colors` | `str` | A comma-separated string of common skin colors for this species |
| `url` | `str` | The hypermedia URL of this resource |

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
| `MGLT` | `str` | The Maximum number of Megalights this starship can travel in a standard hour |
| `cargo_capacity` | `str` | The maximum number of kilograms that this starship can transport |
| `consumables` | `str` | The maximum length of time that this starship can provide consumables for its entire crew without having to resupply |
| `cost_in_credits` | `str` | The cost of this starship new, in galactic credits |
| `created` | `str` | The ISO 8601 date format of the time that this resource was created |
| `crew` | `str` | The number of personnel needed to run or pilot this starship |
| `edited` | `str` | The ISO 8601 date format of the time that this resource was edited |
| `films` | `list` | An array of Film URL Resources that this starship has appeared in |
| `hyperdrive_rating` | `str` | The class of this starships hyperdrive |
| `id` | `str` |  |
| `length` | `str` | The length of this starship in meters |
| `manufacturer` | `str` | The manufacturer of this starship |
| `max_atmosphering_speed` | `str` | The maximum speed of this starship in atmosphere |
| `model` | `str` | The model or official name of this starship |
| `name` | `str` | The name of this starship |
| `passengers` | `str` | The number of non-essential people this starship can transport |
| `pilots` | `list` | An array of People URL Resources that this starship has been piloted by |
| `starship_class` | `str` | The class of this starship |
| `url` | `str` | The hypermedia URL of this resource |

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
| `cargo_capacity` | `str` | The maximum number of kilograms that this vehicle can transport |
| `consumables` | `str` | The maximum length of time that this vehicle can provide consumables for its entire crew without having to resupply |
| `cost_in_credits` | `str` | The cost of this vehicle new, in galactic credits |
| `created` | `str` | The ISO 8601 date format of the time that this resource was created |
| `crew` | `str` | The number of personnel needed to run or pilot this vehicle |
| `edited` | `str` | The ISO 8601 date format of the time that this resource was edited |
| `films` | `list` | An array of Film URL Resources that this vehicle has appeared in |
| `id` | `str` |  |
| `length` | `str` | The length of this vehicle in meters |
| `manufacturer` | `str` | The manufacturer of this vehicle |
| `max_atmosphering_speed` | `str` | The maximum speed of this vehicle in atmosphere |
| `model` | `str` | The model or official name of this vehicle |
| `name` | `str` | The name of this vehicle |
| `passengers` | `str` | The number of non-essential people this vehicle can transport |
| `pilots` | `list` | An array of People URL Resources that this vehicle has been piloted by |
| `url` | `str` | The hypermedia URL of this resource |
| `vehicle_class` | `str` | The class of this vehicle |

#### Example: Load

```python
vehicle = client.Vehicle().load({"id": 1})
```

#### Example: List

```python
vehicles = client.Vehicle().list()
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | In-memory mock transport for testing without a live server |

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


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
person = client.Person()
person.list()

# person.data_get() now returns the person data from the last list
# person.match_get() returns the last match criteria
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
