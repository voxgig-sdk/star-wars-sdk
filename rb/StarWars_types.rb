# frozen_string_literal: true

# Typed models for the StarWars SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Film entity data model.
#
# @!attribute [rw] characters
#   @return [Array, nil]
#
# @!attribute [rw] created
#   @return [String, nil]
#
# @!attribute [rw] director
#   @return [String, nil]
#
# @!attribute [rw] edited
#   @return [String, nil]
#
# @!attribute [rw] episode_id
#   @return [Integer, nil]
#
# @!attribute [rw] opening_crawl
#   @return [String, nil]
#
# @!attribute [rw] planets
#   @return [Array, nil]
#
# @!attribute [rw] producer
#   @return [String, nil]
#
# @!attribute [rw] release_date
#   @return [String, nil]
#
# @!attribute [rw] species
#   @return [Array, nil]
#
# @!attribute [rw] starships
#   @return [Array, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] vehicles
#   @return [Array, nil]
Film = Struct.new(
  :characters,
  :created,
  :director,
  :edited,
  :episode_id,
  :opening_crawl,
  :planets,
  :producer,
  :release_date,
  :species,
  :starships,
  :title,
  :url,
  :vehicles,
  keyword_init: true
)

# Request payload for Film#load.
#
# @!attribute [rw] id
#   @return [Integer]
FilmLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Film#list.
#
# @!attribute [rw] characters
#   @return [Array, nil]
#
# @!attribute [rw] created
#   @return [String, nil]
#
# @!attribute [rw] director
#   @return [String, nil]
#
# @!attribute [rw] edited
#   @return [String, nil]
#
# @!attribute [rw] episode_id
#   @return [Integer, nil]
#
# @!attribute [rw] opening_crawl
#   @return [String, nil]
#
# @!attribute [rw] planets
#   @return [Array, nil]
#
# @!attribute [rw] producer
#   @return [String, nil]
#
# @!attribute [rw] release_date
#   @return [String, nil]
#
# @!attribute [rw] species
#   @return [Array, nil]
#
# @!attribute [rw] starships
#   @return [Array, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] vehicles
#   @return [Array, nil]
FilmListMatch = Struct.new(
  :characters,
  :created,
  :director,
  :edited,
  :episode_id,
  :opening_crawl,
  :planets,
  :producer,
  :release_date,
  :species,
  :starships,
  :title,
  :url,
  :vehicles,
  keyword_init: true
)

# PeopleList entity data model.
class PeopleList
end

# Person entity data model.
#
# @!attribute [rw] birth_year
#   @return [String, nil]
#
# @!attribute [rw] created
#   @return [String, nil]
#
# @!attribute [rw] edited
#   @return [String, nil]
#
# @!attribute [rw] eye_color
#   @return [String, nil]
#
# @!attribute [rw] films
#   @return [Array, nil]
#
# @!attribute [rw] gender
#   @return [String, nil]
#
# @!attribute [rw] hair_color
#   @return [String, nil]
#
# @!attribute [rw] height
#   @return [String, nil]
#
# @!attribute [rw] homeworld
#   @return [String, nil]
#
# @!attribute [rw] mass
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] skin_color
#   @return [String, nil]
#
# @!attribute [rw] species
#   @return [Array, nil]
#
# @!attribute [rw] starships
#   @return [Array, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] vehicles
#   @return [Array, nil]
Person = Struct.new(
  :birth_year,
  :created,
  :edited,
  :eye_color,
  :films,
  :gender,
  :hair_color,
  :height,
  :homeworld,
  :mass,
  :name,
  :skin_color,
  :species,
  :starships,
  :url,
  :vehicles,
  keyword_init: true
)

# Request payload for Person#load.
#
# @!attribute [rw] id
#   @return [Integer]
PersonLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Person#list.
#
# @!attribute [rw] birth_year
#   @return [String, nil]
#
# @!attribute [rw] created
#   @return [String, nil]
#
# @!attribute [rw] edited
#   @return [String, nil]
#
# @!attribute [rw] eye_color
#   @return [String, nil]
#
# @!attribute [rw] films
#   @return [Array, nil]
#
# @!attribute [rw] gender
#   @return [String, nil]
#
# @!attribute [rw] hair_color
#   @return [String, nil]
#
# @!attribute [rw] height
#   @return [String, nil]
#
# @!attribute [rw] homeworld
#   @return [String, nil]
#
# @!attribute [rw] mass
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] skin_color
#   @return [String, nil]
#
# @!attribute [rw] species
#   @return [Array, nil]
#
# @!attribute [rw] starships
#   @return [Array, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] vehicles
#   @return [Array, nil]
PersonListMatch = Struct.new(
  :birth_year,
  :created,
  :edited,
  :eye_color,
  :films,
  :gender,
  :hair_color,
  :height,
  :homeworld,
  :mass,
  :name,
  :skin_color,
  :species,
  :starships,
  :url,
  :vehicles,
  keyword_init: true
)

