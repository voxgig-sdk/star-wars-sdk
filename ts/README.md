# StarWars TypeScript SDK



The TypeScript SDK for the StarWars API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Film()` — each with a small set of operations (`list`, `load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Other languages, the CLI, and MCP server live alongside this one — see
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
import { StarWarsSDK } from '@voxgig-sdk/star-wars'

const client = new StarWarsSDK()
```

### 2. List film records

`list()` resolves to an array of Film objects — iterate it directly:

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
  const films = await client.Film().list()
  console.log(films)
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

const film = await client.Film().list()
// film is a bare entity populated with mock response data
console.log(film)
```

You can also use the instance method:

```ts
const client = new StarWarsSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Film()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
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

Operations: list, load.

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

Operations: list, load.

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

Operations: list, load.

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

Operations: list, load.

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
| `character` | `any[]` |  |
| `created` | `string` |  |
| `director` | `string` |  |
| `edited` | `string` |  |
| `episode_id` | `number` |  |
| `opening_crawl` | `string` |  |
| `planet` | `any[]` |  |
| `producer` | `string` |  |
| `release_date` | `string` |  |
| `species` | `any[]` |  |
| `starship` | `any[]` |  |
| `title` | `string` |  |
| `url` | `string` |  |
| `vehicle` | `any[]` |  |

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
| `birth_year` | `string` |  |
| `created` | `string` |  |
| `edited` | `string` |  |
| `eye_color` | `string` |  |
| `film` | `any[]` |  |
| `gender` | `string` |  |
| `hair_color` | `string` |  |
| `height` | `string` |  |
| `homeworld` | `string` |  |
| `mass` | `string` |  |
| `name` | `string` |  |
| `skin_color` | `string` |  |
| `species` | `any[]` |  |
| `starship` | `any[]` |  |
| `url` | `string` |  |
| `vehicle` | `any[]` |  |

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
| `climate` | `string` |  |
| `created` | `string` |  |
| `diameter` | `string` |  |
| `edited` | `string` |  |
| `film` | `any[]` |  |
| `gravity` | `string` |  |
| `name` | `string` |  |
| `orbital_period` | `string` |  |
| `population` | `string` |  |
| `resident` | `any[]` |  |
| `rotation_period` | `string` |  |
| `surface_water` | `string` |  |
| `terrain` | `string` |  |
| `url` | `string` |  |

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
| `average_height` | `string` |  |
| `average_lifespan` | `string` |  |
| `classification` | `string` |  |
| `created` | `string` |  |
| `designation` | `string` |  |
| `edited` | `string` |  |
| `eye_color` | `string` |  |
| `film` | `any[]` |  |
| `hair_color` | `string` |  |
| `homeworld` | `string` |  |
| `language` | `string` |  |
| `name` | `string` |  |
| `person` | `any[]` |  |
| `skin_color` | `string` |  |
| `url` | `string` |  |

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
| `cargo_capacity` | `string` |  |
| `consumable` | `string` |  |
| `cost_in_credit` | `string` |  |
| `created` | `string` |  |
| `crew` | `string` |  |
| `edited` | `string` |  |
| `film` | `any[]` |  |
| `hyperdrive_rating` | `string` |  |
| `length` | `string` |  |
| `manufacturer` | `string` |  |
| `max_atmosphering_speed` | `string` |  |
| `mglt` | `string` |  |
| `model` | `string` |  |
| `name` | `string` |  |
| `passenger` | `string` |  |
| `pilot` | `any[]` |  |
| `starship_class` | `string` |  |
| `url` | `string` |  |

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
| `cargo_capacity` | `string` |  |
| `consumable` | `string` |  |
| `cost_in_credit` | `string` |  |
| `created` | `string` |  |
| `crew` | `string` |  |
| `edited` | `string` |  |
| `film` | `any[]` |  |
| `length` | `string` |  |
| `manufacturer` | `string` |  |
| `max_atmosphering_speed` | `string` |  |
| `model` | `string` |  |
| `name` | `string` |  |
| `passenger` | `string` |  |
| `pilot` | `any[]` |  |
| `url` | `string` |  |
| `vehicle_class` | `string` |  |

#### Example: Load

```ts
const vehicle = await client.Vehicle().load({ id: 1 })
```

#### Example: List

```ts
const vehicles = await client.Vehicle().list()
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
import { StarWarsSDK } from '@voxgig-sdk/star-wars'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const film = client.Film()
await film.list()

// film.data() now returns the film data from the last `list`
// film.match() returns the last match criteria
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
