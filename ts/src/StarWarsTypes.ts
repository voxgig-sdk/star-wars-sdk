// Typed models for the StarWars SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Film {
  characters?: any[]
  created?: string
  director?: string
  edited?: string
  episode_id?: number
  opening_crawl?: string
  planets?: any[]
  producer?: string
  release_date?: string
  species?: any[]
  starships?: any[]
  title?: string
  url?: string
  vehicles?: any[]
}

export interface FilmLoadMatch {
  id: number
}

export interface FilmListMatch {
  characters?: any[]
  created?: string
  director?: string
  edited?: string
  episode_id?: number
  opening_crawl?: string
  planets?: any[]
  producer?: string
  release_date?: string
  species?: any[]
  starships?: any[]
  title?: string
  url?: string
  vehicles?: any[]
}

export interface PeopleList {
}

export interface Person {
  birth_year?: string
  created?: string
  edited?: string
  eye_color?: string
  films?: any[]
  gender?: string
  hair_color?: string
  height?: string
  homeworld?: string
  mass?: string
  name?: string
  skin_color?: string
  species?: any[]
  starships?: any[]
  url?: string
  vehicles?: any[]
}

export interface PersonLoadMatch {
  id: number
}

export interface PersonListMatch {
  birth_year?: string
  created?: string
  edited?: string
  eye_color?: string
  films?: any[]
  gender?: string
  hair_color?: string
  height?: string
  homeworld?: string
  mass?: string
  name?: string
  skin_color?: string
  species?: any[]
  starships?: any[]
  url?: string
  vehicles?: any[]
}

export interface Planet {
  climate?: string
  created?: string
  diameter?: string
  edited?: string
  films?: any[]
  gravity?: string
  name?: string
  orbital_period?: string
  population?: string
  residents?: any[]
  rotation_period?: string
  surface_water?: string
  terrain?: string
  url?: string
}

export interface PlanetLoadMatch {
  id: number
}

export interface PlanetListMatch {
  climate?: string
  created?: string
  diameter?: string
  edited?: string
  films?: any[]
  gravity?: string
  name?: string
  orbital_period?: string
  population?: string
  residents?: any[]
  rotation_period?: string
  surface_water?: string
  terrain?: string
  url?: string
}

export interface Species {
  average_height?: string
  average_lifespan?: string
  classification?: string
  created?: string
  designation?: string
  edited?: string
  eye_colors?: string
  films?: any[]
  hair_colors?: string
  homeworld?: string
  language?: string
  name?: string
  people?: any[]
  skin_colors?: string
  url?: string
}

export interface SpeciesLoadMatch {
  id: number
}

export interface SpeciesListMatch {
  average_height?: string
  average_lifespan?: string
  classification?: string
  created?: string
  designation?: string
  edited?: string
  eye_colors?: string
  films?: any[]
  hair_colors?: string
  homeworld?: string
  language?: string
  name?: string
  people?: any[]
  skin_colors?: string
  url?: string
}

export interface Starship {
  MGLT?: string
  cargo_capacity?: string
  consumables?: string
  cost_in_credits?: string
  created?: string
  crew?: string
  edited?: string
  films?: any[]
  hyperdrive_rating?: string
  length?: string
  manufacturer?: string
  max_atmosphering_speed?: string
  model?: string
  name?: string
  passengers?: string
  pilots?: any[]
  starship_class?: string
  url?: string
}

export interface StarshipLoadMatch {
  id: number
}

export interface StarshipListMatch {
  MGLT?: string
  cargo_capacity?: string
  consumables?: string
  cost_in_credits?: string
  created?: string
  crew?: string
  edited?: string
  films?: any[]
  hyperdrive_rating?: string
  length?: string
  manufacturer?: string
  max_atmosphering_speed?: string
  model?: string
  name?: string
  passengers?: string
  pilots?: any[]
  starship_class?: string
  url?: string
}

export interface Vehicle {
  cargo_capacity?: string
  consumables?: string
  cost_in_credits?: string
  created?: string
  crew?: string
  edited?: string
  films?: any[]
  length?: string
  manufacturer?: string
  max_atmosphering_speed?: string
  model?: string
  name?: string
  passengers?: string
  pilots?: any[]
  url?: string
  vehicle_class?: string
}

export interface VehicleLoadMatch {
  id: number
}

export interface VehicleListMatch {
  cargo_capacity?: string
  consumables?: string
  cost_in_credits?: string
  created?: string
  crew?: string
  edited?: string
  films?: any[]
  length?: string
  manufacturer?: string
  max_atmosphering_speed?: string
  model?: string
  name?: string
  passengers?: string
  pilots?: any[]
  url?: string
  vehicle_class?: string
}

