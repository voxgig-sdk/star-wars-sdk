# StarWars TypeScript SDK Reference

Complete API reference for the StarWars TypeScript SDK.


## StarWarsSDK

### Constructor

```ts
new StarWarsSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `StarWarsSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = StarWarsSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `StarWarsSDK` instance in test mode.


### Instance Methods

#### `Film(data?: object)`

Create a new `Film` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `FilmEntity` instance.

#### `PeopleList(data?: object)`

Create a new `PeopleList` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PeopleListEntity` instance.

#### `Person(data?: object)`

Create a new `Person` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PersonEntity` instance.

#### `Planet(data?: object)`

Create a new `Planet` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PlanetEntity` instance.

#### `Species(data?: object)`

Create a new `Species` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SpeciesEntity` instance.

#### `Starship(data?: object)`

Create a new `Starship` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `StarshipEntity` instance.

#### `Vehicle(data?: object)`

Create a new `Vehicle` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VehicleEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `StarWarsSDK.test()`.

**Returns:** `StarWarsSDK` instance in test mode.


---

## FilmEntity

```ts
const film = client.Film()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `characters` | `any[]` | No | An array of people resource URLs that are in this film |
| `created` | `string` | No | The ISO 8601 date format of the time that this resource was created |
| `director` | `string` | No | The name of the director of this film |
| `edited` | `string` | No | The ISO 8601 date format of the time that this resource was edited |
| `episode_id` | `number` | No | The episode number of this film |
| `id` | `string` | No |  |
| `opening_crawl` | `string` | No | The opening paragraphs at the beginning of this film |
| `planets` | `any[]` | No | An array of planet resource URLs that are in this film |
| `producer` | `string` | No | The name(s) of the producer(s) of this film |
| `release_date` | `string` | No | The release date of this film |
| `species` | `any[]` | No | An array of species resource URLs that are in this film |
| `starships` | `any[]` | No | An array of starship resource URLs that are in this film |
| `title` | `string` | No | The title of this film |
| `url` | `string` | No | The hypermedia URL of this resource |
| `vehicles` | `any[]` | No | An array of vehicle resource URLs that are in this film |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Film().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Film().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `FilmEntity` instance with the same client and
options.

#### `client()`

Return the parent `StarWarsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PeopleListEntity

```ts
const people_list = client.PeopleList()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PeopleListEntity` instance with the same client and
options.

#### `client()`

Return the parent `StarWarsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PersonEntity

```ts
const person = client.Person()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `birth_year` | `string` | No | The birth year of the person, using the in-universe standard of BBY or ABY |
| `created` | `string` | No | The ISO 8601 date format of the time that this resource was created |
| `edited` | `string` | No | The ISO 8601 date format of the time that this resource was edited |
| `eye_color` | `string` | No | The eye color of this person |
| `films` | `any[]` | No | An array of film resource URLs that this person has been in |
| `gender` | `string` | No | The gender of this person |
| `hair_color` | `string` | No | The hair color of this person |
| `height` | `string` | No | The height of the person in centimeters |
| `homeworld` | `string` | No | The URL of the planet resource that this person was born on |
| `id` | `string` | No |  |
| `mass` | `string` | No | The mass of the person in kilograms |
| `name` | `string` | No | The name of this person |
| `skin_color` | `string` | No | The skin color of this person |
| `species` | `any[]` | No | An array of species resource URLs that this person belongs to |
| `starships` | `any[]` | No | An array of starship resource URLs that this person has piloted |
| `url` | `string` | No | The hypermedia URL of this resource |
| `vehicles` | `any[]` | No | An array of vehicle resource URLs that this person has piloted |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Person().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Person().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PersonEntity` instance with the same client and
options.

#### `client()`

Return the parent `StarWarsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PlanetEntity

```ts
const planet = client.Planet()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `climate` | `string` | No | The climate of this planet |
| `created` | `string` | No | The ISO 8601 date format of the time that this resource was created |
| `diameter` | `string` | No | The diameter of this planet in kilometers |
| `edited` | `string` | No | The ISO 8601 date format of the time that this resource was edited |
| `films` | `any[]` | No | An array of Film URL Resources that this planet has appeared in |
| `gravity` | `string` | No | A number denoting the gravity of this planet |
| `id` | `string` | No |  |
| `name` | `string` | No | The name of this planet |
| `orbital_period` | `string` | No | The number of standard days it takes for this planet to complete a single orbit of its local star |
| `population` | `string` | No | The average population of sentient beings inhabiting this planet |
| `residents` | `any[]` | No | An array of People URL Resources that live on this planet |
| `rotation_period` | `string` | No | The number of standard hours it takes for this planet to complete a single rotation on its axis |
| `surface_water` | `string` | No | The percentage of the planet surface that is naturally occurring water |
| `terrain` | `string` | No | The terrain of this planet |
| `url` | `string` | No | The hypermedia URL of this resource |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Planet().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Planet().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PlanetEntity` instance with the same client and
options.

