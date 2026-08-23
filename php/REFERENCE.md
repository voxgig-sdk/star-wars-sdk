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
| `characters` | `array` | No | An array of people resource URLs that are in this film |
| `created` | `string` | No | The ISO 8601 date format of the time that this resource was created |
| `director` | `string` | No | The name of the director of this film |
| `edited` | `string` | No | The ISO 8601 date format of the time that this resource was edited |
| `episode_id` | `int` | No | The episode number of this film |
| `opening_crawl` | `string` | No | The opening paragraphs at the beginning of this film |
| `planets` | `array` | No | An array of planet resource URLs that are in this film |
| `producer` | `string` | No | The name(s) of the producer(s) of this film |
| `release_date` | `string` | No | The release date of this film |
| `species` | `array` | No | An array of species resource URLs that are in this film |
| `starships` | `array` | No | An array of starship resource URLs that are in this film |
| `title` | `string` | No | The title of this film |
| `url` | `string` | No | The hypermedia URL of this resource |
| `vehicles` | `array` | No | An array of vehicle resource URLs that are in this film |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Film()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Film()->load(["id" => 1]);
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
| `birth_year` | `string` | No | The birth year of the person, using the in-universe standard of BBY or ABY |
| `created` | `string` | No | The ISO 8601 date format of the time that this resource was created |
| `edited` | `string` | No | The ISO 8601 date format of the time that this resource was edited |
| `eye_color` | `string` | No | The eye color of this person |
| `films` | `array` | No | An array of film resource URLs that this person has been in |
| `gender` | `string` | No | The gender of this person |
| `hair_color` | `string` | No | The hair color of this person |
| `height` | `string` | No | The height of the person in centimeters |
| `homeworld` | `string` | No | The URL of the planet resource that this person was born on |
| `mass` | `string` | No | The mass of the person in kilograms |
| `name` | `string` | No | The name of this person |
| `skin_color` | `string` | No | The skin color of this person |
| `species` | `array` | No | An array of species resource URLs that this person belongs to |
| `starships` | `array` | No | An array of starship resource URLs that this person has piloted |
| `url` | `string` | No | The hypermedia URL of this resource |
| `vehicles` | `array` | No | An array of vehicle resource URLs that this person has piloted |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Person()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Person()->load(["id" => 1]);
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
| `climate` | `string` | No | The climate of this planet |
| `created` | `string` | No | The ISO 8601 date format of the time that this resource was created |
| `diameter` | `string` | No | The diameter of this planet in kilometers |
| `edited` | `string` | No | The ISO 8601 date format of the time that this resource was edited |
| `films` | `array` | No | An array of Film URL Resources that this planet has appeared in |
| `gravity` | `string` | No | A number denoting the gravity of this planet |
| `name` | `string` | No | The name of this planet |
| `orbital_period` | `string` | No | The number of standard days it takes for this planet to complete a single orbit of its local star |
| `population` | `string` | No | The average population of sentient beings inhabiting this planet |
| `residents` | `array` | No | An array of People URL Resources that live on this planet |
| `rotation_period` | `string` | No | The number of standard hours it takes for this planet to complete a single rotation on its axis |
| `surface_water` | `string` | No | The percentage of the planet surface that is naturally occurring water |
| `terrain` | `string` | No | The terrain of this planet |
| `url` | `string` | No | The hypermedia URL of this resource |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Planet()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Planet()->load(["id" => 1]);
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
| `average_height` | `string` | No | The average height of this species in centimeters |
| `average_lifespan` | `string` | No | The average lifespan of this species in years |
| `classification` | `string` | No | The classification of this species |
| `created` | `string` | No | The ISO 8601 date format of the time that this resource was created |
| `designation` | `string` | No | The designation of this species |
| `edited` | `string` | No | The ISO 8601 date format of the time that this resource was edited |
| `eye_colors` | `string` | No | A comma-separated string of common eye colors for this species |
| `films` | `array` | No | An array of Film URL Resources that this species has appeared in |
| `hair_colors` | `string` | No | A comma-separated string of common hair colors for this species |
| `homeworld` | `string` | No | The URL of a planet resource that is the homeworld of this species |
| `language` | `string` | No | The language commonly spoken by this species |
| `name` | `string` | No | The name of this species |
| `people` | `array` | No | An array of People URL Resources that are a part of this species |
| `skin_colors` | `string` | No | A comma-separated string of common skin colors for this species |
| `url` | `string` | No | The hypermedia URL of this resource |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Species()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Species()->load(["id" => 1]);
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
| `MGLT` | `string` | No | The Maximum number of Megalights this starship can travel in a standard hour |
| `cargo_capacity` | `string` | No | The maximum number of kilograms that this starship can transport |
| `consumables` | `string` | No | The maximum length of time that this starship can provide consumables for its entire crew without having to resupply |
| `cost_in_credits` | `string` | No | The cost of this starship new, in galactic credits |
| `created` | `string` | No | The ISO 8601 date format of the time that this resource was created |
| `crew` | `string` | No | The number of personnel needed to run or pilot this starship |
| `edited` | `string` | No | The ISO 8601 date format of the time that this resource was edited |
| `films` | `array` | No | An array of Film URL Resources that this starship has appeared in |
| `hyperdrive_rating` | `string` | No | The class of this starships hyperdrive |
| `length` | `string` | No | The length of this starship in meters |
| `manufacturer` | `string` | No | The manufacturer of this starship |
| `max_atmosphering_speed` | `string` | No | The maximum speed of this starship in atmosphere |
| `model` | `string` | No | The model or official name of this starship |
| `name` | `string` | No | The name of this starship |
| `passengers` | `string` | No | The number of non-essential people this starship can transport |
| `pilots` | `array` | No | An array of People URL Resources that this starship has been piloted by |
| `starship_class` | `string` | No | The class of this starship |
| `url` | `string` | No | The hypermedia URL of this resource |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Starship()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Starship()->load(["id" => 1]);
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
| `cargo_capacity` | `string` | No | The maximum number of kilograms that this vehicle can transport |
| `consumables` | `string` | No | The maximum length of time that this vehicle can provide consumables for its entire crew without having to resupply |
| `cost_in_credits` | `string` | No | The cost of this vehicle new, in galactic credits |
| `created` | `string` | No | The ISO 8601 date format of the time that this resource was created |
| `crew` | `string` | No | The number of personnel needed to run or pilot this vehicle |
| `edited` | `string` | No | The ISO 8601 date format of the time that this resource was edited |
| `films` | `array` | No | An array of Film URL Resources that this vehicle has appeared in |
| `length` | `string` | No | The length of this vehicle in meters |
| `manufacturer` | `string` | No | The manufacturer of this vehicle |
| `max_atmosphering_speed` | `string` | No | The maximum speed of this vehicle in atmosphere |
| `model` | `string` | No | The model or official name of this vehicle |
| `name` | `string` | No | The name of this vehicle |
| `passengers` | `string` | No | The number of non-essential people this vehicle can transport |
| `pilots` | `array` | No | An array of People URL Resources that this vehicle has been piloted by |
| `url` | `string` | No | The hypermedia URL of this resource |
| `vehicle_class` | `string` | No | The class of this vehicle |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Vehicle()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Vehicle()->load(["id" => 1]);
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

