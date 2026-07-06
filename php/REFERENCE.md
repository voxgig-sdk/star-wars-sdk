# StarWars PHP SDK Reference

Complete API reference for the StarWars PHP SDK.


## StarWarsSDK

### Constructor

```php
require_once __DIR__ . '/starwars_sdk.php';

$client = new StarWarsSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `StarWarsSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = StarWarsSDK::test();
```


### Instance Methods

#### `Film($data = null)`

Create a new `FilmEntity` instance. Pass `null` for no initial data.

#### `PeopleList($data = null)`

Create a new `PeopleListEntity` instance. Pass `null` for no initial data.

#### `Person($data = null)`

Create a new `PersonEntity` instance. Pass `null` for no initial data.

#### `Planet($data = null)`

Create a new `PlanetEntity` instance. Pass `null` for no initial data.

#### `Species($data = null)`

Create a new `SpeciesEntity` instance. Pass `null` for no initial data.

#### `Starship($data = null)`

Create a new `StarshipEntity` instance. Pass `null` for no initial data.

#### `Vehicle($data = null)`

Create a new `VehicleEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): StarWarsUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## FilmEntity

```php
$film = $client->Film();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `character` | `array` | No |  |
| `created` | `string` | No |  |
| `director` | `string` | No |  |
| `edited` | `string` | No |  |
| `episode_id` | `int` | No |  |
| `opening_crawl` | `string` | No |  |
| `planet` | `array` | No |  |
| `producer` | `string` | No |  |
| `release_date` | `string` | No |  |
| `species` | `array` | No |  |
| `starship` | `array` | No |  |
| `title` | `string` | No |  |
| `url` | `string` | No |  |
| `vehicle` | `array` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Film()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Film()->load(["id" => "film_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): FilmEntity`

Create a new `FilmEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PeopleListEntity

```php
$people_list = $client->PeopleList();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PeopleListEntity`

Create a new `PeopleListEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PersonEntity

```php
$person = $client->Person();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `birth_year` | `string` | No |  |
| `created` | `string` | No |  |
| `edited` | `string` | No |  |
| `eye_color` | `string` | No |  |
| `film` | `array` | No |  |
| `gender` | `string` | No |  |
| `hair_color` | `string` | No |  |
| `height` | `string` | No |  |
| `homeworld` | `string` | No |  |
| `mass` | `string` | No |  |
| `name` | `string` | No |  |
| `skin_color` | `string` | No |  |
| `species` | `array` | No |  |
| `starship` | `array` | No |  |
| `url` | `string` | No |  |
| `vehicle` | `array` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Person()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Person()->load(["id" => "person_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PersonEntity`

Create a new `PersonEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PlanetEntity

```php
$planet = $client->Planet();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `climate` | `string` | No |  |
| `created` | `string` | No |  |
| `diameter` | `string` | No |  |
| `edited` | `string` | No |  |
| `film` | `array` | No |  |
| `gravity` | `string` | No |  |
| `name` | `string` | No |  |
| `orbital_period` | `string` | No |  |
| `population` | `string` | No |  |
| `resident` | `array` | No |  |
| `rotation_period` | `string` | No |  |
| `surface_water` | `string` | No |  |
| `terrain` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Planet()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Planet()->load(["id" => "planet_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PlanetEntity`

Create a new `PlanetEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SpeciesEntity

```php
$species = $client->Species();
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
| `film` | `array` | No |  |
| `hair_color` | `string` | No |  |
| `homeworld` | `string` | No |  |
| `language` | `string` | No |  |
| `name` | `string` | No |  |
| `person` | `array` | No |  |
| `skin_color` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Species()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Species()->load(["id" => "species_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SpeciesEntity`

Create a new `SpeciesEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## StarshipEntity

```php
$starship = $client->Starship();
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
| `film` | `array` | No |  |
| `hyperdrive_rating` | `string` | No |  |
| `length` | `string` | No |  |
| `manufacturer` | `string` | No |  |
| `max_atmosphering_speed` | `string` | No |  |
| `mglt` | `string` | No |  |
| `model` | `string` | No |  |
| `name` | `string` | No |  |
| `passenger` | `string` | No |  |
| `pilot` | `array` | No |  |
| `starship_class` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Starship()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Starship()->load(["id" => "starship_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): StarshipEntity`

Create a new `StarshipEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## VehicleEntity

```php
$vehicle = $client->Vehicle();
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
| `film` | `array` | No |  |
| `length` | `string` | No |  |
| `manufacturer` | `string` | No |  |
| `max_atmosphering_speed` | `string` | No |  |
| `model` | `string` | No |  |
| `name` | `string` | No |  |
| `passenger` | `string` | No |  |
| `pilot` | `array` | No |  |
| `url` | `string` | No |  |
| `vehicle_class` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Vehicle()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Vehicle()->load(["id" => "vehicle_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): VehicleEntity`

Create a new `VehicleEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new StarWarsSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

