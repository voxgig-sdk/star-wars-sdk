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
| `character` | `any[]` | No |  |
| `created` | `string` | No |  |
| `director` | `string` | No |  |
| `edited` | `string` | No |  |
| `episode_id` | `number` | No |  |
| `opening_crawl` | `string` | No |  |
| `planet` | `any[]` | No |  |
| `producer` | `string` | No |  |
| `release_date` | `string` | No |  |
| `species` | `any[]` | No |  |
| `starship` | `any[]` | No |  |
| `title` | `string` | No |  |
| `url` | `string` | No |  |
| `vehicle` | `any[]` | No |  |

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
| `birth_year` | `string` | No |  |
| `created` | `string` | No |  |
| `edited` | `string` | No |  |
| `eye_color` | `string` | No |  |
| `film` | `any[]` | No |  |
| `gender` | `string` | No |  |
| `hair_color` | `string` | No |  |
| `height` | `string` | No |  |
| `homeworld` | `string` | No |  |
| `mass` | `string` | No |  |
| `name` | `string` | No |  |
| `skin_color` | `string` | No |  |
| `species` | `any[]` | No |  |
| `starship` | `any[]` | No |  |
| `url` | `string` | No |  |
| `vehicle` | `any[]` | No |  |

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
| `climate` | `string` | No |  |
| `created` | `string` | No |  |
| `diameter` | `string` | No |  |
| `edited` | `string` | No |  |
| `film` | `any[]` | No |  |
| `gravity` | `string` | No |  |
| `name` | `string` | No |  |
| `orbital_period` | `string` | No |  |
| `population` | `string` | No |  |
| `resident` | `any[]` | No |  |
| `rotation_period` | `string` | No |  |
| `surface_water` | `string` | No |  |
| `terrain` | `string` | No |  |
| `url` | `string` | No |  |

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
| `average_height` | `string` | No |  |
| `average_lifespan` | `string` | No |  |
| `classification` | `string` | No |  |
| `created` | `string` | No |  |
| `designation` | `string` | No |  |
| `edited` | `string` | No |  |
| `eye_color` | `string` | No |  |
| `film` | `any[]` | No |  |
| `hair_color` | `string` | No |  |
| `homeworld` | `string` | No |  |
| `language` | `string` | No |  |
| `name` | `string` | No |  |
| `person` | `any[]` | No |  |
| `skin_color` | `string` | No |  |
| `url` | `string` | No |  |

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
| `cargo_capacity` | `string` | No |  |
| `consumable` | `string` | No |  |
| `cost_in_credit` | `string` | No |  |
| `created` | `string` | No |  |
| `crew` | `string` | No |  |
| `edited` | `string` | No |  |
| `film` | `any[]` | No |  |
| `hyperdrive_rating` | `string` | No |  |
| `length` | `string` | No |  |
| `manufacturer` | `string` | No |  |
| `max_atmosphering_speed` | `string` | No |  |
| `mglt` | `string` | No |  |
| `model` | `string` | No |  |
| `name` | `string` | No |  |
| `passenger` | `string` | No |  |
| `pilot` | `any[]` | No |  |
| `starship_class` | `string` | No |  |
| `url` | `string` | No |  |

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
| `cargo_capacity` | `string` | No |  |
| `consumable` | `string` | No |  |
| `cost_in_credit` | `string` | No |  |
| `created` | `string` | No |  |
| `crew` | `string` | No |  |
| `edited` | `string` | No |  |
| `film` | `any[]` | No |  |
| `length` | `string` | No |  |
| `manufacturer` | `string` | No |  |
| `max_atmosphering_speed` | `string` | No |  |
| `model` | `string` | No |  |
| `name` | `string` | No |  |
| `passenger` | `string` | No |  |
| `pilot` | `any[]` | No |  |
| `url` | `string` | No |  |
| `vehicle_class` | `string` | No |  |

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