# Planet entity data model.
#
# @!attribute [rw] climate
#   @return [String, nil]
#
# @!attribute [rw] created
#   @return [String, nil]
#
# @!attribute [rw] diameter
#   @return [String, nil]
#
# @!attribute [rw] edited
#   @return [String, nil]
#
# @!attribute [rw] films
#   @return [Array, nil]
#
# @!attribute [rw] gravity
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] orbital_period
#   @return [String, nil]
#
# @!attribute [rw] population
#   @return [String, nil]
#
# @!attribute [rw] residents
#   @return [Array, nil]
#
# @!attribute [rw] rotation_period
#   @return [String, nil]
#
# @!attribute [rw] surface_water
#   @return [String, nil]
#
# @!attribute [rw] terrain
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
Planet = Struct.new(
  :climate,
  :created,
  :diameter,
  :edited,
  :films,
  :gravity,
  :name,
  :orbital_period,
  :population,
  :residents,
  :rotation_period,
  :surface_water,
  :terrain,
  :url,
  keyword_init: true
)

# Request payload for Planet#load.
#
# @!attribute [rw] id
#   @return [Integer]
PlanetLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Planet#list.
#
# @!attribute [rw] climate
#   @return [String, nil]
#
# @!attribute [rw] created
#   @return [String, nil]
#
# @!attribute [rw] diameter
#   @return [String, nil]
#
# @!attribute [rw] edited
#   @return [String, nil]
#
# @!attribute [rw] films
#   @return [Array, nil]
#
# @!attribute [rw] gravity
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] orbital_period
#   @return [String, nil]
#
# @!attribute [rw] population
#   @return [String, nil]
#
# @!attribute [rw] residents
#   @return [Array, nil]
#
# @!attribute [rw] rotation_period
#   @return [String, nil]
#
# @!attribute [rw] surface_water
#   @return [String, nil]
#
# @!attribute [rw] terrain
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
PlanetListMatch = Struct.new(
  :climate,
  :created,
  :diameter,
  :edited,
  :films,
  :gravity,
  :name,
  :orbital_period,
  :population,
  :residents,
  :rotation_period,
  :surface_water,
  :terrain,
  :url,
  keyword_init: true
)

# Species entity data model.
#
# @!attribute [rw] average_height
#   @return [String, nil]
#
# @!attribute [rw] average_lifespan
#   @return [String, nil]
#
# @!attribute [rw] classification
#   @return [String, nil]
#
# @!attribute [rw] created
#   @return [String, nil]
#
# @!attribute [rw] designation
#   @return [String, nil]
#
# @!attribute [rw] edited
#   @return [String, nil]
#
# @!attribute [rw] eye_colors
#   @return [String, nil]
#
# @!attribute [rw] films
#   @return [Array, nil]
#
# @!attribute [rw] hair_colors
#   @return [String, nil]
#
# @!attribute [rw] homeworld
#   @return [String, nil]
#
# @!attribute [rw] language
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] people
#   @return [Array, nil]
#
# @!attribute [rw] skin_colors
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
Species = Struct.new(
  :average_height,
  :average_lifespan,
  :classification,
  :created,
  :designation,
  :edited,
  :eye_colors,
  :films,
  :hair_colors,
  :homeworld,
  :language,
  :name,
  :people,
  :skin_colors,
  :url,
  keyword_init: true
)

# Request payload for Species#load.
#
# @!attribute [rw] id
#   @return [Integer]
SpeciesLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Species#list.
#
# @!attribute [rw] average_height
#   @return [String, nil]
#
# @!attribute [rw] average_lifespan
#   @return [String, nil]
#
# @!attribute [rw] classification
#   @return [String, nil]
#
# @!attribute [rw] created
#   @return [String, nil]
#
# @!attribute [rw] designation
#   @return [String, nil]
#
# @!attribute [rw] edited
#   @return [String, nil]
#
# @!attribute [rw] eye_colors
#   @return [String, nil]
#
# @!attribute [rw] films
#   @return [Array, nil]
#
# @!attribute [rw] hair_colors
#   @return [String, nil]
#
# @!attribute [rw] homeworld
#   @return [String, nil]
#
# @!attribute [rw] language
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] people
#   @return [Array, nil]
#
# @!attribute [rw] skin_colors
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
SpeciesListMatch = Struct.new(
  :average_height,
  :average_lifespan,
  :classification,
  :created,
  :designation,
  :edited,
  :eye_colors,
  :films,
  :hair_colors,
  :homeworld,
  :language,
  :name,
  :people,
  :skin_colors,
  :url,
  keyword_init: true
)

