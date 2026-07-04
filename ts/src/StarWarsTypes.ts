// Typed models for the StarWars SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Film {
  character?: any[]
  created?: string
  director?: string
  edited?: string
  episode_id?: number
  opening_crawl?: string
  planet?: any[]
  producer?: string
  release_date?: string
  species?: any[]
  starship?: any[]
  title?: string
  url?: string
  vehicle?: any[]
}

export interface FilmLoadMatch {
  id: number
}

export type FilmListMatch = Partial<Film>

export interface PeopleList {
}

export interface Person {
  birth_year?: string
  created?: string
  edited?: string
  eye_color?: string
  film?: any[]
  gender?: string
  hair_color?: string
  height?: string
  homeworld?: string
  mass?: string
  name?: string
  skin_color?: string
  species?: any[]
  starship?: any[]
  url?: string
  vehicle?: any[]
}

export interface PersonLoadMatch {
  id: number
}

export type PersonListMatch = Partial<Person>

export interface Planet {
  climate?: string
  created?: string
  diameter?: string
  edited?: string
  film?: any[]
  gravity?: string
  name?: string
  orbital_period?: string
  population?: string
  resident?: any[]
  rotation_period?: string
  surface_water?: string
  terrain?: string
  url?: string
}

export interface PlanetLoadMatch {
  id: number
}

export type PlanetListMatch = Partial<Planet>

export interface Species {
  average_height?: string
  average_lifespan?: string
  classification?: string
  created?: string
  designation?: string
  edited?: string
  eye_color?: string
  film?: any[]
  hair_color?: string
  homeworld?: string
  language?: string
  name?: string
  person?: any[]
  skin_color?: string
  url?: string
}

export interface SpeciesLoadMatch {
  id: number
}

export type SpeciesListMatch = Partial<Species>

export interface Starship {
  cargo_capacity?: string
  consumable?: string
  cost_in_credit?: string
  created?: string
  crew?: string
  edited?: string
  film?: any[]
  hyperdrive_rating?: string
  length?: string
  manufacturer?: string
  max_atmosphering_speed?: string
  mglt?: string
  model?: string
  name?: string
  passenger?: string
  pilot?: any[]
  starship_class?: string
  url?: string
}

export interface StarshipLoadMatch {
  id: number
}

export type StarshipListMatch = Partial<Starship>

export interface Vehicle {
  cargo_capacity?: string
  consumable?: string
  cost_in_credit?: string
  created?: string
  crew?: string
  edited?: string
  film?: any[]
  length?: string
  manufacturer?: string
  max_atmosphering_speed?: string
  model?: string
  name?: string
  passenger?: string
  pilot?: any[]
  url?: string
  vehicle_class?: string
}

export interface VehicleLoadMatch {
  id: number
}

export type VehicleListMatch = Partial<Vehicle>

