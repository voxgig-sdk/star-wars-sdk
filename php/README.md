# StarWars PHP SDK



The PHP SDK for the StarWars API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Film()` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

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
        echo $item["characters"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 3. Load a film

```php
try {
    // load() returns the ENTITY — call data_get() for the Film record (throws on error).
    $film = $client->Film()->load(["id" => 1]);
    print_r($film);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $persons = $client->Person()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
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
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
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
    "entity" => ["person" => ["test01" => ["id" => "test01"]]],
]);

// Entity ops return the ENTITY (throws on error);
// call data_get() for the mock record.
$person = $client->Person()->list();
print_r($person);
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
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (an `array` for single-entity
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
| `characters` | An array of people resource URLs that are in this film |
| `created` | The ISO 8601 date format of the time that this resource was created |
| `director` | The name of the director of this film |
| `edited` | The ISO 8601 date format of the time that this resource was edited |
| `episode_id` | The episode number of this film |
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

Create an instance: `$film = $client->Film();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `characters` | `array` | An array of people resource URLs that are in this film |
| `created` | `string` | The ISO 8601 date format of the time that this resource was created |
| `director` | `string` | The name of the director of this film |
| `edited` | `string` | The ISO 8601 date format of the time that this resource was edited |
| `episode_id` | `int` | The episode number of this film |
| `opening_crawl` | `string` | The opening paragraphs at the beginning of this film |
| `planets` | `array` | An array of planet resource URLs that are in this film |
| `producer` | `string` | The name(s) of the producer(s) of this film |
| `release_date` | `string` | The release date of this film |
| `species` | `array` | An array of species resource URLs that are in this film |
| `starships` | `array` | An array of starship resource URLs that are in this film |
| `title` | `string` | The title of this film |
| `url` | `string` | The hypermedia URL of this resource |
| `vehicles` | `array` | An array of vehicle resource URLs that are in this film |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Film record (throws on error).
$film = $client->Film()->load(["id" => 1]);
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
| `birth_year` | `string` | The birth year of the person, using the in-universe standard of BBY or ABY |
| `created` | `string` | The ISO 8601 date format of the time that this resource was created |
| `edited` | `string` | The ISO 8601 date format of the time that this resource was edited |
| `eye_color` | `string` | The eye color of this person |
| `films` | `array` | An array of film resource URLs that this person has been in |
| `gender` | `string` | The gender of this person |
| `hair_color` | `string` | The hair color of this person |
| `height` | `string` | The height of the person in centimeters |
| `homeworld` | `string` | The URL of the planet resource that this person was born on |
| `mass` | `string` | The mass of the person in kilograms |
| `name` | `string` | The name of this person |
| `skin_color` | `string` | The skin color of this person |
| `species` | `array` | An array of species resource URLs that this person belongs to |
| `starships` | `array` | An array of starship resource URLs that this person has piloted |
| `url` | `string` | The hypermedia URL of this resource |
| `vehicles` | `array` | An array of vehicle resource URLs that this person has piloted |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Person record (throws on error).
$person = $client->Person()->load(["id" => 1]);
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
| `climate` | `string` | The climate of this planet |
| `created` | `string` | The ISO 8601 date format of the time that this resource was created |
| `diameter` | `string` | The diameter of this planet in kilometers |
| `edited` | `string` | The ISO 8601 date format of the time that this resource was edited |
| `films` | `array` | An array of Film URL Resources that this planet has appeared in |
| `gravity` | `string` | A number denoting the gravity of this planet |
| `name` | `string` | The name of this planet |
| `orbital_period` | `string` | The number of standard days it takes for this planet to complete a single orbit of its local star |
| `population` | `string` | The average population of sentient beings inhabiting this planet |
| `residents` | `array` | An array of People URL Resources that live on this planet |
| `rotation_period` | `string` | The number of standard hours it takes for this planet to complete a single rotation on its axis |
| `surface_water` | `string` | The percentage of the planet surface that is naturally occurring water |
| `terrain` | `string` | The terrain of this planet |
| `url` | `string` | The hypermedia URL of this resource |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Planet record (throws on error).
$planet = $client->Planet()->load(["id" => 1]);
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
| `average_height` | `string` | The average height of this species in centimeters |
| `average_lifespan` | `string` | The average lifespan of this species in years |
| `classification` | `string` | The classification of this species |
| `created` | `string` | The ISO 8601 date format of the time that this resource was created |
| `designation` | `string` | The designation of this species |
| `edited` | `string` | The ISO 8601 date format of the time that this resource was edited |
| `eye_colors` | `string` | A comma-separated string of common eye colors for this species |
| `films` | `array` | An array of Film URL Resources that this species has appeared in |
| `hair_colors` | `string` | A comma-separated string of common hair colors for this species |
| `homeworld` | `string` | The URL of a planet resource that is the homeworld of this species |
| `language` | `string` | The language commonly spoken by this species |
| `name` | `string` | The name of this species |
| `people` | `array` | An array of People URL Resources that are a part of this species |
| `skin_colors` | `string` | A comma-separated string of common skin colors for this species |
| `url` | `string` | The hypermedia URL of this resource |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Species record (throws on error).
$species = $client->Species()->load(["id" => 1]);
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
| `MGLT` | `string` | The Maximum number of Megalights this starship can travel in a standard hour |
| `cargo_capacity` | `string` | The maximum number of kilograms that this starship can transport |
| `consumables` | `string` | The maximum length of time that this starship can provide consumables for its entire crew without having to resupply |
| `cost_in_credits` | `string` | The cost of this starship new, in galactic credits |
| `created` | `string` | The ISO 8601 date format of the time that this resource was created |
| `crew` | `string` | The number of personnel needed to run or pilot this starship |
| `edited` | `string` | The ISO 8601 date format of the time that this resource was edited |
| `films` | `array` | An array of Film URL Resources that this starship has appeared in |
| `hyperdrive_rating` | `string` | The class of this starships hyperdrive |
| `length` | `string` | The length of this starship in meters |
| `manufacturer` | `string` | The manufacturer of this starship |
| `max_atmosphering_speed` | `string` | The maximum speed of this starship in atmosphere |
| `model` | `string` | The model or official name of this starship |
| `name` | `string` | The name of this starship |
| `passengers` | `string` | The number of non-essential people this starship can transport |
| `pilots` | `array` | An array of People URL Resources that this starship has been piloted by |
| `starship_class` | `string` | The class of this starship |
| `url` | `string` | The hypermedia URL of this resource |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Starship record (throws on error).
$starship = $client->Starship()->load(["id" => 1]);
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
| `cargo_capacity` | `string` | The maximum number of kilograms that this vehicle can transport |
| `consumables` | `string` | The maximum length of time that this vehicle can provide consumables for its entire crew without having to resupply |
| `cost_in_credits` | `string` | The cost of this vehicle new, in galactic credits |
| `created` | `string` | The ISO 8601 date format of the time that this resource was created |
| `crew` | `string` | The number of personnel needed to run or pilot this vehicle |
| `edited` | `string` | The ISO 8601 date format of the time that this resource was edited |
| `films` | `array` | An array of Film URL Resources that this vehicle has appeared in |
| `length` | `string` | The length of this vehicle in meters |
| `manufacturer` | `string` | The manufacturer of this vehicle |
| `max_atmosphering_speed` | `string` | The maximum speed of this vehicle in atmosphere |
| `model` | `string` | The model or official name of this vehicle |
| `name` | `string` | The name of this vehicle |
| `passengers` | `string` | The number of non-essential people this vehicle can transport |
| `pilots` | `array` | An array of People URL Resources that this vehicle has been piloted by |
| `url` | `string` | The hypermedia URL of this resource |
| `vehicle_class` | `string` | The class of this vehicle |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Vehicle record (throws on error).
$vehicle = $client->Vehicle()->load(["id" => 1]);
```

#### Example: List

```php
// list() returns an array of Vehicle records (throws on error).
$vehicles = $client->Vehicle()->list();
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

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$person = $client->Person();
$person->list();

// $person->data_get() now returns the person data from the last list
// $person->match_get() returns the last match criteria
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
