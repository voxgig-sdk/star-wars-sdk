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
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
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
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "created",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "director",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "edited",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "episode_id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "opening_crawl",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "planets",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "producer",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "release_date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "species",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "starships",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "title",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "vehicles",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "created",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "edited",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "eye_color",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "films",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "gender",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "hair_color",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "height",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "homeworld",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "mass",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "skin_color",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "species",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "starships",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "vehicles",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "created",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "diameter",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "edited",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "films",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "gravity",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "orbital_period",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "population",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "residents",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "rotation_period",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "surface_water",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "terrain",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "average_lifespan",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "classification",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "created",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "designation",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "edited",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "eye_colors",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "films",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "hair_colors",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "homeworld",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "language",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "people",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "skin_colors",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "cargo_capacity",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "consumables",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "cost_in_credits",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "created",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "crew",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "edited",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "films",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "hyperdrive_rating",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "length",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "manufacturer",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "max_atmosphering_speed",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "model",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "passengers",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "pilots",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "starship_class",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "consumables",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "cost_in_credits",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "created",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "crew",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "edited",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "films",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "length",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "manufacturer",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "max_atmosphering_speed",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "model",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "passengers",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "pilots",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "vehicle_class",
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