#### `client()`

Return the parent `StarWarsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SpeciesEntity

```ts
const species = client.Species()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `average_height` | `string` | No | The average height of this species in centimeters |
| `average_lifespan` | `string` | No | The average lifespan of this species in years |
| `classification` | `string` | No | The classification of this species |
| `created` | `string` | No | The ISO 8601 date format of the time that this resource was created |
| `designation` | `string` | No | The designation of this species |
| `edited` | `string` | No | The ISO 8601 date format of the time that this resource was edited |
| `eye_colors` | `string` | No | A comma-separated string of common eye colors for this species |
| `films` | `any[]` | No | An array of Film URL Resources that this species has appeared in |
| `hair_colors` | `string` | No | A comma-separated string of common hair colors for this species |
| `homeworld` | `string` | No | The URL of a planet resource that is the homeworld of this species |
| `id` | `string` | No |  |
| `language` | `string` | No | The language commonly spoken by this species |
| `name` | `string` | No | The name of this species |
| `people` | `any[]` | No | An array of People URL Resources that are a part of this species |
| `skin_colors` | `string` | No | A comma-separated string of common skin colors for this species |
| `url` | `string` | No | The hypermedia URL of this resource |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Species().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Species().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SpeciesEntity` instance with the same client and
options.

#### `client()`

Return the parent `StarWarsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## StarshipEntity

```ts
const starship = client.Starship()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `MGLT` | `string` | No | The Maximum number of Megalights this starship can travel in a standard hour |
| `cargo_capacity` | `string` | No | The maximum number of kilograms that this starship can transport |
| `consumables` | `string` | No | The maximum length of time that this starship can provide consumables for its entire crew without having to resupply |
| `cost_in_credits` | `string` | No | The cost of this starship new, in galactic credits |
| `created` | `string` | No | The ISO 8601 date format of the time that this resource was created |
| `crew` | `string` | No | The number of personnel needed to run or pilot this starship |
| `edited` | `string` | No | The ISO 8601 date format of the time that this resource was edited |
| `films` | `any[]` | No | An array of Film URL Resources that this starship has appeared in |
| `hyperdrive_rating` | `string` | No | The class of this starships hyperdrive |
| `id` | `string` | No |  |
| `length` | `string` | No | The length of this starship in meters |
| `manufacturer` | `string` | No | The manufacturer of this starship |
| `max_atmosphering_speed` | `string` | No | The maximum speed of this starship in atmosphere |
| `model` | `string` | No | The model or official name of this starship |
| `name` | `string` | No | The name of this starship |
| `passengers` | `string` | No | The number of non-essential people this starship can transport |
| `pilots` | `any[]` | No | An array of People URL Resources that this starship has been piloted by |
| `starship_class` | `string` | No | The class of this starship |
| `url` | `string` | No | The hypermedia URL of this resource |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Starship().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Starship().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `StarshipEntity` instance with the same client and
options.

#### `client()`

Return the parent `StarWarsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VehicleEntity

```ts
const vehicle = client.Vehicle()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cargo_capacity` | `string` | No | The maximum number of kilograms that this vehicle can transport |
| `consumables` | `string` | No | The maximum length of time that this vehicle can provide consumables for its entire crew without having to resupply |
| `cost_in_credits` | `string` | No | The cost of this vehicle new, in galactic credits |
| `created` | `string` | No | The ISO 8601 date format of the time that this resource was created |
| `crew` | `string` | No | The number of personnel needed to run or pilot this vehicle |
| `edited` | `string` | No | The ISO 8601 date format of the time that this resource was edited |
| `films` | `any[]` | No | An array of Film URL Resources that this vehicle has appeared in |
| `id` | `string` | No |  |
| `length` | `string` | No | The length of this vehicle in meters |
| `manufacturer` | `string` | No | The manufacturer of this vehicle |
| `max_atmosphering_speed` | `string` | No | The maximum speed of this vehicle in atmosphere |
| `model` | `string` | No | The model or official name of this vehicle |
| `name` | `string` | No | The name of this vehicle |
| `passengers` | `string` | No | The number of non-essential people this vehicle can transport |
| `pilots` | `any[]` | No | An array of People URL Resources that this vehicle has been piloted by |
| `url` | `string` | No | The hypermedia URL of this resource |
| `vehicle_class` | `string` | No | The class of this vehicle |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Vehicle().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Vehicle().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VehicleEntity` instance with the same client and
options.

#### `client()`

Return the parent `StarWarsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new StarWarsSDK({
  feature: {
    test: { active: true },
  }
})
```

