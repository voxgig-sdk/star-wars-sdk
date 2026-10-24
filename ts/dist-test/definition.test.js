"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "film",
        "accessor": "Film",
        "op": "list",
        "method": "GET",
        "path": "/films",
        "args": [],
        "select": {
            "page": 1,
            "search": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "page",
            "search"
        ],
        "queryArgs": [
            {
                "name": "page",
                "wire": "page"
            },
            {
                "name": "search",
                "wire": "search"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "count": 1,
            "next": "x",
            "previous": "x",
            "results": [
                {
                    "title": "x",
                    "episode_id": 1,
                    "opening_crawl": "x",
                    "director": "x",
                    "producer": "x",
                    "release_date": "2026-01-01",
                    "characters": [
                        "x"
                    ],
                    "planets": [
                        "x"
                    ],
                    "starships": [
                        "x"
                    ],
                    "vehicles": [
                        "x"
                    ],
                    "species": [
                        "x"
                    ],
                    "created": "2026-01-01T00:00:00Z",
                    "edited": "2026-01-01T00:00:00Z",
                    "url": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "film",
        "accessor": "Film",
        "op": "load",
        "method": "GET",
        "path": "/films/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "title": "x",
            "episode_id": 1,
            "opening_crawl": "x",
            "director": "x",
            "producer": "x",
            "release_date": "2026-01-01",
            "characters": [
                "x"
            ],
            "planets": [
                "x"
            ],
            "starships": [
                "x"
            ],
            "vehicles": [
                "x"
            ],
            "species": [
                "x"
            ],
            "created": "2026-01-01T00:00:00Z",
            "edited": "2026-01-01T00:00:00Z",
            "url": "x"
        },
        "idField": "id"
    },
    {
        "entity": "person",
        "accessor": "Person",
        "op": "list",
        "method": "GET",
        "path": "/people",
        "args": [],
        "select": {
            "page": 1,
            "search": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "page",
            "search"
        ],
        "queryArgs": [
            {
                "name": "page",
                "wire": "page"
            },
            {
                "name": "search",
                "wire": "search"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "count": 1,
            "next": "x",
            "previous": "x",
            "results": [
                {
                    "name": "x",
                    "height": "x",
                    "mass": "x",
                    "hair_color": "x",
                    "skin_color": "x",
                    "eye_color": "x",
                    "birth_year": "x",
                    "gender": "x",
                    "homeworld": "x",
                    "films": [
                        "x"
                    ],
                    "species": [
                        "x"
                    ],
                    "vehicles": [
                        "x"
                    ],
                    "starships": [
                        "x"
                    ],
                    "created": "2026-01-01T00:00:00Z",
                    "edited": "2026-01-01T00:00:00Z",
                    "url": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "person",
        "accessor": "Person",
        "op": "load",
        "method": "GET",
        "path": "/people/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "name": "Luke Skywalker",
            "height": "172",
            "mass": "77",
            "hair_color": "blond",
            "skin_color": "fair",
            "eye_color": "blue",
            "birth_year": "19BBY",
            "gender": "male",
            "homeworld": "https://swapi.dev/api/planets/1/",
            "films": [
                "https://swapi.dev/api/films/2/",
                "https://swapi.dev/api/films/6/",
                "https://swapi.dev/api/films/3/"
            ],
            "species": [
                "https://swapi.dev/api/species/1/"
            ],
            "vehicles": [
                "https://swapi.dev/api/vehicles/14/",
                "https://swapi.dev/api/vehicles/30/"
            ],
            "starships": [
                "https://swapi.dev/api/starships/12/",
                "https://swapi.dev/api/starships/22/"
            ],
            "created": "2014-12-09T13:50:51.644000Z",
            "edited": "2014-12-20T21:17:56.891000Z",
            "url": "https://swapi.dev/api/people/1/"
        },
        "idField": "id"
    },
    {
        "entity": "planet",
        "accessor": "Planet",
        "op": "list",
        "method": "GET",
        "path": "/planets",
        "args": [],
        "select": {
            "page": 1,
            "search": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "page",
            "search"
        ],
        "queryArgs": [
            {
                "name": "page",
                "wire": "page"
            },
            {
                "name": "search",
                "wire": "search"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "count": 1,
            "next": "x",
            "previous": "x",
            "results": [
                {
                    "name": "x",
                    "rotation_period": "x",
                    "orbital_period": "x",
                    "diameter": "x",
                    "climate": "x",
                    "gravity": "x",
                    "terrain": "x",
                    "surface_water": "x",
                    "population": "x",
                    "residents": [
                        "x"
                    ],
                    "films": [
                        "x"
                    ],
                    "created": "2026-01-01T00:00:00Z",
                    "edited": "2026-01-01T00:00:00Z",
                    "url": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "planet",
        "accessor": "Planet",
        "op": "load",
        "method": "GET",
        "path": "/planets/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "name": "x",
            "rotation_period": "x",
            "orbital_period": "x",
            "diameter": "x",
            "climate": "x",
            "gravity": "x",
            "terrain": "x",
            "surface_water": "x",
            "population": "x",
            "residents": [
                "x"
            ],
            "films": [
                "x"
            ],
            "created": "2026-01-01T00:00:00Z",
            "edited": "2026-01-01T00:00:00Z",
            "url": "x"
        },
        "idField": "id"
    },
    {
        "entity": "species",
        "accessor": "Species",
        "op": "list",
        "method": "GET",
        "path": "/species",
        "args": [],
        "select": {
            "page": 1,
            "search": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "page",
            "search"
        ],
        "queryArgs": [
            {
                "name": "page",
                "wire": "page"
            },
            {
                "name": "search",
                "wire": "search"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "count": 1,
            "next": "x",
            "previous": "x",
            "results": [
                {
                    "name": "x",
                    "classification": "x",
                    "designation": "x",
                    "average_height": "x",
                    "skin_colors": "x",
                    "hair_colors": "x",
                    "eye_colors": "x",
                    "average_lifespan": "x",
                    "homeworld": "x",
                    "language": "x",
                    "people": [
                        "x"
                    ],
                    "films": [
                        "x"
                    ],
                    "created": "2026-01-01T00:00:00Z",
                    "edited": "2026-01-01T00:00:00Z",
                    "url": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "species",
        "accessor": "Species",
        "op": "load",
        "method": "GET",
        "path": "/species/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "name": "x",
            "classification": "x",
            "designation": "x",
            "average_height": "x",
            "skin_colors": "x",
            "hair_colors": "x",
            "eye_colors": "x",
            "average_lifespan": "x",
            "homeworld": "x",
            "language": "x",
            "people": [
                "x"
            ],
            "films": [
                "x"
            ],
            "created": "2026-01-01T00:00:00Z",
            "edited": "2026-01-01T00:00:00Z",
            "url": "x"
        },
        "idField": "id"
    },
    {
        "entity": "starship",
        "accessor": "Starship",
        "op": "list",
        "method": "GET",
        "path": "/starships",
        "args": [],
        "select": {
            "page": 1,
            "search": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "page",
            "search"
        ],
        "queryArgs": [
            {
                "name": "page",
                "wire": "page"
            },
            {
                "name": "search",
                "wire": "search"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "count": 1,
            "next": "x",
            "previous": "x",
            "results": [
                {
                    "name": "x",
                    "model": "x",
                    "manufacturer": "x",
                    "cost_in_credits": "x",
                    "length": "x",
                    "max_atmosphering_speed": "x",
                    "crew": "x",
                    "passengers": "x",
                    "cargo_capacity": "x",
                    "consumables": "x",
                    "hyperdrive_rating": "x",
                    "MGLT": "x",
                    "starship_class": "x",
                    "pilots": [
                        "x"
                    ],
                    "films": [
                        "x"
                    ],
                    "created": "2026-01-01T00:00:00Z",
                    "edited": "2026-01-01T00:00:00Z",
                    "url": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "starship",
        "accessor": "Starship",
        "op": "load",
        "method": "GET",
        "path": "/starships/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "name": "x",
            "model": "x",
            "manufacturer": "x",
            "cost_in_credits": "x",
            "length": "x",
            "max_atmosphering_speed": "x",
            "crew": "x",
            "passengers": "x",
            "cargo_capacity": "x",
            "consumables": "x",
            "hyperdrive_rating": "x",
            "MGLT": "x",
            "starship_class": "x",
            "pilots": [
                "x"
            ],
            "films": [
                "x"
            ],
            "created": "2026-01-01T00:00:00Z",
            "edited": "2026-01-01T00:00:00Z",
            "url": "x"
        },
        "idField": "id"
    },
    {
        "entity": "vehicle",
        "accessor": "Vehicle",
        "op": "list",
        "method": "GET",
        "path": "/vehicles",
        "args": [],
        "select": {
            "page": 1,
            "search": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "page",
            "search"
        ],
        "queryArgs": [
            {
                "name": "page",
                "wire": "page"
            },
            {
                "name": "search",
                "wire": "search"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "count": 1,
            "next": "x",
            "previous": "x",
            "results": [
                {
                    "name": "x",
                    "model": "x",
                    "manufacturer": "x",
                    "cost_in_credits": "x",
                    "length": "x",
                    "max_atmosphering_speed": "x",
                    "crew": "x",
                    "passengers": "x",
                    "cargo_capacity": "x",
                    "consumables": "x",
                    "vehicle_class": "x",
                    "pilots": [
                        "x"
                    ],
                    "films": [
                        "x"
                    ],
                    "created": "2026-01-01T00:00:00Z",
                    "edited": "2026-01-01T00:00:00Z",
                    "url": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "vehicle",
        "accessor": "Vehicle",
        "op": "load",
        "method": "GET",
        "path": "/vehicles/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "name": "x",
            "model": "x",
            "manufacturer": "x",
            "cost_in_credits": "x",
            "length": "x",
            "max_atmosphering_speed": "x",
            "crew": "x",
            "passengers": "x",
            "cargo_capacity": "x",
            "consumables": "x",
            "vehicle_class": "x",
            "pilots": [
                "x"
            ],
            "films": [
                "x"
            ],
            "created": "2026-01-01T00:00:00Z",
            "edited": "2026-01-01T00:00:00Z",
            "url": "x"
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map