# Starship entity data model.
#
# @!attribute [rw] MGLT
#   @return [String, nil]
#
# @!attribute [rw] cargo_capacity
#   @return [String, nil]
#
# @!attribute [rw] consumables
#   @return [String, nil]
#
# @!attribute [rw] cost_in_credits
#   @return [String, nil]
#
# @!attribute [rw] created
#   @return [String, nil]
#
# @!attribute [rw] crew
#   @return [String, nil]
#
# @!attribute [rw] edited
#   @return [String, nil]
#
# @!attribute [rw] films
#   @return [Array, nil]
#
# @!attribute [rw] hyperdrive_rating
#   @return [String, nil]
#
# @!attribute [rw] length
#   @return [String, nil]
#
# @!attribute [rw] manufacturer
#   @return [String, nil]
#
# @!attribute [rw] max_atmosphering_speed
#   @return [String, nil]
#
# @!attribute [rw] model
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] passengers
#   @return [String, nil]
#
# @!attribute [rw] pilots
#   @return [Array, nil]
#
# @!attribute [rw] starship_class
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
Starship = Struct.new(
  :MGLT,
  :cargo_capacity,
  :consumables,
  :cost_in_credits,
  :created,
  :crew,
  :edited,
  :films,
  :hyperdrive_rating,
  :length,
  :manufacturer,
  :max_atmosphering_speed,
  :model,
  :name,
  :passengers,
  :pilots,
  :starship_class,
  :url,
  keyword_init: true
)

# Request payload for Starship#load.
#
# @!attribute [rw] id
#   @return [Integer]
StarshipLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Starship#list.
#
# @!attribute [rw] MGLT
#   @return [String, nil]
#
# @!attribute [rw] cargo_capacity
#   @return [String, nil]
#
# @!attribute [rw] consumables
#   @return [String, nil]
#
# @!attribute [rw] cost_in_credits
#   @return [String, nil]
#
# @!attribute [rw] created
#   @return [String, nil]
#
# @!attribute [rw] crew
#   @return [String, nil]
#
# @!attribute [rw] edited
#   @return [String, nil]
#
# @!attribute [rw] films
#   @return [Array, nil]
#
# @!attribute [rw] hyperdrive_rating
#   @return [String, nil]
#
# @!attribute [rw] length
#   @return [String, nil]
#
# @!attribute [rw] manufacturer
#   @return [String, nil]
#
# @!attribute [rw] max_atmosphering_speed
#   @return [String, nil]
#
# @!attribute [rw] model
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] passengers
#   @return [String, nil]
#
# @!attribute [rw] pilots
#   @return [Array, nil]
#
# @!attribute [rw] starship_class
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
StarshipListMatch = Struct.new(
  :MGLT,
  :cargo_capacity,
  :consumables,
  :cost_in_credits,
  :created,
  :crew,
  :edited,
  :films,
  :hyperdrive_rating,
  :length,
  :manufacturer,
  :max_atmosphering_speed,
  :model,
  :name,
  :passengers,
  :pilots,
  :starship_class,
  :url,
  keyword_init: true
)

# Vehicle entity data model.
#
# @!attribute [rw] cargo_capacity
#   @return [String, nil]
#
# @!attribute [rw] consumables
#   @return [String, nil]
#
# @!attribute [rw] cost_in_credits
#   @return [String, nil]
#
# @!attribute [rw] created
#   @return [String, nil]
#
# @!attribute [rw] crew
#   @return [String, nil]
#
# @!attribute [rw] edited
#   @return [String, nil]
#
# @!attribute [rw] films
#   @return [Array, nil]
#
# @!attribute [rw] length
#   @return [String, nil]
#
# @!attribute [rw] manufacturer
#   @return [String, nil]
#
# @!attribute [rw] max_atmosphering_speed
#   @return [String, nil]
#
# @!attribute [rw] model
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] passengers
#   @return [String, nil]
#
# @!attribute [rw] pilots
#   @return [Array, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] vehicle_class
#   @return [String, nil]
Vehicle = Struct.new(
  :cargo_capacity,
  :consumables,
  :cost_in_credits,
  :created,
  :crew,
  :edited,
  :films,
  :length,
  :manufacturer,
  :max_atmosphering_speed,
  :model,
  :name,
  :passengers,
  :pilots,
  :url,
  :vehicle_class,
  keyword_init: true
)

# Request payload for Vehicle#load.
#
# @!attribute [rw] id
#   @return [Integer]
VehicleLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Vehicle#list.
#
# @!attribute [rw] cargo_capacity
#   @return [String, nil]
#
# @!attribute [rw] consumables
#   @return [String, nil]
#
# @!attribute [rw] cost_in_credits
#   @return [String, nil]
#
# @!attribute [rw] created
#   @return [String, nil]
#
# @!attribute [rw] crew
#   @return [String, nil]
#
# @!attribute [rw] edited
#   @return [String, nil]
#
# @!attribute [rw] films
#   @return [Array, nil]
#
# @!attribute [rw] length
#   @return [String, nil]
#
# @!attribute [rw] manufacturer
#   @return [String, nil]
#
# @!attribute [rw] max_atmosphering_speed
#   @return [String, nil]
#
# @!attribute [rw] model
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] passengers
#   @return [String, nil]
#
# @!attribute [rw] pilots
#   @return [Array, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] vehicle_class
#   @return [String, nil]
VehicleListMatch = Struct.new(
  :cargo_capacity,
  :consumables,
  :cost_in_credits,
  :created,
  :crew,
  :edited,
  :films,
  :length,
  :manufacturer,
  :max_atmosphering_speed,
  :model,
  :name,
  :passengers,
  :pilots,
  :url,
  :vehicle_class,
  keyword_init: true
)

