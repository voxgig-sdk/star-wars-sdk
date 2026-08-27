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
| `characters` | `list` | No | An array of people resource URLs that are in this film |
| `created` | `str` | No | The ISO 8601 date format of the time that this resource was created |
| `director` | `str` | No | The name of the director of this film |
| `edited` | `str` | No | The ISO 8601 date format of the time that this resource was edited |
| `episode_id` | `int` | No | The episode number of this film |
| `id` | `str` | No |  |
| `opening_crawl` | `str` | No | The opening paragraphs at the beginning of this film |
| `planets` | `list` | No | An array of planet resource URLs that are in this film |
| `producer` | `str` | No | The name(s) of the producer(s) of this film |
| `release_date` | `str` | No | The release date of this film |
| `species` | `list` | No | An array of species resource URLs that are in this film |
| `starships` | `list` | No | An array of starship resource URLs that are in this film |
| `title` | `str` | No | The title of this film |
| `url` | `str` | No | The hypermedia URL of this resource |
| `vehicles` | `list` | No | An array of vehicle resource URLs that are in this film |

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
result = client.Film().load({"id": 1})
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
| `birth_year` | `str` | No | The birth year of the person, using the in-universe standard of BBY or ABY |
| `created` | `str` | No | The ISO 8601 date format of the time that this resource was created |
| `edited` | `str` | No | The ISO 8601 date format of the time that this resource was edited |
| `eye_color` | `str` | No | The eye color of this person |
| `films` | `list` | No | An array of film resource URLs that this person has been in |
| `gender` | `str` | No | The gender of this person |
| `hair_color` | `str` | No | The hair color of this person |
| `height` | `str` | No | The height of the person in centimeters |
| `homeworld` | `str` | No | The URL of the planet resource that this person was born on |
| `id` | `str` | No |  |
| `mass` | `str` | No | The mass of the person in kilograms |
| `name` | `str` | No | The name of this person |
| `skin_color` | `str` | No | The skin color of this person |
| `species` | `list` | No | An array of species resource URLs that this person belongs to |
| `starships` | `list` | No | An array of starship resource URLs that this person has piloted |
| `url` | `str` | No | The hypermedia URL of this resource |
| `vehicles` | `list` | No | An array of vehicle resource URLs that this person has piloted |

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
result = client.Person().load({"id": 1})
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
| `climate` | `str` | No | The climate of this planet |
| `created` | `str` | No | The ISO 8601 date format of the time that this resource was created |
| `diameter` | `str` | No | The diameter of this planet in kilometers |
| `edited` | `str` | No | The ISO 8601 date format of the time that this resource was edited |
| `films` | `list` | No | An array of Film URL Resources that this planet has appeared in |
| `gravity` | `str` | No | A number denoting the gravity of this planet |
| `id` | `str` | No |  |
| `name` | `str` | No | The name of this planet |
| `orbital_period` | `str` | No | The number of standard days it takes for this planet to complete a single orbit of its local star |
| `population` | `str` | No | The average population of sentient beings inhabiting this planet |
| `residents` | `list` | No | An array of People URL Resources that live on this planet |
| `rotation_period` | `str` | No | The number of standard hours it takes for this planet to complete a single rotation on its axis |
| `surface_water` | `str` | No | The percentage of the planet surface that is naturally occurring water |
| `terrain` | `str` | No | The terrain of this planet |
| `url` | `str` | No | The hypermedia URL of this resource |

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
result = client.Planet().load({"id": 1})
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
| `average_height` | `str` | No | The average height of this species in centimeters |
| `average_lifespan` | `str` | No | The average lifespan of this species in years |
| `classification` | `str` | No | The classification of this species |
| `created` | `str` | No | The ISO 8601 date format of the time that this resource was created |
| `designation` | `str` | No | The designation of this species |
| `edited` | `str` | No | The ISO 8601 date format of the time that this resource was edited |
| `eye_colors` | `str` | No | A comma-separated string of common eye colors for this species |
| `films` | `list` | No | An array of Film URL Resources that this species has appeared in |
| `hair_colors` | `str` | No | A comma-separated string of common hair colors for this species |
| `homeworld` | `str` | No | The URL of a planet resource that is the homeworld of this species |
| `id` | `str` | No |  |
| `language` | `str` | No | The language commonly spoken by this species |
| `name` | `str` | No | The name of this species |
| `people` | `list` | No | An array of People URL Resources that are a part of this species |
| `skin_colors` | `str` | No | A comma-separated string of common skin colors for this species |
| `url` | `str` | No | The hypermedia URL of this resource |

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
result = client.Species().load({"id": 1})
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
| `MGLT` | `str` | No | The Maximum number of Megalights this starship can travel in a standard hour |
| `cargo_capacity` | `str` | No | The maximum number of kilograms that this starship can transport |
| `consumables` | `str` | No | The maximum length of time that this starship can provide consumables for its entire crew without having to resupply |
| `cost_in_credits` | `str` | No | The cost of this starship new, in galactic credits |
| `created` | `str` | No | The ISO 8601 date format of the time that this resource was created |
| `crew` | `str` | No | The number of personnel needed to run or pilot this starship |
| `edited` | `str` | No | The ISO 8601 date format of the time that this resource was edited |
| `films` | `list` | No | An array of Film URL Resources that this starship has appeared in |
| `hyperdrive_rating` | `str` | No | The class of this starships hyperdrive |
| `id` | `str` | No |  |
| `length` | `str` | No | The length of this starship in meters |
| `manufacturer` | `str` | No | The manufacturer of this starship |
| `max_atmosphering_speed` | `str` | No | The maximum speed of this starship in atmosphere |
| `model` | `str` | No | The model or official name of this starship |
| `name` | `str` | No | The name of this starship |
| `passengers` | `str` | No | The number of non-essential people this starship can transport |
| `pilots` | `list` | No | An array of People URL Resources that this starship has been piloted by |
| `starship_class` | `str` | No | The class of this starship |
| `url` | `str` | No | The hypermedia URL of this resource |

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
result = client.Starship().load({"id": 1})
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
| `cargo_capacity` | `str` | No | The maximum number of kilograms that this vehicle can transport |
| `consumables` | `str` | No | The maximum length of time that this vehicle can provide consumables for its entire crew without having to resupply |
| `cost_in_credits` | `str` | No | The cost of this vehicle new, in galactic credits |
| `created` | `str` | No | The ISO 8601 date format of the time that this resource was created |
| `crew` | `str` | No | The number of personnel needed to run or pilot this vehicle |
| `edited` | `str` | No | The ISO 8601 date format of the time that this resource was edited |
| `films` | `list` | No | An array of Film URL Resources that this vehicle has appeared in |
| `id` | `str` | No |  |
| `length` | `str` | No | The length of this vehicle in meters |
| `manufacturer` | `str` | No | The manufacturer of this vehicle |
| `max_atmosphering_speed` | `str` | No | The maximum speed of this vehicle in atmosphere |
| `model` | `str` | No | The model or official name of this vehicle |
| `name` | `str` | No | The name of this vehicle |
| `passengers` | `str` | No | The number of non-essential people this vehicle can transport |
| `pilots` | `list` | No | An array of People URL Resources that this vehicle has been piloted by |
| `url` | `str` | No | The hypermedia URL of this resource |
| `vehicle_class` | `str` | No | The class of this vehicle |

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
result = client.Vehicle().load({"id": 1})
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

