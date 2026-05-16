# StarWars SDK configuration

module StarWarsConfig
  def self.make_config
    {
      "main" => {
        "name" => "StarWars",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://swapi.dev/api",
        "auth" => {
          "prefix" => "Bearer",
        },
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "film" => {},
          "people_list" => {},
          "person" => {},
          "planet" => {},
          "species" => {},
          "starship" => {},
          "vehicle" => {},
        },
      },
      "entity" => {
        "film" => {
          "fields" => [
            {
              "name" => "character",
              "req" => false,
              "type" => "`$ARRAY`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "created",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 1,
            },
            {
              "name" => "director",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 2,
            },
            {
              "name" => "edited",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 3,
            },
            {
              "name" => "episode_id",
              "req" => false,
              "type" => "`$INTEGER`",
              "active" => true,
              "index$" => 4,
            },
            {
              "name" => "opening_crawl",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 5,
            },
            {
              "name" => "planet",
              "req" => false,
              "type" => "`$ARRAY`",
              "active" => true,
              "index$" => 6,
            },
            {
              "name" => "producer",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 7,
            },
            {
              "name" => "release_date",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 8,
            },
            {
              "name" => "species",
              "req" => false,
              "type" => "`$ARRAY`",
              "active" => true,
              "index$" => 9,
            },
            {
              "name" => "starship",
              "req" => false,
              "type" => "`$ARRAY`",
              "active" => true,
              "index$" => 10,
            },
            {
              "name" => "title",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 11,
            },
            {
              "name" => "url",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 12,
            },
            {
              "name" => "vehicle",
              "req" => false,
              "type" => "`$ARRAY`",
              "active" => true,
              "index$" => 13,
            },
          ],
          "name" => "film",
          "op" => {
            "list" => {
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => 1,
                        "kind" => "query",
                        "name" => "page",
                        "orig" => "page",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "search",
                        "orig" => "search",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/films",
                  "parts" => [
                    "films",
                  ],
                  "select" => {
                    "exist" => [
                      "page",
                      "search",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "list",
            },
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/films/{id}",
                  "parts" => [
                    "films",
                    "{id}",
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "people_list" => {
          "fields" => [],
          "name" => "people_list",
          "op" => {},
          "relations" => {
            "ancestors" => [],
          },
        },
        "person" => {
          "fields" => [
            {
              "name" => "birth_year",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "created",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 1,
            },
            {
              "name" => "edited",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 2,
            },
            {
              "name" => "eye_color",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 3,
            },
            {
              "name" => "film",
              "req" => false,
              "type" => "`$ARRAY`",
              "active" => true,
              "index$" => 4,
            },
            {
              "name" => "gender",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 5,
            },
            {
              "name" => "hair_color",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 6,
            },
            {
              "name" => "height",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 7,
            },
            {
              "name" => "homeworld",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 8,
            },
            {
              "name" => "mass",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 9,
            },
            {
              "name" => "name",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 10,
            },
            {
              "name" => "skin_color",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 11,
            },
            {
              "name" => "species",
              "req" => false,
              "type" => "`$ARRAY`",
              "active" => true,
              "index$" => 12,
            },
            {
              "name" => "starship",
              "req" => false,
              "type" => "`$ARRAY`",
              "active" => true,
              "index$" => 13,
            },
            {
              "name" => "url",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 14,
            },
            {
              "name" => "vehicle",
              "req" => false,
              "type" => "`$ARRAY`",
              "active" => true,
              "index$" => 15,
            },
          ],
          "name" => "person",
          "op" => {
            "list" => {
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => 1,
                        "kind" => "query",
                        "name" => "page",
                        "orig" => "page",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "search",
                        "orig" => "search",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/people",
                  "parts" => [
                    "people",
                  ],
                  "select" => {
                    "exist" => [
                      "page",
                      "search",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "list",
            },
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/people/{id}",
                  "parts" => [
                    "people",
                    "{id}",
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "planet" => {
          "fields" => [
            {
              "name" => "climate",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "created",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 1,
            },
            {
              "name" => "diameter",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 2,
            },
            {
              "name" => "edited",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 3,
            },
            {
              "name" => "film",
              "req" => false,
              "type" => "`$ARRAY`",
              "active" => true,
              "index$" => 4,
            },
            {
              "name" => "gravity",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 5,
            },
            {
              "name" => "name",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 6,
            },
            {
              "name" => "orbital_period",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 7,
            },
            {
              "name" => "population",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 8,
            },
            {
              "name" => "resident",
              "req" => false,
              "type" => "`$ARRAY`",
              "active" => true,
              "index$" => 9,
            },
            {
              "name" => "rotation_period",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 10,
            },
            {
              "name" => "surface_water",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 11,
            },
            {
              "name" => "terrain",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 12,
            },
            {
              "name" => "url",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 13,
            },
          ],
          "name" => "planet",
          "op" => {
            "list" => {
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => 1,
                        "kind" => "query",
                        "name" => "page",
                        "orig" => "page",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "search",
                        "orig" => "search",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/planets",
                  "parts" => [
                    "planets",
                  ],
                  "select" => {
                    "exist" => [
                      "page",
                      "search",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "list",
            },
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/planets/{id}",
                  "parts" => [
                    "planets",
                    "{id}",
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "species" => {
          "fields" => [
            {
              "name" => "average_height",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "average_lifespan",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 1,
            },
            {
              "name" => "classification",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 2,
            },
            {
              "name" => "created",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 3,
            },
            {
              "name" => "designation",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 4,
            },
            {
              "name" => "edited",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 5,
            },
            {
              "name" => "eye_color",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 6,
            },
            {
              "name" => "film",
              "req" => false,
              "type" => "`$ARRAY`",
              "active" => true,
              "index$" => 7,
            },
            {
              "name" => "hair_color",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 8,
            },
            {
              "name" => "homeworld",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 9,
            },
            {
              "name" => "language",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 10,
            },
            {
              "name" => "name",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 11,
            },
            {
              "name" => "person",
              "req" => false,
              "type" => "`$ARRAY`",
              "active" => true,
              "index$" => 12,
            },
            {
              "name" => "skin_color",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 13,
            },
            {
              "name" => "url",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 14,
            },
          ],
          "name" => "species",
          "op" => {
            "list" => {
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => 1,
                        "kind" => "query",
                        "name" => "page",
                        "orig" => "page",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "search",
                        "orig" => "search",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/species",
                  "parts" => [
                    "species",
                  ],
                  "select" => {
                    "exist" => [
                      "page",
                      "search",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "list",
            },
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/species/{id}",
                  "parts" => [
                    "species",
                    "{id}",
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "starship" => {
          "fields" => [
            {
              "name" => "cargo_capacity",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "consumable",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 1,
            },
            {
              "name" => "cost_in_credit",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 2,
            },
            {
              "name" => "created",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 3,
            },
            {
              "name" => "crew",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 4,
            },
            {
              "name" => "edited",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 5,
            },
            {
              "name" => "film",
              "req" => false,
              "type" => "`$ARRAY`",
              "active" => true,
              "index$" => 6,
            },
            {
              "name" => "hyperdrive_rating",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 7,
            },
            {
              "name" => "length",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 8,
            },
            {
              "name" => "manufacturer",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 9,
            },
            {
              "name" => "max_atmosphering_speed",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 10,
            },
            {
              "name" => "mglt",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 11,
            },
            {
              "name" => "model",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 12,
            },
            {
              "name" => "name",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 13,
            },
            {
              "name" => "passenger",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 14,
            },
            {
              "name" => "pilot",
              "req" => false,
              "type" => "`$ARRAY`",
              "active" => true,
              "index$" => 15,
            },
            {
              "name" => "starship_class",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 16,
            },
            {
              "name" => "url",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 17,
            },
          ],
          "name" => "starship",
          "op" => {
            "list" => {
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => 1,
                        "kind" => "query",
                        "name" => "page",
                        "orig" => "page",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "search",
                        "orig" => "search",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/starships",
                  "parts" => [
                    "starships",
                  ],
                  "select" => {
                    "exist" => [
                      "page",
                      "search",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "list",
            },
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/starships/{id}",
                  "parts" => [
                    "starships",
                    "{id}",
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "vehicle" => {
          "fields" => [
            {
              "name" => "cargo_capacity",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "consumable",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 1,
            },
            {
              "name" => "cost_in_credit",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 2,
            },
            {
              "name" => "created",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 3,
            },
            {
              "name" => "crew",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 4,
            },
            {
              "name" => "edited",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 5,
            },
            {
              "name" => "film",
              "req" => false,
              "type" => "`$ARRAY`",
              "active" => true,
              "index$" => 6,
            },
            {
              "name" => "length",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 7,
            },
            {
              "name" => "manufacturer",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 8,
            },
            {
              "name" => "max_atmosphering_speed",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 9,
            },
            {
              "name" => "model",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 10,
            },
            {
              "name" => "name",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 11,
            },
            {
              "name" => "passenger",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 12,
            },
            {
              "name" => "pilot",
              "req" => false,
              "type" => "`$ARRAY`",
              "active" => true,
              "index$" => 13,
            },
            {
              "name" => "url",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 14,
            },
            {
              "name" => "vehicle_class",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 15,
            },
          ],
          "name" => "vehicle",
          "op" => {
            "list" => {
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => 1,
                        "kind" => "query",
                        "name" => "page",
                        "orig" => "page",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "search",
                        "orig" => "search",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/vehicles",
                  "parts" => [
                    "vehicles",
                  ],
                  "select" => {
                    "exist" => [
                      "page",
                      "search",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "list",
            },
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/vehicles/{id}",
                  "parts" => [
                    "vehicles",
                    "{id}",
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    StarWarsFeatures.make_feature(name)
  end
end
