# StarWars TypeScript SDK



The TypeScript SDK for the StarWars API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Film()` — each with a small set of operations (`list`, `load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/star-wars-sdk/releases](https://github.com/voxgig-sdk/star-wars-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { StarWarsSDK } from '@voxgig-sdk/star-wars-sdk'

const client = new StarWarsSDK()
```

### 2. List film records

`list()` resolves to an array of Film ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const films = await client.Film().list()

for (const film of films) {
  console.log(film)
}
```

### 3. Load a film

`load()` returns the entity directly and throws on failure:

```ts
try {
  const film = await client.Film().load({ id: 1 })
  console.log(film)
} catch (err) {
  console.error('load failed:', err)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const persons = await client.Person().list()
  console.log(persons)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = StarWarsSDK.test()

const person = await client.Person().list()
// person is the entity, populated with mock response data
// — call person.data() for the record itself
console.log(person)
```

You can also use the instance method:

```ts
const client = new StarWarsSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Person()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new StarWarsSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
STAR_WARS_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```


## Reference

### StarWarsSDK

#### Constructor

```ts
new StarWarsSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Film(data?)` | `FilmEntity` | Create a Film entity instance. |
| `PeopleList(data?)` | `PeopleListEntity` | Create a PeopleList entity instance. |
| `Person(data?)` | `PersonEntity` | Create a Person entity instance. |
| `Planet(data?)` | `PlanetEntity` | Create a Planet entity instance. |
| `Species(data?)` | `SpeciesEntity` | Create a Species entity instance. |
| `Starship(data?)` | `StarshipEntity` | Create a Starship entity instance. |
| `Vehicle(data?)` | `VehicleEntity` | Create a Vehicle entity instance. |
| `tester(testopts?, sdkopts?)` | `StarWarsSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `StarWarsSDK.test(testopts?, sdkopts?)` | `StarWarsSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): StarWarsSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` resolves to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

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

Operations: list, load.

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

Operations: list, load.

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

Operations: list, load.

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

Operations: list, load.

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

Operations: list, load.

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

Operations: list, load.

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
| `characters` | `any[]` | An array of people resource URLs that are in this film |
| `created` | `string` | The ISO 8601 date format of the time that this resource was created |
| `director` | `string` | The name of the director of this film |
| `edited` | `string` | The ISO 8601 date format of the time that this resource was edited |
| `episode_id` | `number` | The episode number of this film |
| `id` | `string` |  |
| `opening_crawl` | `string` | The opening paragraphs at the beginning of this film |
| `planets` | `any[]` | An array of planet resource URLs that are in this film |
| `producer` | `string` | The name(s) of the producer(s) of this film |
| `release_date` | `string` | The release date of this film |
| `species` | `any[]` | An array of species resource URLs that are in this film |
| `starships` | `any[]` | An array of starship resource URLs that are in this film |
| `title` | `string` | The title of this film |
| `url` | `string` | The hypermedia URL of this resource |
| `vehicles` | `any[]` | An array of vehicle resource URLs that are in this film |

#### Example: Load

```ts
const film = await client.Film().load({ id: 1 })
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
| `birth_year` | `string` | The birth year of the person, using the in-universe standard of BBY or ABY |
| `created` | `string` | The ISO 8601 date format of the time that this resource was created |
| `edited` | `string` | The ISO 8601 date format of the time that this resource was edited |
| `eye_color` | `string` | The eye color of this person |
| `films` | `any[]` | An array of film resource URLs that this person has been in |
| `gender` | `string` | The gender of this person |
| `hair_color` | `string` | The hair color of this person |
| `height` | `string` | The height of the person in centimeters |
| `homeworld` | `string` | The URL of the planet resource that this person was born on |
| `id` | `string` |  |
| `mass` | `string` | The mass of the person in kilograms |
| `name` | `string` | The name of this person |
| `skin_color` | `string` | The skin color of this person |
| `species` | `any[]` | An array of species resource URLs that this person belongs to |
| `starships` | `any[]` | An array of starship resource URLs that this person has piloted |
| `url` | `string` | The hypermedia URL of this resource |
| `vehicles` | `any[]` | An array of vehicle resource URLs that this person has piloted |

#### Example: Load

