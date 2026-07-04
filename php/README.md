# StarWars PHP SDK



The PHP SDK for the StarWars API — an entity-oriented client using PHP conventions.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/star-wars-sdk/releases](https://github.com/voxgig-sdk/star-wars-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'starwars_sdk.php';

$client = new StarWarsSDK();
```

### 2. List film records

```php
try {
    // list() returns an array of Film records — iterate directly.
    $films = $client->Film()->list();
    foreach ($films as $item) {
        echo $item["id"] . " " . $item["name"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 3. Load a film

```php
try {
    // load() returns the bare Film record (throws on error).
    $film = $client->Film()->load(["id" => "example_id"]);
    print_r($film);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    echo "Error: " . $result["err"]->getMessage();
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = StarWarsSDK::test([
    "entity" => ["film" => ["test01" => ["id" => "test01"]]],
]);

// load() returns the bare mock record (throws on error).
$film = $client->Film()->load(["id" => "test01"]);
print_r($film);
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new StarWarsSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
STAR_WARS_TEST_LIVE=TRUE
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### StarWarsSDK

```php
require_once 'starwars_sdk.php';
$client = new StarWarsSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = StarWarsSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### StarWarsSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Film` | `($data): FilmEntity` | Create a Film entity instance. |
| `PeopleList` | `($data): PeopleListEntity` | Create a PeopleList entity instance. |
| `Person` | `($data): PersonEntity` | Create a Person entity instance. |
| `Planet` | `($data): PlanetEntity` | Create a Planet entity instance. |
| `Species` | `($data): SpeciesEntity` | Create a Species entity instance. |
| `Starship` | `($data): StarshipEntity` | Create a Starship entity instance. |
| `Vehicle` | `($data): VehicleEntity` | Create a Vehicle entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `($reqmatch, $ctrl): array` | List entities matching the criteria. |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `update` | `($reqdata, $ctrl): array` | Update an existing entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the bare result data (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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

Create an instance: `$film = $client->Film();`

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

```php
// load() returns the bare Film record (throws on error).
$film = $client->Film()->load(["id" => "film_id"]);
```

#### Example: List

```php
// list() returns an array of Film records (throws on error).
$films = $client->Film()->list();
```


### PeopleList

Create an instance: `$people_list = $client->PeopleList();`


### Person

Create an instance: `$person = $client->Person();`

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

```php
// load() returns the bare Person record (throws on error).
$person = $client->Person()->load(["id" => "person_id"]);
```

#### Example: List

```php
// list() returns an array of Person records (throws on error).
$persons = $client->Person()->list();
```


### Planet

Create an instance: `$planet = $client->Planet();`

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

```php
// load() returns the bare Planet record (throws on error).
$planet = $client->Planet()->load(["id" => "planet_id"]);
```

#### Example: List

```php
// list() returns an array of Planet records (throws on error).
$planets = $client->Planet()->list();
```


### Species

Create an instance: `$species = $client->Species();`

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

```php
// load() returns the bare Species record (throws on error).
$species = $client->Species()->load(["id" => "species_id"]);
```

#### Example: List

```php
// list() returns an array of Species records (throws on error).
$speciess = $client->Species()->list();
```


### Starship

Create an instance: `$starship = $client->Starship();`

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

```php
// load() returns the bare Starship record (throws on error).
$starship = $client->Starship()->load(["id" => "starship_id"]);
```

#### Example: List

```php
// list() returns an array of Starship records (throws on error).
$starships = $client->Starship()->list();
```


### Vehicle

Create an instance: `$vehicle = $client->Vehicle();`

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

```php
// load() returns the bare Vehicle record (throws on error).
$vehicle = $client->Vehicle()->load(["id" => "vehicle_id"]);
```

#### Example: List

```php
// list() returns an array of Vehicle records (throws on error).
$vehicles = $client->Vehicle()->list();
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
error is returned to the caller as the second element in the return array.

### Features and hooks

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── starwars_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`starwars_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$film = $client->Film();
$film->load(["id" => "example_id"]);

// $film->dataGet() now returns the loaded film data
// $film->matchGet() returns the last match criteria
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
