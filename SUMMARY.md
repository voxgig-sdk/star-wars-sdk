# Star Wars API

Provides data from the Star Wars universe including planets, spaceships, vehicles, people, films, and species. Accessible through HTTP web API.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 7 entities and 12 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Film

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `characters`: An array of people resource URLs that are in this film
- `created`: The ISO 8601 date format of the time that this resource was created
- `director`: The name of the director of this film
- `edited`: The ISO 8601 date format of the time that this resource was edited
- `episode_id`: The episode number of this film

### PeopleList

SDK operations: .

### Person

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `birth_year`: The birth year of the person, using the in-universe standard of BBY or ABY
- `created`: The ISO 8601 date format of the time that this resource was created
- `edited`: The ISO 8601 date format of the time that this resource was edited
- `eye_color`: The eye color of this person
- `films`: An array of film resource URLs that this person has been in

### Planet

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `climate`: The climate of this planet
- `created`: The ISO 8601 date format of the time that this resource was created
- `diameter`: The diameter of this planet in kilometers
- `edited`: The ISO 8601 date format of the time that this resource was edited
- `films`: An array of Film URL Resources that this planet has appeared in

### Species

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `average_height`: The average height of this species in centimeters
- `average_lifespan`: The average lifespan of this species in years
- `classification`: The classification of this species
- `created`: The ISO 8601 date format of the time that this resource was created
- `designation`: The designation of this species

### Starship

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `MGLT`: The Maximum number of Megalights this starship can travel in a standard hour
- `cargo_capacity`: The maximum number of kilograms that this starship can transport
- `consumables`: The maximum length of time that this starship can provide consumables for its entire crew without having to resupply
- `cost_in_credits`: The cost of this starship new, in galactic credits
- `created`: The ISO 8601 date format of the time that this resource was created

### Vehicle

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `cargo_capacity`: The maximum number of kilograms that this vehicle can transport
- `consumables`: The maximum length of time that this vehicle can provide consumables for its entire crew without having to resupply
- `cost_in_credits`: The cost of this vehicle new, in galactic credits
- `created`: The ISO 8601 date format of the time that this resource was created
- `crew`: The number of personnel needed to run or pilot this vehicle

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Film | `list` | `GET /films` | See reference |
| Film | `load` | `GET /films/{id}` | See reference |
| Person | `list` | `GET /people` | See reference |
| Person | `load` | `GET /people/{id}` | See reference |
| Planet | `list` | `GET /planets` | See reference |
| Planet | `load` | `GET /planets/{id}` | See reference |
| Species | `list` | `GET /species` | See reference |
| Species | `load` | `GET /species/{id}` | See reference |
| Starship | `list` | `GET /starships` | See reference |
| Starship | `load` | `GET /starships/{id}` | See reference |
| Vehicle | `list` | `GET /vehicles` | See reference |
| Vehicle | `load` | `GET /vehicles/{id}` | See reference |

## Connect to the API

- Production server: `https://swapi.dev/api`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `star-wars_list`: List records for an entity. Supported entities: `film`, `person`, `planet`, `species`, `starship`, `vehicle`.
- `star-wars_load`: Load one record for an entity. Supported entities: `film`, `person`, `planet`, `species`, `starship`, `vehicle`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