```ts
const person = await client.Person().load({ id: 1 })
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
| `climate` | `string` | The climate of this planet |
| `created` | `string` | The ISO 8601 date format of the time that this resource was created |
| `diameter` | `string` | The diameter of this planet in kilometers |
| `edited` | `string` | The ISO 8601 date format of the time that this resource was edited |
| `films` | `any[]` | An array of Film URL Resources that this planet has appeared in |
| `gravity` | `string` | A number denoting the gravity of this planet |
| `id` | `string` |  |
| `name` | `string` | The name of this planet |
| `orbital_period` | `string` | The number of standard days it takes for this planet to complete a single orbit of its local star |
| `population` | `string` | The average population of sentient beings inhabiting this planet |
| `residents` | `any[]` | An array of People URL Resources that live on this planet |
| `rotation_period` | `string` | The number of standard hours it takes for this planet to complete a single rotation on its axis |
| `surface_water` | `string` | The percentage of the planet surface that is naturally occurring water |
| `terrain` | `string` | The terrain of this planet |
| `url` | `string` | The hypermedia URL of this resource |

#### Example: Load

```ts
const planet = await client.Planet().load({ id: 1 })
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
| `average_height` | `string` | The average height of this species in centimeters |
| `average_lifespan` | `string` | The average lifespan of this species in years |
| `classification` | `string` | The classification of this species |
| `created` | `string` | The ISO 8601 date format of the time that this resource was created |
| `designation` | `string` | The designation of this species |
| `edited` | `string` | The ISO 8601 date format of the time that this resource was edited |
| `eye_colors` | `string` | A comma-separated string of common eye colors for this species |
| `films` | `any[]` | An array of Film URL Resources that this species has appeared in |
| `hair_colors` | `string` | A comma-separated string of common hair colors for this species |
| `homeworld` | `string` | The URL of a planet resource that is the homeworld of this species |
| `id` | `string` |  |
| `language` | `string` | The language commonly spoken by this species |
| `name` | `string` | The name of this species |
| `people` | `any[]` | An array of People URL Resources that are a part of this species |
| `skin_colors` | `string` | A comma-separated string of common skin colors for this species |
| `url` | `string` | The hypermedia URL of this resource |

#### Example: Load

```ts
const species = await client.Species().load({ id: 1 })
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
| `MGLT` | `string` | The Maximum number of Megalights this starship can travel in a standard hour |
| `cargo_capacity` | `string` | The maximum number of kilograms that this starship can transport |
| `consumables` | `string` | The maximum length of time that this starship can provide consumables for its entire crew without having to resupply |
| `cost_in_credits` | `string` | The cost of this starship new, in galactic credits |
| `created` | `string` | The ISO 8601 date format of the time that this resource was created |
| `crew` | `string` | The number of personnel needed to run or pilot this starship |
| `edited` | `string` | The ISO 8601 date format of the time that this resource was edited |
| `films` | `any[]` | An array of Film URL Resources that this starship has appeared in |
| `hyperdrive_rating` | `string` | The class of this starships hyperdrive |
| `id` | `string` |  |
| `length` | `string` | The length of this starship in meters |
| `manufacturer` | `string` | The manufacturer of this starship |
| `max_atmosphering_speed` | `string` | The maximum speed of this starship in atmosphere |
| `model` | `string` | The model or official name of this starship |
| `name` | `string` | The name of this starship |
| `passengers` | `string` | The number of non-essential people this starship can transport |
| `pilots` | `any[]` | An array of People URL Resources that this starship has been piloted by |
| `starship_class` | `string` | The class of this starship |
| `url` | `string` | The hypermedia URL of this resource |

#### Example: Load

```ts
const starship = await client.Starship().load({ id: 1 })
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
| `cargo_capacity` | `string` | The maximum number of kilograms that this vehicle can transport |
| `consumables` | `string` | The maximum length of time that this vehicle can provide consumables for its entire crew without having to resupply |
| `cost_in_credits` | `string` | The cost of this vehicle new, in galactic credits |
| `created` | `string` | The ISO 8601 date format of the time that this resource was created |
| `crew` | `string` | The number of personnel needed to run or pilot this vehicle |
| `edited` | `string` | The ISO 8601 date format of the time that this resource was edited |
| `films` | `any[]` | An array of Film URL Resources that this vehicle has appeared in |
| `id` | `string` |  |
| `length` | `string` | The length of this vehicle in meters |
| `manufacturer` | `string` | The manufacturer of this vehicle |
| `max_atmosphering_speed` | `string` | The maximum speed of this vehicle in atmosphere |
| `model` | `string` | The model or official name of this vehicle |
| `name` | `string` | The name of this vehicle |
| `passengers` | `string` | The number of non-essential people this vehicle can transport |
| `pilots` | `any[]` | An array of People URL Resources that this vehicle has been piloted by |
| `url` | `string` | The hypermedia URL of this resource |
| `vehicle_class` | `string` | The class of this vehicle |

#### Example: Load

```ts
const vehicle = await client.Vehicle().load({ id: 1 })
```

#### Example: List

```ts
const vehicles = await client.Vehicle().list()
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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
star-wars/
├── src/
│   ├── StarWarsSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { StarWarsSDK } from '@voxgig-sdk/star-wars-sdk'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const person = client.Person()
await person.list()

// person.data() now returns the person data from the last `list`
// person.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
