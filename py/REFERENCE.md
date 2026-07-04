# StarWars Python SDK Reference

Complete API reference for the StarWars Python SDK.


## StarWarsSDK

### Constructor

```python
from star-wars_sdk import StarWarsSDK

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
| `character` | ``$ARRAY`` | No |  |
| `created` | ``$STRING`` | No |  |
| `director` | ``$STRING`` | No |  |
| `edited` | ``$STRING`` | No |  |
| `episode_id` | ``$INTEGER`` | No |  |
| `opening_crawl` | ``$STRING`` | No |  |
| `planet` | ``$ARRAY`` | No |  |
| `producer` | ``$STRING`` | No |  |
| `release_date` | ``$STRING`` | No |  |
| `species` | ``$ARRAY`` | No |  |
| `starship` | ``$ARRAY`` | No |  |
| `title` | ``$STRING`` | No |  |
| `url` | ``$STRING`` | No |  |
| `vehicle` | ``$ARRAY`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.Film().list({})
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
| `birth_year` | ``$STRING`` | No |  |
| `created` | ``$STRING`` | No |  |
| `edited` | ``$STRING`` | No |  |
| `eye_color` | ``$STRING`` | No |  |
| `film` | ``$ARRAY`` | No |  |
| `gender` | ``$STRING`` | No |  |
| `hair_color` | ``$STRING`` | No |  |
| `height` | ``$STRING`` | No |  |
| `homeworld` | ``$STRING`` | No |  |
| `mass` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `skin_color` | ``$STRING`` | No |  |
| `species` | ``$ARRAY`` | No |  |
| `starship` | ``$ARRAY`` | No |  |
| `url` | ``$STRING`` | No |  |
| `vehicle` | ``$ARRAY`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.Person().list({})
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
| `climate` | ``$STRING`` | No |  |
| `created` | ``$STRING`` | No |  |
| `diameter` | ``$STRING`` | No |  |
| `edited` | ``$STRING`` | No |  |
| `film` | ``$ARRAY`` | No |  |
| `gravity` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `orbital_period` | ``$STRING`` | No |  |
| `population` | ``$STRING`` | No |  |
| `resident` | ``$ARRAY`` | No |  |
| `rotation_period` | ``$STRING`` | No |  |
| `surface_water` | ``$STRING`` | No |  |
| `terrain` | ``$STRING`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.Planet().list({})
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
| `average_height` | ``$STRING`` | No |  |
| `average_lifespan` | ``$STRING`` | No |  |
| `classification` | ``$STRING`` | No |  |
| `created` | ``$STRING`` | No |  |
| `designation` | ``$STRING`` | No |  |
| `edited` | ``$STRING`` | No |  |
| `eye_color` | ``$STRING`` | No |  |
| `film` | ``$ARRAY`` | No |  |
| `hair_color` | ``$STRING`` | No |  |
| `homeworld` | ``$STRING`` | No |  |
| `language` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `person` | ``$ARRAY`` | No |  |
| `skin_color` | ``$STRING`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.Species().list({})
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
| `cargo_capacity` | ``$STRING`` | No |  |
| `consumable` | ``$STRING`` | No |  |
| `cost_in_credit` | ``$STRING`` | No |  |
| `created` | ``$STRING`` | No |  |
| `crew` | ``$STRING`` | No |  |
| `edited` | ``$STRING`` | No |  |
| `film` | ``$ARRAY`` | No |  |
| `hyperdrive_rating` | ``$STRING`` | No |  |
| `length` | ``$STRING`` | No |  |
| `manufacturer` | ``$STRING`` | No |  |
| `max_atmosphering_speed` | ``$STRING`` | No |  |
| `mglt` | ``$STRING`` | No |  |
| `model` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `passenger` | ``$STRING`` | No |  |
| `pilot` | ``$ARRAY`` | No |  |
| `starship_class` | ``$STRING`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.Starship().list({})
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
| `cargo_capacity` | ``$STRING`` | No |  |
| `consumable` | ``$STRING`` | No |  |
| `cost_in_credit` | ``$STRING`` | No |  |
| `created` | ``$STRING`` | No |  |
| `crew` | ``$STRING`` | No |  |
| `edited` | ``$STRING`` | No |  |
| `film` | ``$ARRAY`` | No |  |
| `length` | ``$STRING`` | No |  |
| `manufacturer` | ``$STRING`` | No |  |
| `max_atmosphering_speed` | ``$STRING`` | No |  |
| `model` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `passenger` | ``$STRING`` | No |  |
| `pilot` | ``$ARRAY`` | No |  |
| `url` | ``$STRING`` | No |  |
| `vehicle_class` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.Vehicle().list({})
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

