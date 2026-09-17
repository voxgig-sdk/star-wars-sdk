
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'StarWars',
        slug: "star-wars",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://swapi.dev/api",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        film: {
        },
  
        people_list: {
        },
  
        person: {
        },
  
        planet: {
        },
  
        species: {
        },
  
        starship: {
        },
  
        vehicle: {
        },
  
    }
  }


  entity = {
    "film": {
      "fields": [
        {
          "name": "characters",
          "short": "An array of people resource URLs that are in this film",
          "type": "`$ARRAY`"
        },
        {
          "format": "date-time",
          "name": "created",
          "short": "The ISO 8601 date format of the time that this resource was created",
          "type": "`$STRING`"
        },
        {
          "name": "director",
          "short": "The name of the director of this film",
          "type": "`$STRING`"
        },
        {
          "format": "date-time",
          "name": "edited",
          "short": "The ISO 8601 date format of the time that this resource was edited",
          "type": "`$STRING`"
        },
        {
          "name": "episode_id",
          "short": "The episode number of this film",
          "type": "`$INTEGER`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "opening_crawl",
          "short": "The opening paragraphs at the beginning of this film",
          "type": "`$STRING`"
        },
        {
          "name": "planets",
          "short": "An array of planet resource URLs that are in this film",
          "type": "`$ARRAY`"
        },
        {
          "name": "producer",
          "short": "The name(s) of the producer(s) of this film",
          "type": "`$STRING`"
        },
        {
          "format": "date",
          "name": "release_date",
          "short": "The release date of this film",
          "type": "`$STRING`"
        },
        {
          "name": "species",
          "short": "An array of species resource URLs that are in this film",
          "type": "`$ARRAY`"
        },
        {
          "name": "starships",
          "short": "An array of starship resource URLs that are in this film",
          "type": "`$ARRAY`"
        },
        {
          "name": "title",
          "short": "The title of this film",
          "type": "`$STRING`"
        },
        {
          "name": "url",
          "short": "The hypermedia URL of this resource",
          "type": "`$STRING`"
        },
        {
          "name": "vehicles",
          "short": "An array of vehicle resource URLs that are in this film",
          "type": "`$ARRAY`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
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
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "search",
                    "orig": "search",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/films",
              "segments": [
                {
                  "lit": "films"
                }
              ],
              "select": {
                "exist": [
                  "page",
                  "search"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.results`"
              },
              "parts": [
                "films"
              ]
            }
          ]
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
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/films/{id}",
              "segments": [
                {
                  "lit": "films"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "films",
                "{id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "people_list": {
      "fields": [],
      "name": "people_list",
      "op": {},
      "relations": {
        "ancestors": []
      }
    },
    "person": {
      "fields": [
        {
          "name": "birth_year",
          "short": "The birth year of the person, using the in-universe standard of BBY or ABY",
          "type": "`$STRING`"
        },
        {
          "format": "date-time",
          "name": "created",
          "short": "The ISO 8601 date format of the time that this resource was created",
          "type": "`$STRING`"
        },
        {
          "format": "date-time",
          "name": "edited",
          "short": "The ISO 8601 date format of the time that this resource was edited",
          "type": "`$STRING`"
        },
        {
          "name": "eye_color",
          "short": "The eye color of this person",
          "type": "`$STRING`"
        },
        {
          "name": "films",
          "short": "An array of film resource URLs that this person has been in",
          "type": "`$ARRAY`"
        },
        {
          "name": "gender",
          "short": "The gender of this person",
          "type": "`$STRING`"
        },
        {
          "name": "hair_color",
          "short": "The hair color of this person",
          "type": "`$STRING`"
        },
        {
          "name": "height",
          "short": "The height of the person in centimeters",
          "type": "`$STRING`"
        },
        {
          "name": "homeworld",
          "short": "The URL of the planet resource that this person was born on",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "mass",
          "short": "The mass of the person in kilograms",
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "short": "The name of this person",
          "type": "`$STRING`"
        },
        {
          "name": "skin_color",
          "short": "The skin color of this person",
          "type": "`$STRING`"
        },
        {
          "name": "species",
          "short": "An array of species resource URLs that this person belongs to",
          "type": "`$ARRAY`"
        },
        {
          "name": "starships",
          "short": "An array of starship resource URLs that this person has piloted",
          "type": "`$ARRAY`"
        },
        {
          "name": "url",
          "short": "The hypermedia URL of this resource",
          "type": "`$STRING`"
        },
        {
          "name": "vehicles",
          "short": "An array of vehicle resource URLs that this person has piloted",
          "type": "`$ARRAY`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
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
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "search",
                    "orig": "search",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/people",
              "segments": [
                {
                  "lit": "people"
                }
              ],
              "select": {
                "exist": [
                  "page",
                  "search"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.results`"
              },
              "parts": [
                "people"
              ]
            }
          ]
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
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/people/{id}",
              "segments": [
                {
                  "lit": "people"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "people",
                "{id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "planet": {
      "fields": [
        {
          "name": "climate",
          "short": "The climate of this planet",
          "type": "`$STRING`"
        },
        {
          "format": "date-time",
          "name": "created",
          "short": "The ISO 8601 date format of the time that this resource was created",
          "type": "`$STRING`"
        },
        {
          "name": "diameter",
          "short": "The diameter of this planet in kilometers",
          "type": "`$STRING`"
        },
        {
          "format": "date-time",
          "name": "edited",
          "short": "The ISO 8601 date format of the time that this resource was edited",
          "type": "`$STRING`"
        },
        {
          "name": "films",
          "short": "An array of Film URL Resources that this planet has appeared in",
          "type": "`$ARRAY`"
        },
        {
          "name": "gravity",
          "short": "A number denoting the gravity of this planet",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "short": "The name of this planet",
          "type": "`$STRING`"
        },
        {
          "name": "orbital_period",
          "short": "The number of standard days it takes for this planet to complete a single orbit of its local star",
          "type": "`$STRING`"
        },
        {
          "name": "population",
          "short": "The average population of sentient beings inhabiting this planet",
          "type": "`$STRING`"
        },
        {
          "name": "residents",
          "short": "An array of People URL Resources that live on this planet",
          "type": "`$ARRAY`"
        },
        {
          "name": "rotation_period",
          "short": "The number of standard hours it takes for this planet to complete a single rotation on its axis",
          "type": "`$STRING`"
        },
        {
          "name": "surface_water",
          "short": "The percentage of the planet surface that is naturally occurring water",
          "type": "`$STRING`"
        },
        {
          "name": "terrain",
          "short": "The terrain of this planet",
          "type": "`$STRING`"
        },
        {
          "name": "url",
          "short": "The hypermedia URL of this resource",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
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
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "search",
                    "orig": "search",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/planets",
              "segments": [
                {
                  "lit": "planets"
                }
              ],
              "select": {
                "exist": [
                  "page",
                  "search"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.results`"
              },
              "parts": [
                "planets"
              ]
            }
          ]
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
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/planets/{id}",
              "segments": [
                {
                  "lit": "planets"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "planets",
                "{id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "species": {
      "fields": [
        {
          "name": "average_height",
          "short": "The average height of this species in centimeters",
          "type": "`$STRING`"
        },
        {
          "name": "average_lifespan",
          "short": "The average lifespan of this species in years",
          "type": "`$STRING`"
        },
        {
          "name": "classification",
          "short": "The classification of this species",
          "type": "`$STRING`"
        },
        {
          "format": "date-time",
          "name": "created",
          "short": "The ISO 8601 date format of the time that this resource was created",
          "type": "`$STRING`"
        },
        {
          "name": "designation",
          "short": "The designation of this species",
          "type": "`$STRING`"
        },
        {
          "format": "date-time",
          "name": "edited",
          "short": "The ISO 8601 date format of the time that this resource was edited",
          "type": "`$STRING`"
        },
        {
          "name": "eye_colors",
          "short": "A comma-separated string of common eye colors for this species",
          "type": "`$STRING`"
        },
        {
          "name": "films",
          "short": "An array of Film URL Resources that this species has appeared in",
          "type": "`$ARRAY`"
        },
        {
          "name": "hair_colors",
          "short": "A comma-separated string of common hair colors for this species",
          "type": "`$STRING`"
        },
        {
          "name": "homeworld",
          "short": "The URL of a planet resource that is the homeworld of this species",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "language",
          "short": "The language commonly spoken by this species",
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "short": "The name of this species",
          "type": "`$STRING`"
        },
        {
          "name": "people",
          "short": "An array of People URL Resources that are a part of this species",
          "type": "`$ARRAY`"
        },
        {
          "name": "skin_colors",
          "short": "A comma-separated string of common skin colors for this species",
          "type": "`$STRING`"
        },
        {
          "name": "url",
          "short": "The hypermedia URL of this resource",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
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
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "search",
                    "orig": "search",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/species",
              "segments": [
                {
                  "lit": "species"
                }
              ],
              "select": {
                "exist": [
                  "page",
                  "search"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.results`"
              },
              "parts": [
                "species"
              ]
            }
          ]
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
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/species/{id}",
              "segments": [
                {
                  "lit": "species"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "species",
                "{id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "starship": {
      "fields": [
        {
          "name": "MGLT",
          "short": "The Maximum number of Megalights this starship can travel in a standard hour",
          "type": "`$STRING`"
        },
        {
          "name": "cargo_capacity",
          "short": "The maximum number of kilograms that this starship can transport",
          "type": "`$STRING`"
        },
        {
          "name": "consumables",
          "short": "The maximum length of time that this starship can provide consumables for its entire crew without having to resupply",
          "type": "`$STRING`"
        },
        {
          "name": "cost_in_credits",
          "short": "The cost of this starship new, in galactic credits",
          "type": "`$STRING`"
        },
        {
          "format": "date-time",
          "name": "created",
          "short": "The ISO 8601 date format of the time that this resource was created",
          "type": "`$STRING`"
        },
        {
          "name": "crew",
          "short": "The number of personnel needed to run or pilot this starship",
          "type": "`$STRING`"
        },
        {
          "format": "date-time",
          "name": "edited",
          "short": "The ISO 8601 date format of the time that this resource was edited",
          "type": "`$STRING`"
        },
        {
          "name": "films",
          "short": "An array of Film URL Resources that this starship has appeared in",
          "type": "`$ARRAY`"
        },
        {
          "name": "hyperdrive_rating",
          "short": "The class of this starships hyperdrive",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "length",
          "short": "The length of this starship in meters",
          "type": "`$STRING`"
        },
        {
          "name": "manufacturer",
          "short": "The manufacturer of this starship",
          "type": "`$STRING`"
        },
        {
          "name": "max_atmosphering_speed",
          "short": "The maximum speed of this starship in atmosphere",
          "type": "`$STRING`"
        },
        {
          "name": "model",
          "short": "The model or official name of this starship",
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "short": "The name of this starship",
          "type": "`$STRING`"
        },
        {
          "name": "passengers",
          "short": "The number of non-essential people this starship can transport",
          "type": "`$STRING`"
        },
        {
          "name": "pilots",
          "short": "An array of People URL Resources that this starship has been piloted by",
          "type": "`$ARRAY`"
        },
        {
          "name": "starship_class",
          "short": "The class of this starship",
          "type": "`$STRING`"
        },
        {
          "name": "url",
          "short": "The hypermedia URL of this resource",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
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
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "search",
                    "orig": "search",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/starships",
              "segments": [
                {
                  "lit": "starships"
                }
              ],
              "select": {
                "exist": [
                  "page",
                  "search"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.results`"
              },
              "parts": [
                "starships"
              ]
            }
          ]
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
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/starships/{id}",
              "segments": [
                {
                  "lit": "starships"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "starships",
                "{id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "vehicle": {
      "fields": [
        {
          "name": "cargo_capacity",
          "short": "The maximum number of kilograms that this vehicle can transport",
          "type": "`$STRING`"
        },
        {
          "name": "consumables",
          "short": "The maximum length of time that this vehicle can provide consumables for its entire crew without having to resupply",
          "type": "`$STRING`"
        },
        {
          "name": "cost_in_credits",
          "short": "The cost of this vehicle new, in galactic credits",
          "type": "`$STRING`"
        },
        {
          "format": "date-time",
          "name": "created",
          "short": "The ISO 8601 date format of the time that this resource was created",
          "type": "`$STRING`"
        },
        {
          "name": "crew",
          "short": "The number of personnel needed to run or pilot this vehicle",
          "type": "`$STRING`"
        },
        {
          "format": "date-time",
          "name": "edited",
          "short": "The ISO 8601 date format of the time that this resource was edited",
          "type": "`$STRING`"
        },
        {
          "name": "films",
          "short": "An array of Film URL Resources that this vehicle has appeared in",
          "type": "`$ARRAY`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "length",
          "short": "The length of this vehicle in meters",
          "type": "`$STRING`"
        },
        {
          "name": "manufacturer",
          "short": "The manufacturer of this vehicle",
          "type": "`$STRING`"
        },
        {
          "name": "max_atmosphering_speed",
          "short": "The maximum speed of this vehicle in atmosphere",
          "type": "`$STRING`"
        },
        {
          "name": "model",
          "short": "The model or official name of this vehicle",
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "short": "The name of this vehicle",
          "type": "`$STRING`"
        },
        {
          "name": "passengers",
          "short": "The number of non-essential people this vehicle can transport",
          "type": "`$STRING`"
        },
        {
          "name": "pilots",
          "short": "An array of People URL Resources that this vehicle has been piloted by",
          "type": "`$ARRAY`"
        },
        {
          "name": "url",
          "short": "The hypermedia URL of this resource",
          "type": "`$STRING`"
        },
        {
          "name": "vehicle_class",
          "short": "The class of this vehicle",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
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
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "search",
                    "orig": "search",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/vehicles",
              "segments": [
                {
                  "lit": "vehicles"
                }
              ],
              "select": {
                "exist": [
                  "page",
                  "search"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.results`"
              },
              "parts": [
                "vehicles"
              ]
            }
          ]
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
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/vehicles/{id}",
              "segments": [
                {
                  "lit": "vehicles"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "vehicles",
                "{id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

