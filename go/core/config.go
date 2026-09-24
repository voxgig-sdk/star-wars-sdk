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
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://swapi.dev/api",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"film": map[string]any{},
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
						"title": "Characters",
						"type": "`$ARRAY`",
						"short": "An array of people resource URLs that are in this film",
					},
					map[string]any{
						"name": "created",
						"title": "Created",
						"type": "`$STRING`",
						"short": "The ISO 8601 date format of the time that this resource was created",
						"format": "date-time",
					},
					map[string]any{
						"name": "director",
						"title": "Director",
						"type": "`$STRING`",
						"short": "The name of the director of this film",
					},
					map[string]any{
						"name": "edited",
						"title": "Edited",
						"type": "`$STRING`",
						"short": "The ISO 8601 date format of the time that this resource was edited",
						"format": "date-time",
					},
					map[string]any{
						"name": "episode_id",
						"title": "Episode Id",
						"type": "`$INTEGER`",
						"short": "The episode number of this film",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "opening_crawl",
						"title": "Opening Crawl",
						"type": "`$STRING`",
						"short": "The opening paragraphs at the beginning of this film",
					},
					map[string]any{
						"name": "planets",
						"title": "Planets",
						"type": "`$ARRAY`",
						"short": "An array of planet resource URLs that are in this film",
					},
					map[string]any{
						"name": "producer",
						"title": "Producer",
						"type": "`$STRING`",
						"short": "The name(s) of the producer(s) of this film",
					},
					map[string]any{
						"name": "release_date",
						"title": "Release Date",
						"type": "`$STRING`",
						"short": "The release date of this film",
						"format": "date",
					},
					map[string]any{
						"name": "species",
						"title": "Species",
						"type": "`$ARRAY`",
						"short": "An array of species resource URLs that are in this film",
					},
					map[string]any{
						"name": "starships",
						"title": "Starships",
						"type": "`$ARRAY`",
						"short": "An array of starship resource URLs that are in this film",
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": "`$STRING`",
						"short": "The title of this film",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"short": "The hypermedia URL of this resource",
					},
					map[string]any{
						"name": "vehicles",
						"title": "Vehicles",
						"type": "`$ARRAY`",
						"short": "An array of vehicle resource URLs that are in this film",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "film",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/films",
								"segments": []any{
									map[string]any{
										"lit": "films",
									},
								},
								"parts": []any{
									"films",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"page",
										"search",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/films/{id}",
								"segments": []any{
									map[string]any{
										"lit": "films",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"films",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"person": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "birth_year",
						"title": "Birth Year",
						"type": "`$STRING`",
						"short": "The birth year of the person, using the in-universe standard of BBY or ABY",
					},
					map[string]any{
						"name": "created",
						"title": "Created",
						"type": "`$STRING`",
						"short": "The ISO 8601 date format of the time that this resource was created",
						"format": "date-time",
					},
					map[string]any{
						"name": "edited",
						"title": "Edited",
						"type": "`$STRING`",
						"short": "The ISO 8601 date format of the time that this resource was edited",
						"format": "date-time",
					},
					map[string]any{
						"name": "eye_color",
						"title": "Eye Color",
						"type": "`$STRING`",
						"short": "The eye color of this person",
					},
					map[string]any{
						"name": "films",
						"title": "Films",
						"type": "`$ARRAY`",
						"short": "An array of film resource URLs that this person has been in",
					},
					map[string]any{
						"name": "gender",
						"title": "Gender",
						"type": "`$STRING`",
						"short": "The gender of this person",
					},
					map[string]any{
						"name": "hair_color",
						"title": "Hair Color",
						"type": "`$STRING`",
						"short": "The hair color of this person",
					},
					map[string]any{
						"name": "height",
						"title": "Height",
						"type": "`$STRING`",
						"short": "The height of the person in centimeters",
					},
					map[string]any{
						"name": "homeworld",
						"title": "Homeworld",
						"type": "`$STRING`",
						"short": "The URL of the planet resource that this person was born on",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "mass",
						"title": "Mass",
						"type": "`$STRING`",
						"short": "The mass of the person in kilograms",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "The name of this person",
					},
					map[string]any{
						"name": "skin_color",
						"title": "Skin Color",
						"type": "`$STRING`",
						"short": "The skin color of this person",
					},
					map[string]any{
						"name": "species",
						"title": "Species",
						"type": "`$ARRAY`",
						"short": "An array of species resource URLs that this person belongs to",
					},
					map[string]any{
						"name": "starships",
						"title": "Starships",
						"type": "`$ARRAY`",
						"short": "An array of starship resource URLs that this person has piloted",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"short": "The hypermedia URL of this resource",
					},
					map[string]any{
						"name": "vehicles",
						"title": "Vehicles",
						"type": "`$ARRAY`",
						"short": "An array of vehicle resource URLs that this person has piloted",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "person",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/people",
								"segments": []any{
									map[string]any{
										"lit": "people",
									},
								},
								"parts": []any{
									"people",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"page",
										"search",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/people/{id}",
								"segments": []any{
									map[string]any{
										"lit": "people",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"people",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Climate",
						"type": "`$STRING`",
						"short": "The climate of this planet",
					},
					map[string]any{
						"name": "created",
						"title": "Created",
						"type": "`$STRING`",
						"short": "The ISO 8601 date format of the time that this resource was created",
						"format": "date-time",
					},
					map[string]any{
						"name": "diameter",
						"title": "Diameter",
						"type": "`$STRING`",
						"short": "The diameter of this planet in kilometers",
					},
					map[string]any{
						"name": "edited",
						"title": "Edited",
						"type": "`$STRING`",
						"short": "The ISO 8601 date format of the time that this resource was edited",
						"format": "date-time",
					},
					map[string]any{
						"name": "films",
						"title": "Films",
						"type": "`$ARRAY`",
						"short": "An array of Film URL Resources that this planet has appeared in",
					},
					map[string]any{
						"name": "gravity",
						"title": "Gravity",
						"type": "`$STRING`",
						"short": "A number denoting the gravity of this planet",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "The name of this planet",
					},
					map[string]any{
						"name": "orbital_period",
						"title": "Orbital Period",
						"type": "`$STRING`",
						"short": "The number of standard days it takes for this planet to complete a single orbit of its local star",
					},
					map[string]any{
						"name": "population",
						"title": "Population",
						"type": "`$STRING`",
						"short": "The average population of sentient beings inhabiting this planet",
					},
					map[string]any{
						"name": "residents",
						"title": "Residents",
						"type": "`$ARRAY`",
						"short": "An array of People URL Resources that live on this planet",
					},
					map[string]any{
						"name": "rotation_period",
						"title": "Rotation Period",
						"type": "`$STRING`",
						"short": "The number of standard hours it takes for this planet to complete a single rotation on its axis",
					},
					map[string]any{
						"name": "surface_water",
						"title": "Surface Water",
						"type": "`$STRING`",
						"short": "The percentage of the planet surface that is naturally occurring water",
					},
					map[string]any{
						"name": "terrain",
						"title": "Terrain",
						"type": "`$STRING`",
						"short": "The terrain of this planet",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"short": "The hypermedia URL of this resource",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "planet",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/planets",
								"segments": []any{
									map[string]any{
										"lit": "planets",
									},
								},
								"parts": []any{
									"planets",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"page",
										"search",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/planets/{id}",
								"segments": []any{
									map[string]any{
										"lit": "planets",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"planets",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Average Height",
						"type": "`$STRING`",
						"short": "The average height of this species in centimeters",
					},
					map[string]any{
						"name": "average_lifespan",
						"title": "Average Lifespan",
						"type": "`$STRING`",
						"short": "The average lifespan of this species in years",
					},
					map[string]any{
						"name": "classification",
						"title": "Classification",
						"type": "`$STRING`",
						"short": "The classification of this species",
					},
					map[string]any{
						"name": "created",
						"title": "Created",
						"type": "`$STRING`",
						"short": "The ISO 8601 date format of the time that this resource was created",
						"format": "date-time",
					},
					map[string]any{
						"name": "designation",
						"title": "Designation",
						"type": "`$STRING`",
						"short": "The designation of this species",
					},
					map[string]any{
						"name": "edited",
						"title": "Edited",
						"type": "`$STRING`",
						"short": "The ISO 8601 date format of the time that this resource was edited",
						"format": "date-time",
					},
					map[string]any{
						"name": "eye_colors",
						"title": "Eye Colors",
						"type": "`$STRING`",
						"short": "A comma-separated string of common eye colors for this species",
					},
					map[string]any{
						"name": "films",
						"title": "Films",
						"type": "`$ARRAY`",
						"short": "An array of Film URL Resources that this species has appeared in",
					},
					map[string]any{
						"name": "hair_colors",
						"title": "Hair Colors",
						"type": "`$STRING`",
						"short": "A comma-separated string of common hair colors for this species",
					},
					map[string]any{
						"name": "homeworld",
						"title": "Homeworld",
						"type": "`$STRING`",
						"short": "The URL of a planet resource that is the homeworld of this species",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "language",
						"title": "Language",
						"type": "`$STRING`",
						"short": "The language commonly spoken by this species",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "The name of this species",
					},
					map[string]any{
						"name": "people",
						"title": "People",
						"type": "`$ARRAY`",
						"short": "An array of People URL Resources that are a part of this species",
					},
					map[string]any{
						"name": "skin_colors",
						"title": "Skin Colors",
						"type": "`$STRING`",
						"short": "A comma-separated string of common skin colors for this species",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"short": "The hypermedia URL of this resource",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "species",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/species",
								"segments": []any{
									map[string]any{
										"lit": "species",
									},
								},
								"parts": []any{
									"species",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"page",
										"search",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/species/{id}",
								"segments": []any{
									map[string]any{
										"lit": "species",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"species",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Mglt",
						"type": "`$STRING`",
						"short": "The Maximum number of Megalights this starship can travel in a standard hour",
					},
					map[string]any{
						"name": "cargo_capacity",
						"title": "Cargo Capacity",
						"type": "`$STRING`",
						"short": "The maximum number of kilograms that this starship can transport",
					},
					map[string]any{
						"name": "consumables",
						"title": "Consumables",
						"type": "`$STRING`",
						"short": "The maximum length of time that this starship can provide consumables for its entire crew without having to resupply",
					},
					map[string]any{
						"name": "cost_in_credits",
						"title": "Cost In Credits",
						"type": "`$STRING`",
						"short": "The cost of this starship new, in galactic credits",
					},
					map[string]any{
						"name": "created",
						"title": "Created",
						"type": "`$STRING`",
						"short": "The ISO 8601 date format of the time that this resource was created",
						"format": "date-time",
					},
					map[string]any{
						"name": "crew",
						"title": "Crew",
						"type": "`$STRING`",
						"short": "The number of personnel needed to run or pilot this starship",
					},
					map[string]any{
						"name": "edited",
						"title": "Edited",
						"type": "`$STRING`",
						"short": "The ISO 8601 date format of the time that this resource was edited",
						"format": "date-time",
					},
					map[string]any{
						"name": "films",
						"title": "Films",
						"type": "`$ARRAY`",
						"short": "An array of Film URL Resources that this starship has appeared in",
					},
					map[string]any{
						"name": "hyperdrive_rating",
						"title": "Hyperdrive Rating",
						"type": "`$STRING`",
						"short": "The class of this starships hyperdrive",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "length",
						"title": "Length",
						"type": "`$STRING`",
						"short": "The length of this starship in meters",
					},
					map[string]any{
						"name": "manufacturer",
						"title": "Manufacturer",
						"type": "`$STRING`",
						"short": "The manufacturer of this starship",
					},
					map[string]any{
						"name": "max_atmosphering_speed",
						"title": "Max Atmosphering Speed",
						"type": "`$STRING`",
						"short": "The maximum speed of this starship in atmosphere",
					},
					map[string]any{
						"name": "model",
						"title": "Model",
						"type": "`$STRING`",
						"short": "The model or official name of this starship",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "The name of this starship",
					},
					map[string]any{
						"name": "passengers",
						"title": "Passengers",
						"type": "`$STRING`",
						"short": "The number of non-essential people this starship can transport",
					},
					map[string]any{
						"name": "pilots",
						"title": "Pilots",
						"type": "`$ARRAY`",
						"short": "An array of People URL Resources that this starship has been piloted by",
					},
					map[string]any{
						"name": "starship_class",
						"title": "Starship Class",
						"type": "`$STRING`",
						"short": "The class of this starship",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"short": "The hypermedia URL of this resource",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "starship",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/starships",
								"segments": []any{
									map[string]any{
										"lit": "starships",
									},
								},
								"parts": []any{
									"starships",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"page",
										"search",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/starships/{id}",
								"segments": []any{
									map[string]any{
										"lit": "starships",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"starships",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Cargo Capacity",
						"type": "`$STRING`",
						"short": "The maximum number of kilograms that this vehicle can transport",
					},
					map[string]any{
						"name": "consumables",
						"title": "Consumables",
						"type": "`$STRING`",
						"short": "The maximum length of time that this vehicle can provide consumables for its entire crew without having to resupply",
					},
					map[string]any{
						"name": "cost_in_credits",
						"title": "Cost In Credits",
						"type": "`$STRING`",
						"short": "The cost of this vehicle new, in galactic credits",
					},
					map[string]any{
						"name": "created",
						"title": "Created",
						"type": "`$STRING`",
						"short": "The ISO 8601 date format of the time that this resource was created",
						"format": "date-time",
					},
					map[string]any{
						"name": "crew",
						"title": "Crew",
						"type": "`$STRING`",
						"short": "The number of personnel needed to run or pilot this vehicle",
					},
					map[string]any{
						"name": "edited",
						"title": "Edited",
						"type": "`$STRING`",
						"short": "The ISO 8601 date format of the time that this resource was edited",
						"format": "date-time",
					},
					map[string]any{
						"name": "films",
						"title": "Films",
						"type": "`$ARRAY`",
						"short": "An array of Film URL Resources that this vehicle has appeared in",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "length",
						"title": "Length",
						"type": "`$STRING`",
						"short": "The length of this vehicle in meters",
					},
					map[string]any{
						"name": "manufacturer",
						"title": "Manufacturer",
						"type": "`$STRING`",
						"short": "The manufacturer of this vehicle",
					},
					map[string]any{
						"name": "max_atmosphering_speed",
						"title": "Max Atmosphering Speed",
						"type": "`$STRING`",
						"short": "The maximum speed of this vehicle in atmosphere",
					},
					map[string]any{
						"name": "model",
						"title": "Model",
						"type": "`$STRING`",
						"short": "The model or official name of this vehicle",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "The name of this vehicle",
					},
					map[string]any{
						"name": "passengers",
						"title": "Passengers",
						"type": "`$STRING`",
						"short": "The number of non-essential people this vehicle can transport",
					},
					map[string]any{
						"name": "pilots",
						"title": "Pilots",
						"type": "`$ARRAY`",
						"short": "An array of People URL Resources that this vehicle has been piloted by",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"short": "The hypermedia URL of this resource",
					},
					map[string]any{
						"name": "vehicle_class",
						"title": "Vehicle Class",
						"type": "`$STRING`",
						"short": "The class of this vehicle",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "vehicle",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/vehicles",
								"segments": []any{
									map[string]any{
										"lit": "vehicles",
									},
								},
								"parts": []any{
									"vehicles",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"page",
										"search",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/vehicles/{id}",
								"segments": []any{
									map[string]any{
										"lit": "vehicles",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"vehicles",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
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
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
