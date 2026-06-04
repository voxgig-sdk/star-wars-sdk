# StarWars SDK

Query Star Wars films, people, planets, species, starships, and vehicles over a plain HTTP/JSON API

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Star Wars API

The [Star Wars API](https://swapi.dev/) (SWAPI) is a community-built read-only HTTP API that exposes structured data about the Star Wars universe — films, characters, planets, species, starships and vehicles — served as JSON over `https://swapi.dev/api`.

What you get from the API:

- Films, with title, episode, opening crawl, director, producer and release date.
- People (characters), with attributes like name, height, mass, hair/eye colour, birth year and homeworld.
- Planets, with climate, terrain, gravity, population and orbital/rotation periods.
- Species, with classification, language, average lifespan and designation.
- Starships and vehicles, with model, manufacturer, cost, crew, passengers, cargo capacity and hyperdrive rating.
- Cross-references between resources (e.g. a film links to its people, planets, species, starships and vehicles).

SWAPI is read-only and requires no authentication or API key. Responses are paginated JSON and the service is HTTP-only with no documented quota. Note that the public swapi.dev host has had periods of unreliability, so consumers should handle non-2xx responses gracefully.

## Try it

**TypeScript**
```bash
npm install star-wars
```

**Python**
```bash
pip install star-wars-sdk
```

**PHP**
```bash
composer require voxgig/star-wars-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/star-wars-sdk/go
```

**Ruby**
```bash
gem install star-wars-sdk
```

**Lua**
```bash
luarocks install star-wars-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { StarWarsSDK } from 'star-wars'

const client = new StarWarsSDK({})

// List all films
const films = await client.Film().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o star-wars-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "star-wars": {
      "command": "/abs/path/to/star-wars-mcp"
    }
  }
}
```

## Entities

The API exposes 7 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Film** | A Star Wars feature film resource exposed under `/films/` with title, episode, crawl, director, producer and release date. | `/films` |
| **PeopleList** | Paginated collection of characters available at `/people/`. | `` |
| **Person** | An individual Star Wars character at `/people/{id}/` with biographical and physical attributes plus links to films, species, starships and vehicles. | `/people` |
| **Planet** | A planet resource at `/planets/{id}/` covering climate, terrain, gravity, diameter, population and orbital data. | `/planets` |
| **Species** | A sentient species at `/species/{id}/` with classification, designation, average height/lifespan, language and homeworld. | `/species` |
| **Starship** | A hyperdrive-capable ship at `/starships/{id}/` with model, manufacturer, crew, passengers, cargo capacity and hyperdrive rating. | `/starships` |
| **Vehicle** | A non-hyperdrive craft at `/vehicles/{id}/` with model, manufacturer, crew, passengers and cargo capacity. | `/vehicles` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from starwars_sdk import StarWarsSDK

client = StarWarsSDK({})

# List all films
films, err = client.Film(None).list(None, None)

# Load a specific film
film, err = client.Film(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'starwars_sdk.php';

$client = new StarWarsSDK([]);

// List all films
[$films, $err] = $client->Film(null)->list(null, null);

// Load a specific film
[$film, $err] = $client->Film(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/star-wars-sdk/go"

client := sdk.NewStarWarsSDK(map[string]any{})

// List all films
films, err := client.Film(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "StarWars_sdk"

client = StarWarsSDK.new({})

# List all films
films, err = client.Film(nil).list(nil, nil)

# Load a specific film
film, err = client.Film(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("star-wars_sdk")

local client = sdk.new({})

-- List all films
local films, err = client:Film(nil):list(nil, nil)

-- Load a specific film
local film, err = client:Film(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = StarWarsSDK.test()
const result = await client.Film().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = StarWarsSDK.test(None, None)
result, err = client.Film(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = StarWarsSDK::test(null, null);
[$result, $err] = $client->Film(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Film(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = StarWarsSDK.test(nil, nil)
result, err = client.Film(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Film(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Star Wars API

- Upstream: [https://swapi.dev/](https://swapi.dev/)
- API docs: [https://swapi.dev/documentation](https://swapi.dev/documentation)

- No formal licence is published on the SWAPI homepage.
- Star Wars names, characters and related material are trademarks of Lucasfilm Ltd.; SWAPI is an unofficial fan project.
- Treat all returned data as informational only and credit `swapi.dev` when redistributing.

---

Generated from the Star Wars API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
