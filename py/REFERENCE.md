# StarWars Python SDK Reference

Complete API reference for the StarWars Python SDK.


## StarWarsSDK

### Constructor

```python
from starwars_sdk import StarWarsSDK

client = StarWarsSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `StarWarsSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = StarWarsSDK.test()
```


### Instance Methods

#### `Film(data=None)`

Create a new `FilmEntity` instance. Pass `None` for no initial data.

#### `PeopleList(data=None)`

Create a new `PeopleListEntity` instance. Pass `None` for no initial data.

#### `Person(data=None)`

Create a new `PersonEntity` instance. Pass `None` for no initial data.

#### `Planet(data=None)`

Create a new `PlanetEntity` instance. Pass `None` for no initial data.

#### `Species(data=None)`

Create a new `SpeciesEntity` instance. Pass `None` for no initial data.

#### `Starship(data=None)`

Create a new `StarshipEntity` instance. Pass `None` for no initial data.

#### `Vehicle(data=None)`

Create a new `VehicleEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## FilmEntity

```python
film = client.Film()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `character` | `list` | No |  |
| `created` | `str` | No |  |
| `director` | `str` | No |  |
| `edited` | `str` | No |  |
| `episode_id` | `int` | No |  |
| `opening_crawl` | `str` | No |  |
| `planet` | `list` | No |  |
| `producer` | `str` | No |  |
| `release_date` | `str` | No |  |
| `species` | `list` | No |  |
| `starship` | `list` | No |  |
| `title` | `str` | No |  |
| `url` | `str` | No |  |
| `vehicle` | `list` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Film().list()
for film in results:
    print(film)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Film().load({"id": "film_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FilmEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PeopleListEntity

```python
people_list = client.PeopleList()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PeopleListEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PersonEntity

```python
person = client.Person()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `birth_year` | `str` | No |  |
| `created` | `str` | No |  |
| `edited` | `str` | No |  |
| `eye_color` | `str` | No |  |
| `film` | `list` | No |  |
| `gender` | `str` | No |  |
| `hair_color` | `str` | No |  |
| `height` | `str` | No |  |
| `homeworld` | `str` | No |  |
| `mass` | `str` | No |  |
| `name` | `str` | No |  |
| `skin_color` | `str` | No |  |
| `species` | `list` | No |  |
| `starship` | `list` | No |  |
| `url` | `str` | No |  |
| `vehicle` | `list` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Person().list()
for person in results:
    print(person)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Person().load({"id": "person_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PersonEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PlanetEntity

```python
planet = client.Planet()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `climate` | `str` | No |  |
| `created` | `str` | No |  |
| `diameter` | `str` | No |  |
| `edited` | `str` | No |  |
| `film` | `list` | No |  |
| `gravity` | `str` | No |  |
| `name` | `str` | No |  |
| `orbital_period` | `str` | No |  |
| `population` | `str` | No |  |
| `resident` | `list` | No |  |
| `rotation_period` | `str` | No |  |
| `surface_water` | `str` | No |  |
| `terrain` | `str` | No |  |
| `url` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Planet().list()
for planet in results:
    print(planet)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Planet().load({"id": "planet_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PlanetEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SpeciesEntity

```python
species = client.Species()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `average_height` | `str` | No |  |
| `average_lifespan` | `str` | No |  |
| `classification` | `str` | No |  |
| `created` | `str` | No |  |
| `designation` | `str` | No |  |
| `edited` | `str` | No |  |
| `eye_color` | `str` | No |  |
| `film` | `list` | No |  |
| `hair_color` | `str` | No |  |
| `homeworld` | `str` | No |  |
| `language` | `str` | No |  |
| `name` | `str` | No |  |
| `person` | `list` | No |  |
| `skin_color` | `str` | No |  |
| `url` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Species().list()
for species in results:
    print(species)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Species().load({"id": "species_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SpeciesEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## StarshipEntity

```python
starship = client.Starship()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cargo_capacity` | `str` | No |  |
| `consumable` | `str` | No |  |
| `cost_in_credit` | `str` | No |  |
| `created` | `str` | No |  |
| `crew` | `str` | No |  |
| `edited` | `str` | No |  |
| `film` | `list` | No |  |
| `hyperdrive_rating` | `str` | No |  |
| `length` | `str` | No |  |
| `manufacturer` | `str` | No |  |
| `max_atmosphering_speed` | `str` | No |  |
| `mglt` | `str` | No |  |
| `model` | `str` | No |  |
| `name` | `str` | No |  |
| `passenger` | `str` | No |  |
| `pilot` | `list` | No |  |
| `starship_class` | `str` | No |  |
| `url` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Starship().list()
for starship in results:
    print(starship)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Starship().load({"id": "starship_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `StarshipEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VehicleEntity

```python
vehicle = client.Vehicle()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cargo_capacity` | `str` | No |  |
| `consumable` | `str` | No |  |
| `cost_in_credit` | `str` | No |  |
| `created` | `str` | No |  |
| `crew` | `str` | No |  |
| `edited` | `str` | No |  |
| `film` | `list` | No |  |
| `length` | `str` | No |  |
| `manufacturer` | `str` | No |  |
| `max_atmosphering_speed` | `str` | No |  |
| `model` | `str` | No |  |
| `name` | `str` | No |  |
| `passenger` | `str` | No |  |
| `pilot` | `list` | No |  |
| `url` | `str` | No |  |
| `vehicle_class` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Vehicle().list()
for vehicle in results:
    print(vehicle)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Vehicle().load({"id": "vehicle_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VehicleEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = StarWarsSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

