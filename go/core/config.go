package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "StarWars",
			"slug": "star-wars",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://swapi.dev/api",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"film": map[string]any{},
				"people_list": map[string]any{},
				"person": map[string]any{},
				"planet": map[string]any{},
				"species": map[string]any{},
				"starship": map[string]any{},
				"vehicle": map[string]any{},
			},
		},
		"entity": map[string]any{
			"film": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "characters",
						"short": "An array of people resource URLs that are in this film",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "created",
						"short": "The ISO 8601 date format of the time that this resource was created",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "director",
						"short": "The name of the director of this film",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "edited",
						"short": "The ISO 8601 date format of the time that this resource was edited",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "episode_id",
						"short": "The episode number of this film",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "opening_crawl",
						"short": "The opening paragraphs at the beginning of this film",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "planets",
						"short": "An array of planet resource URLs that are in this film",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "producer",
						"short": "The name(s) of the producer(s) of this film",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "release_date",
						"short": "The release date of this film",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "species",
						"short": "An array of species resource URLs that are in this film",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "starships",
						"short": "An array of starship resource URLs that are in this film",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "title",
						"short": "The title of this film",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"short": "The hypermedia URL of this resource",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "vehicles",
						"short": "An array of vehicle resource URLs that are in this film",
						"type": "`$ARRAY`",
					},
				},
				"name": "film",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/films",
								"parts": []any{
									"films",
								},
								"select": map[string]any{
									"exist": []any{
										"page",
										"search",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/films/{id}",
								"parts": []any{
									"films",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"people_list": map[string]any{
				"fields": []any{},
				"name": "people_list",
				"op": map[string]any{},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"person": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "birth_year",
						"short": "The birth year of the person, using the in-universe standard of BBY or ABY",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "created",
						"short": "The ISO 8601 date format of the time that this resource was created",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "edited",
						"short": "The ISO 8601 date format of the time that this resource was edited",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "eye_color",
						"short": "The eye color of this person",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "films",
						"short": "An array of film resource URLs that this person has been in",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "gender",
						"short": "The gender of this person",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "hair_color",
						"short": "The hair color of this person",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "height",
						"short": "The height of the person in centimeters",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "homeworld",
						"short": "The URL of the planet resource that this person was born on",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "mass",
						"short": "The mass of the person in kilograms",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "The name of this person",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "skin_color",
						"short": "The skin color of this person",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "species",
						"short": "An array of species resource URLs that this person belongs to",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "starships",
						"short": "An array of starship resource URLs that this person has piloted",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "url",
						"short": "The hypermedia URL of this resource",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "vehicles",
						"short": "An array of vehicle resource URLs that this person has piloted",
						"type": "`$ARRAY`",
					},
				},
				"name": "person",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/people",
								"parts": []any{
									"people",
								},
								"select": map[string]any{
									"exist": []any{
										"page",
										"search",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/people/{id}",
								"parts": []any{
									"people",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"planet": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "climate",
						"short": "The climate of this planet",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "created",
						"short": "The ISO 8601 date format of the time that this resource was created",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "diameter",
						"short": "The diameter of this planet in kilometers",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "edited",
						"short": "The ISO 8601 date format of the time that this resource was edited",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "films",
						"short": "An array of Film URL Resources that this planet has appeared in",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "gravity",
						"short": "A number denoting the gravity of this planet",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "The name of this planet",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "orbital_period",
						"short": "The number of standard days it takes for this planet to complete a single orbit of its local star",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "population",
						"short": "The average population of sentient beings inhabiting this planet",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "residents",
						"short": "An array of People URL Resources that live on this planet",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "rotation_period",
						"short": "The number of standard hours it takes for this planet to complete a single rotation on its axis",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "surface_water",
						"short": "The percentage of the planet surface that is naturally occurring water",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "terrain",
						"short": "The terrain of this planet",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"short": "The hypermedia URL of this resource",
						"type": "`$STRING`",
					},
				},
				"name": "planet",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/planets",
								"parts": []any{
									"planets",
								},
								"select": map[string]any{
									"exist": []any{
										"page",
										"search",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/planets/{id}",
								"parts": []any{
									"planets",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"species": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "average_height",
						"short": "The average height of this species in centimeters",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "average_lifespan",
						"short": "The average lifespan of this species in years",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "classification",
						"short": "The classification of this species",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "created",
						"short": "The ISO 8601 date format of the time that this resource was created",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "designation",
						"short": "The designation of this species",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "edited",
						"short": "The ISO 8601 date format of the time that this resource was edited",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "eye_colors",
						"short": "A comma-separated string of common eye colors for this species",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "films",
						"short": "An array of Film URL Resources that this species has appeared in",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "hair_colors",
						"short": "A comma-separated string of common hair colors for this species",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "homeworld",
						"short": "The URL of a planet resource that is the homeworld of this species",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "language",
						"short": "The language commonly spoken by this species",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "The name of this species",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "people",
						"short": "An array of People URL Resources that are a part of this species",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "skin_colors",
						"short": "A comma-separated string of common skin colors for this species",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"short": "The hypermedia URL of this resource",
						"type": "`$STRING`",
					},
				},
				"name": "species",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/species",
								"parts": []any{
									"species",
								},
								"select": map[string]any{
									"exist": []any{
										"page",
										"search",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/species/{id}",
								"parts": []any{
									"species",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"starship": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "MGLT",
						"short": "The Maximum number of Megalights this starship can travel in a standard hour",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "cargo_capacity",
						"short": "The maximum number of kilograms that this starship can transport",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "consumables",
						"short": "The maximum length of time that this starship can provide consumables for its entire crew without having to resupply",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "cost_in_credits",
						"short": "The cost of this starship new, in galactic credits",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "created",
						"short": "The ISO 8601 date format of the time that this resource was created",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "crew",
						"short": "The number of personnel needed to run or pilot this starship",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "edited",
						"short": "The ISO 8601 date format of the time that this resource was edited",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "films",
						"short": "An array of Film URL Resources that this starship has appeared in",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "hyperdrive_rating",
						"short": "The class of this starships hyperdrive",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "length",
						"short": "The length of this starship in meters",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "manufacturer",
						"short": "The manufacturer of this starship",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "max_atmosphering_speed",
						"short": "The maximum speed of this starship in atmosphere",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "model",
						"short": "The model or official name of this starship",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "The name of this starship",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "passengers",
						"short": "The number of non-essential people this starship can transport",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "pilots",
						"short": "An array of People URL Resources that this starship has been piloted by",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "starship_class",
						"short": "The class of this starship",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"short": "The hypermedia URL of this resource",
						"type": "`$STRING`",
					},
				},
				"name": "starship",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/starships",
								"parts": []any{
									"starships",
								},
								"select": map[string]any{
									"exist": []any{
										"page",
										"search",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/starships/{id}",
								"parts": []any{
									"starships",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"vehicle": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "cargo_capacity",
						"short": "The maximum number of kilograms that this vehicle can transport",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "consumables",
						"short": "The maximum length of time that this vehicle can provide consumables for its entire crew without having to resupply",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "cost_in_credits",
						"short": "The cost of this vehicle new, in galactic credits",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "created",
						"short": "The ISO 8601 date format of the time that this resource was created",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "crew",
						"short": "The number of personnel needed to run or pilot this vehicle",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "edited",
						"short": "The ISO 8601 date format of the time that this resource was edited",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "films",
						"short": "An array of Film URL Resources that this vehicle has appeared in",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "length",
						"short": "The length of this vehicle in meters",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "manufacturer",
						"short": "The manufacturer of this vehicle",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "max_atmosphering_speed",
						"short": "The maximum speed of this vehicle in atmosphere",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "model",
						"short": "The model or official name of this vehicle",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "The name of this vehicle",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "passengers",
						"short": "The number of non-essential people this vehicle can transport",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "pilots",
						"short": "An array of People URL Resources that this vehicle has been piloted by",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "url",
						"short": "The hypermedia URL of this resource",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "vehicle_class",
						"short": "The class of this vehicle",
						"type": "`$STRING`",
					},
				},
				"name": "vehicle",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/vehicles",
								"parts": []any{
									"vehicles",
								},
								"select": map[string]any{
									"exist": []any{
										"page",
										"search",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/vehicles/{id}",
								"parts": []any{
									"vehicles",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
