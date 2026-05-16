# StarWars PHP SDK Reference

Complete API reference for the StarWars PHP SDK.


## StarWarsSDK

### Constructor

```php
require_once __DIR__ . '/star-wars_sdk.php';

$client = new StarWarsSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
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

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. Returns `[$result, $err]`.

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

**Returns:** `array [$result, $err]`

#### `prepare(array $fetchargs = []): array`

Prepare a fetch definition without sending the request. Returns `[$fetchdef, $err]`.


---

## FilmEntity

```php
$film = $client->Film();
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

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Film()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Film()->load(["id" => "film_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): FilmEntity`

Create a new `FilmEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## PeopleListEntity

```php
$people_list = $client->PeopleList();
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): PeopleListEntity`

Create a new `PeopleListEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## PersonEntity

```php
$person = $client->Person();
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

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Person()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Person()->load(["id" => "person_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): PersonEntity`

Create a new `PersonEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## PlanetEntity

```php
$planet = $client->Planet();
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

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Planet()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Planet()->load(["id" => "planet_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): PlanetEntity`

Create a new `PlanetEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## SpeciesEntity

```php
$species = $client->Species();
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

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Species()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Species()->load(["id" => "species_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): SpeciesEntity`

Create a new `SpeciesEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## StarshipEntity

```php
$starship = $client->Starship();
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

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Starship()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Starship()->load(["id" => "starship_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): StarshipEntity`

Create a new `StarshipEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## VehicleEntity

```php
$vehicle = $client->Vehicle();
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

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Vehicle()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Vehicle()->load(["id" => "vehicle_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): VehicleEntity`

Create a new `VehicleEntity` instance with the same client and
options.

#### `getName(): string`

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

