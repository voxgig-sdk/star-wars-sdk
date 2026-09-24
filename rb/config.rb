# StarWars SDK configuration

module StarWarsConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "StarWars",
        "slug" => "star-wars",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://swapi.dev/api",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "film" => {},
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
              "name" => "characters",
              "title" => "Characters",
              "type" => "`$ARRAY`",
              "short" => "An array of people resource URLs that are in this film",
            },
            {
              "name" => "created",
              "title" => "Created",
              "type" => "`$STRING`",
              "short" => "The ISO 8601 date format of the time that this resource was created",
              "format" => "date-time",
            },
            {
              "name" => "director",
              "title" => "Director",
              "type" => "`$STRING`",
              "short" => "The name of the director of this film",
            },
            {
              "name" => "edited",
              "title" => "Edited",
              "type" => "`$STRING`",
              "short" => "The ISO 8601 date format of the time that this resource was edited",
              "format" => "date-time",
            },
            {
              "name" => "episode_id",
              "title" => "Episode Id",
              "type" => "`$INTEGER`",
              "short" => "The episode number of this film",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
            },
            {
              "name" => "opening_crawl",
              "title" => "Opening Crawl",
              "type" => "`$STRING`",
              "short" => "The opening paragraphs at the beginning of this film",
            },
            {
              "name" => "planets",
              "title" => "Planets",
              "type" => "`$ARRAY`",
              "short" => "An array of planet resource URLs that are in this film",
            },
            {
              "name" => "producer",
              "title" => "Producer",
              "type" => "`$STRING`",
              "short" => "The name(s) of the producer(s) of this film",
            },
            {
              "name" => "release_date",
              "title" => "Release Date",
              "type" => "`$STRING`",
              "short" => "The release date of this film",
              "format" => "date",
            },
            {
              "name" => "species",
              "title" => "Species",
              "type" => "`$ARRAY`",
              "short" => "An array of species resource URLs that are in this film",
            },
            {
              "name" => "starships",
              "title" => "Starships",
              "type" => "`$ARRAY`",
              "short" => "An array of starship resource URLs that are in this film",
            },
            {
              "name" => "title",
              "title" => "Title",
              "type" => "`$STRING`",
              "short" => "The title of this film",
            },
            {
              "name" => "url",
              "title" => "Url",
              "type" => "`$STRING`",
              "short" => "The hypermedia URL of this resource",
            },
            {
              "name" => "vehicles",
              "title" => "Vehicles",
              "type" => "`$ARRAY`",
              "short" => "An array of vehicle resource URLs that are in this film",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "film",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/films",
                  "segments" => [
                    {
                      "lit" => "films",
                    },
                  ],
                  "parts" => [
                    "films",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.results`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "page",
                        "orig" => "page",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 1,
                      },
                      {
                        "name" => "search",
                        "orig" => "search",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "page",
                      "search",
                    ],
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/films/{id}",
                  "segments" => [
                    {
                      "lit" => "films",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "films",
                    "{id}",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "id",
                        "type" => "`$INTEGER`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "person" => {
          "fields" => [
            {
              "name" => "birth_year",
              "title" => "Birth Year",
              "type" => "`$STRING`",
              "short" => "The birth year of the person, using the in-universe standard of BBY or ABY",
            },
            {
              "name" => "created",
              "title" => "Created",
              "type" => "`$STRING`",
              "short" => "The ISO 8601 date format of the time that this resource was created",
              "format" => "date-time",
            },
            {
              "name" => "edited",
              "title" => "Edited",
              "type" => "`$STRING`",
              "short" => "The ISO 8601 date format of the time that this resource was edited",
              "format" => "date-time",
            },
            {
              "name" => "eye_color",
              "title" => "Eye Color",
              "type" => "`$STRING`",
              "short" => "The eye color of this person",
            },
            {
              "name" => "films",
              "title" => "Films",
              "type" => "`$ARRAY`",
              "short" => "An array of film resource URLs that this person has been in",
            },
            {
              "name" => "gender",
              "title" => "Gender",
              "type" => "`$STRING`",
              "short" => "The gender of this person",
            },
            {
              "name" => "hair_color",
              "title" => "Hair Color",
              "type" => "`$STRING`",
              "short" => "The hair color of this person",
            },
            {
              "name" => "height",
              "title" => "Height",
              "type" => "`$STRING`",
              "short" => "The height of the person in centimeters",
            },
            {
              "name" => "homeworld",
              "title" => "Homeworld",
              "type" => "`$STRING`",
              "short" => "The URL of the planet resource that this person was born on",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
            },
            {
              "name" => "mass",
              "title" => "Mass",
              "type" => "`$STRING`",
              "short" => "The mass of the person in kilograms",
            },
            {
              "name" => "name",
              "title" => "Name",
              "type" => "`$STRING`",
              "short" => "The name of this person",
            },
            {
              "name" => "skin_color",
              "title" => "Skin Color",
              "type" => "`$STRING`",
              "short" => "The skin color of this person",
            },
            {
              "name" => "species",
              "title" => "Species",
              "type" => "`$ARRAY`",
              "short" => "An array of species resource URLs that this person belongs to",
            },
            {
              "name" => "starships",
              "title" => "Starships",
              "type" => "`$ARRAY`",
              "short" => "An array of starship resource URLs that this person has piloted",
            },
            {
              "name" => "url",
              "title" => "Url",
              "type" => "`$STRING`",
              "short" => "The hypermedia URL of this resource",
            },
            {
              "name" => "vehicles",
              "title" => "Vehicles",
              "type" => "`$ARRAY`",
              "short" => "An array of vehicle resource URLs that this person has piloted",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "person",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/people",
                  "segments" => [
                    {
                      "lit" => "people",
                    },
                  ],
                  "parts" => [
                    "people",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.results`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "page",
                        "orig" => "page",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 1,
                      },
                      {
                        "name" => "search",
                        "orig" => "search",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "page",
                      "search",
                    ],
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/people/{id}",
                  "segments" => [
                    {
                      "lit" => "people",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "people",
                    "{id}",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "id",
                        "type" => "`$INTEGER`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                },
              ],
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
              "title" => "Climate",
              "type" => "`$STRING`",
              "short" => "The climate of this planet",
            },
            {
              "name" => "created",
              "title" => "Created",
              "type" => "`$STRING`",
              "short" => "The ISO 8601 date format of the time that this resource was created",
              "format" => "date-time",
            },
            {
              "name" => "diameter",
              "title" => "Diameter",
              "type" => "`$STRING`",
              "short" => "The diameter of this planet in kilometers",
            },
            {
              "name" => "edited",
              "title" => "Edited",
              "type" => "`$STRING`",
              "short" => "The ISO 8601 date format of the time that this resource was edited",
              "format" => "date-time",
            },
            {
              "name" => "films",
              "title" => "Films",
              "type" => "`$ARRAY`",
              "short" => "An array of Film URL Resources that this planet has appeared in",
            },
            {
              "name" => "gravity",
              "title" => "Gravity",
              "type" => "`$STRING`",
              "short" => "A number denoting the gravity of this planet",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "title" => "Name",
              "type" => "`$STRING`",
              "short" => "The name of this planet",
            },
            {
              "name" => "orbital_period",
              "title" => "Orbital Period",
              "type" => "`$STRING`",
              "short" => "The number of standard days it takes for this planet to complete a single orbit of its local star",
            },
            {
              "name" => "population",
              "title" => "Population",
              "type" => "`$STRING`",
              "short" => "The average population of sentient beings inhabiting this planet",
            },
            {
              "name" => "residents",
              "title" => "Residents",
              "type" => "`$ARRAY`",
              "short" => "An array of People URL Resources that live on this planet",
            },
            {
              "name" => "rotation_period",
              "title" => "Rotation Period",
              "type" => "`$STRING`",
              "short" => "The number of standard hours it takes for this planet to complete a single rotation on its axis",
            },
            {
              "name" => "surface_water",
              "title" => "Surface Water",
              "type" => "`$STRING`",
              "short" => "The percentage of the planet surface that is naturally occurring water",
            },
            {
              "name" => "terrain",
              "title" => "Terrain",
              "type" => "`$STRING`",
              "short" => "The terrain of this planet",
            },
            {
              "name" => "url",
              "title" => "Url",
              "type" => "`$STRING`",
              "short" => "The hypermedia URL of this resource",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "planet",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/planets",
                  "segments" => [
                    {
                      "lit" => "planets",
                    },
                  ],
                  "parts" => [
                    "planets",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.results`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "page",
                        "orig" => "page",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 1,
                      },
                      {
                        "name" => "search",
                        "orig" => "search",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "page",
                      "search",
                    ],
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/planets/{id}",
                  "segments" => [
                    {
                      "lit" => "planets",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "planets",
                    "{id}",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "id",
                        "type" => "`$INTEGER`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                },
              ],
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
              "title" => "Average Height",
              "type" => "`$STRING`",
              "short" => "The average height of this species in centimeters",
            },
            {
              "name" => "average_lifespan",
              "title" => "Average Lifespan",
              "type" => "`$STRING`",
              "short" => "The average lifespan of this species in years",
            },
            {
              "name" => "classification",
              "title" => "Classification",
              "type" => "`$STRING`",
              "short" => "The classification of this species",
            },
            {
              "name" => "created",
              "title" => "Created",
              "type" => "`$STRING`",
              "short" => "The ISO 8601 date format of the time that this resource was created",
              "format" => "date-time",
            },
            {
              "name" => "designation",
              "title" => "Designation",
              "type" => "`$STRING`",
              "short" => "The designation of this species",
            },
            {
              "name" => "edited",
              "title" => "Edited",
              "type" => "`$STRING`",
              "short" => "The ISO 8601 date format of the time that this resource was edited",
              "format" => "date-time",
            },
            {
              "name" => "eye_colors",
              "title" => "Eye Colors",
              "type" => "`$STRING`",
              "short" => "A comma-separated string of common eye colors for this species",
            },
            {
              "name" => "films",
              "title" => "Films",
              "type" => "`$ARRAY`",
              "short" => "An array of Film URL Resources that this species has appeared in",
            },
            {
              "name" => "hair_colors",
              "title" => "Hair Colors",
              "type" => "`$STRING`",
              "short" => "A comma-separated string of common hair colors for this species",
            },
            {
              "name" => "homeworld",
              "title" => "Homeworld",
              "type" => "`$STRING`",
              "short" => "The URL of a planet resource that is the homeworld of this species",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
            },
            {
              "name" => "language",
              "title" => "Language",
              "type" => "`$STRING`",
              "short" => "The language commonly spoken by this species",
            },
            {
              "name" => "name",
              "title" => "Name",
              "type" => "`$STRING`",
              "short" => "The name of this species",
            },
            {
              "name" => "people",
              "title" => "People",
              "type" => "`$ARRAY`",
              "short" => "An array of People URL Resources that are a part of this species",
            },
            {
              "name" => "skin_colors",
              "title" => "Skin Colors",
              "type" => "`$STRING`",
              "short" => "A comma-separated string of common skin colors for this species",
            },
            {
              "name" => "url",
              "title" => "Url",
              "type" => "`$STRING`",
              "short" => "The hypermedia URL of this resource",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "species",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/species",
                  "segments" => [
                    {
                      "lit" => "species",
                    },
                  ],
                  "parts" => [
                    "species",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.results`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "page",
                        "orig" => "page",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 1,
                      },
                      {
                        "name" => "search",
                        "orig" => "search",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "page",
                      "search",
                    ],
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/species/{id}",
                  "segments" => [
                    {
                      "lit" => "species",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "species",
                    "{id}",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "id",
                        "type" => "`$INTEGER`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "starship" => {
          "fields" => [
            {
              "name" => "MGLT",
              "title" => "Mglt",
              "type" => "`$STRING`",
              "short" => "The Maximum number of Megalights this starship can travel in a standard hour",
            },
            {
              "name" => "cargo_capacity",
              "title" => "Cargo Capacity",
              "type" => "`$STRING`",
              "short" => "The maximum number of kilograms that this starship can transport",
            },
            {
              "name" => "consumables",
              "title" => "Consumables",
              "type" => "`$STRING`",
              "short" => "The maximum length of time that this starship can provide consumables for its entire crew without having to resupply",
            },
            {
              "name" => "cost_in_credits",
              "title" => "Cost In Credits",
              "type" => "`$STRING`",
              "short" => "The cost of this starship new, in galactic credits",
            },
            {
              "name" => "created",
              "title" => "Created",
              "type" => "`$STRING`",
              "short" => "The ISO 8601 date format of the time that this resource was created",
              "format" => "date-time",
            },
            {
              "name" => "crew",
              "title" => "Crew",
              "type" => "`$STRING`",
              "short" => "The number of personnel needed to run or pilot this starship",
            },
            {
              "name" => "edited",
              "title" => "Edited",
              "type" => "`$STRING`",
              "short" => "The ISO 8601 date format of the time that this resource was edited",
              "format" => "date-time",
            },
            {
              "name" => "films",
              "title" => "Films",
              "type" => "`$ARRAY`",
              "short" => "An array of Film URL Resources that this starship has appeared in",
            },
            {
              "name" => "hyperdrive_rating",
              "title" => "Hyperdrive Rating",
              "type" => "`$STRING`",
              "short" => "The class of this starships hyperdrive",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
            },
            {
              "name" => "length",
              "title" => "Length",
              "type" => "`$STRING`",
              "short" => "The length of this starship in meters",
            },
            {
              "name" => "manufacturer",
              "title" => "Manufacturer",
              "type" => "`$STRING`",
              "short" => "The manufacturer of this starship",
            },
            {
              "name" => "max_atmosphering_speed",
              "title" => "Max Atmosphering Speed",
              "type" => "`$STRING`",
              "short" => "The maximum speed of this starship in atmosphere",
            },
            {
              "name" => "model",
              "title" => "Model",
              "type" => "`$STRING`",
              "short" => "The model or official name of this starship",
            },
            {
              "name" => "name",
              "title" => "Name",
              "type" => "`$STRING`",
              "short" => "The name of this starship",
            },
            {
              "name" => "passengers",
              "title" => "Passengers",
              "type" => "`$STRING`",
              "short" => "The number of non-essential people this starship can transport",
            },
            {
              "name" => "pilots",
              "title" => "Pilots",
              "type" => "`$ARRAY`",
              "short" => "An array of People URL Resources that this starship has been piloted by",
            },
            {
              "name" => "starship_class",
              "title" => "Starship Class",
              "type" => "`$STRING`",
              "short" => "The class of this starship",
            },
            {
              "name" => "url",
              "title" => "Url",
              "type" => "`$STRING`",
              "short" => "The hypermedia URL of this resource",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "starship",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/starships",
                  "segments" => [
                    {
                      "lit" => "starships",
                    },
                  ],
                  "parts" => [
                    "starships",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.results`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "page",
                        "orig" => "page",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 1,
                      },
                      {
                        "name" => "search",
                        "orig" => "search",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "page",
                      "search",
                    ],
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/starships/{id}",
                  "segments" => [
                    {
                      "lit" => "starships",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "starships",
                    "{id}",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "id",
                        "type" => "`$INTEGER`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                },
              ],
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
              "title" => "Cargo Capacity",
              "type" => "`$STRING`",
              "short" => "The maximum number of kilograms that this vehicle can transport",
            },
            {
              "name" => "consumables",
              "title" => "Consumables",
              "type" => "`$STRING`",
              "short" => "The maximum length of time that this vehicle can provide consumables for its entire crew without having to resupply",
            },
            {
              "name" => "cost_in_credits",
              "title" => "Cost In Credits",
              "type" => "`$STRING`",
              "short" => "The cost of this vehicle new, in galactic credits",
            },
            {
              "name" => "created",
              "title" => "Created",
              "type" => "`$STRING`",
              "short" => "The ISO 8601 date format of the time that this resource was created",
              "format" => "date-time",
            },
            {
              "name" => "crew",
              "title" => "Crew",
              "type" => "`$STRING`",
              "short" => "The number of personnel needed to run or pilot this vehicle",
            },
            {
              "name" => "edited",
              "title" => "Edited",
              "type" => "`$STRING`",
              "short" => "The ISO 8601 date format of the time that this resource was edited",
              "format" => "date-time",
            },
            {
              "name" => "films",
              "title" => "Films",
              "type" => "`$ARRAY`",
              "short" => "An array of Film URL Resources that this vehicle has appeared in",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
            },
            {
              "name" => "length",
              "title" => "Length",
              "type" => "`$STRING`",
              "short" => "The length of this vehicle in meters",
            },
            {
              "name" => "manufacturer",
              "title" => "Manufacturer",
              "type" => "`$STRING`",
              "short" => "The manufacturer of this vehicle",
            },
            {
              "name" => "max_atmosphering_speed",
              "title" => "Max Atmosphering Speed",
              "type" => "`$STRING`",
              "short" => "The maximum speed of this vehicle in atmosphere",
            },
            {
              "name" => "model",
              "title" => "Model",
              "type" => "`$STRING`",
              "short" => "The model or official name of this vehicle",
            },
            {
              "name" => "name",
              "title" => "Name",
              "type" => "`$STRING`",
              "short" => "The name of this vehicle",
            },
            {
              "name" => "passengers",
              "title" => "Passengers",
              "type" => "`$STRING`",
              "short" => "The number of non-essential people this vehicle can transport",
            },
            {
              "name" => "pilots",
              "title" => "Pilots",
              "type" => "`$ARRAY`",
              "short" => "An array of People URL Resources that this vehicle has been piloted by",
            },
            {
              "name" => "url",
              "title" => "Url",
              "type" => "`$STRING`",
              "short" => "The hypermedia URL of this resource",
            },
            {
              "name" => "vehicle_class",
              "title" => "Vehicle Class",
              "type" => "`$STRING`",
              "short" => "The class of this vehicle",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "vehicle",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/vehicles",
                  "segments" => [
                    {
                      "lit" => "vehicles",
                    },
                  ],
                  "parts" => [
                    "vehicles",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.results`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "page",
                        "orig" => "page",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 1,
                      },
                      {
                        "name" => "search",
                        "orig" => "search",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "page",
                      "search",
                    ],
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/vehicles/{id}",
                  "segments" => [
                    {
                      "lit" => "vehicles",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "vehicles",
                    "{id}",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "id",
                        "type" => "`$INTEGER`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                },
              ],
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
