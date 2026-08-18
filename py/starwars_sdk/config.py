# StarWars SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "StarWars",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://swapi.dev/api",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "film": {},
                "people_list": {},
                "person": {},
                "planet": {},
                "species": {},
                "starship": {},
                "vehicle": {},
            },
        },
        "entity": {
      "film": {
        "fields": [
          {
            "name": "characters",
            "type": "`$ARRAY`",
          },
          {
            "name": "created",
            "type": "`$STRING`",
          },
          {
            "name": "director",
            "type": "`$STRING`",
          },
          {
            "name": "edited",
            "type": "`$STRING`",
          },
          {
            "name": "episode_id",
            "type": "`$INTEGER`",
          },
          {
            "name": "opening_crawl",
            "type": "`$STRING`",
          },
          {
            "name": "planets",
            "type": "`$ARRAY`",
          },
          {
            "name": "producer",
            "type": "`$STRING`",
          },
          {
            "name": "release_date",
            "type": "`$STRING`",
          },
          {
            "name": "species",
            "type": "`$ARRAY`",
          },
          {
            "name": "starships",
            "type": "`$ARRAY`",
          },
          {
            "name": "title",
            "type": "`$STRING`",
          },
          {
            "name": "url",
            "type": "`$STRING`",
          },
          {
            "name": "vehicles",
            "type": "`$ARRAY`",
          },
        ],
        "name": "film",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "search",
                      "orig": "search",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/films",
                "parts": [
                  "films",
                ],
                "select": {
                  "exist": [
                    "page",
                    "search",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/films/{id}",
                "parts": [
                  "films",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "people_list": {
        "fields": [],
        "name": "people_list",
        "op": {},
        "relations": {
          "ancestors": [],
        },
      },
      "person": {
        "fields": [
          {
            "name": "birth_year",
            "type": "`$STRING`",
          },
          {
            "name": "created",
            "type": "`$STRING`",
          },
          {
            "name": "edited",
            "type": "`$STRING`",
          },
          {
            "name": "eye_color",
            "type": "`$STRING`",
          },
          {
            "name": "films",
            "type": "`$ARRAY`",
          },
          {
            "name": "gender",
            "type": "`$STRING`",
          },
          {
            "name": "hair_color",
            "type": "`$STRING`",
          },
          {
            "name": "height",
            "type": "`$STRING`",
          },
          {
            "name": "homeworld",
            "type": "`$STRING`",
          },
          {
            "name": "mass",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "skin_color",
            "type": "`$STRING`",
          },
          {
            "name": "species",
            "type": "`$ARRAY`",
          },
          {
            "name": "starships",
            "type": "`$ARRAY`",
          },
          {
            "name": "url",
            "type": "`$STRING`",
          },
          {
            "name": "vehicles",
            "type": "`$ARRAY`",
          },
        ],
        "name": "person",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "search",
                      "orig": "search",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/people",
                "parts": [
                  "people",
                ],
                "select": {
                  "exist": [
                    "page",
                    "search",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/people/{id}",
                "parts": [
                  "people",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "planet": {
        "fields": [
          {
            "name": "climate",
            "type": "`$STRING`",
          },
          {
            "name": "created",
            "type": "`$STRING`",
          },
          {
            "name": "diameter",
            "type": "`$STRING`",
          },
          {
            "name": "edited",
            "type": "`$STRING`",
          },
          {
            "name": "films",
            "type": "`$ARRAY`",
          },
          {
            "name": "gravity",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "orbital_period",
            "type": "`$STRING`",
          },
          {
            "name": "population",
            "type": "`$STRING`",
          },
          {
            "name": "residents",
            "type": "`$ARRAY`",
          },
          {
            "name": "rotation_period",
            "type": "`$STRING`",
          },
          {
            "name": "surface_water",
            "type": "`$STRING`",
          },
          {
            "name": "terrain",
            "type": "`$STRING`",
          },
          {
            "name": "url",
            "type": "`$STRING`",
          },
        ],
        "name": "planet",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "search",
                      "orig": "search",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/planets",
                "parts": [
                  "planets",
                ],
                "select": {
                  "exist": [
                    "page",
                    "search",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/planets/{id}",
                "parts": [
                  "planets",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "species": {
        "fields": [
          {
            "name": "average_height",
            "type": "`$STRING`",
          },
          {
            "name": "average_lifespan",
            "type": "`$STRING`",
          },
          {
            "name": "classification",
            "type": "`$STRING`",
          },
          {
            "name": "created",
            "type": "`$STRING`",
          },
          {
            "name": "designation",
            "type": "`$STRING`",
          },
          {
            "name": "edited",
            "type": "`$STRING`",
          },
          {
            "name": "eye_colors",
            "type": "`$STRING`",
          },
          {
            "name": "films",
            "type": "`$ARRAY`",
          },
          {
            "name": "hair_colors",
            "type": "`$STRING`",
          },
          {
            "name": "homeworld",
            "type": "`$STRING`",
          },
          {
            "name": "language",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "people",
            "type": "`$ARRAY`",
          },
          {
            "name": "skin_colors",
            "type": "`$STRING`",
          },
          {
            "name": "url",
            "type": "`$STRING`",
          },
        ],
        "name": "species",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "search",
                      "orig": "search",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/species",
                "parts": [
                  "species",
                ],
                "select": {
                  "exist": [
                    "page",
                    "search",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/species/{id}",
                "parts": [
                  "species",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "starship": {
        "fields": [
          {
            "name": "MGLT",
            "type": "`$STRING`",
          },
          {
            "name": "cargo_capacity",
            "type": "`$STRING`",
          },
          {
            "name": "consumables",
            "type": "`$STRING`",
          },
          {
            "name": "cost_in_credits",
            "type": "`$STRING`",
          },
          {
            "name": "created",
            "type": "`$STRING`",
          },
          {
            "name": "crew",
            "type": "`$STRING`",
          },
          {
            "name": "edited",
            "type": "`$STRING`",
          },
          {
            "name": "films",
            "type": "`$ARRAY`",
          },
          {
            "name": "hyperdrive_rating",
            "type": "`$STRING`",
          },
          {
            "name": "length",
            "type": "`$STRING`",
          },
          {
            "name": "manufacturer",
            "type": "`$STRING`",
          },
          {
            "name": "max_atmosphering_speed",
            "type": "`$STRING`",
          },
          {
            "name": "model",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "passengers",
            "type": "`$STRING`",
          },
          {
            "name": "pilots",
            "type": "`$ARRAY`",
          },
          {
            "name": "starship_class",
            "type": "`$STRING`",
          },
          {
            "name": "url",
            "type": "`$STRING`",
          },
        ],
        "name": "starship",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "search",
                      "orig": "search",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/starships",
                "parts": [
                  "starships",
                ],
                "select": {
                  "exist": [
                    "page",
                    "search",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/starships/{id}",
                "parts": [
                  "starships",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "vehicle": {
        "fields": [
          {
            "name": "cargo_capacity",
            "type": "`$STRING`",
          },
          {
            "name": "consumables",
            "type": "`$STRING`",
          },
          {
            "name": "cost_in_credits",
            "type": "`$STRING`",
          },
          {
            "name": "created",
            "type": "`$STRING`",
          },
          {
            "name": "crew",
            "type": "`$STRING`",
          },
          {
            "name": "edited",
            "type": "`$STRING`",
          },
          {
            "name": "films",
            "type": "`$ARRAY`",
          },
          {
            "name": "length",
            "type": "`$STRING`",
          },
          {
            "name": "manufacturer",
            "type": "`$STRING`",
          },
          {
            "name": "max_atmosphering_speed",
            "type": "`$STRING`",
          },
          {
            "name": "model",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "passengers",
            "type": "`$STRING`",
          },
          {
            "name": "pilots",
            "type": "`$ARRAY`",
          },
          {
            "name": "url",
            "type": "`$STRING`",
          },
          {
            "name": "vehicle_class",
            "type": "`$STRING`",
          },
        ],
        "name": "vehicle",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "search",
                      "orig": "search",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/vehicles",
                "parts": [
                  "vehicles",
                ],
                "select": {
                  "exist": [
                    "page",
                    "search",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/vehicles/{id}",
                "parts": [
                  "vehicles",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
