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
# @!attribute [rw] character
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
# @!attribute [rw] planet
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
# @!attribute [rw] starship
#   @return [Array, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] vehicle
#   @return [Array, nil]
Film = Struct.new(
  :character,
  :created,
  :director,
  :edited,
  :episode_id,
  :opening_crawl,
  :planet,
  :producer,
  :release_date,
  :species,
  :starship,
  :title,
  :url,
  :vehicle,
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

# Match filter for Film#list (any subset of Film fields).
#
# @!attribute [rw] character
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
# @!attribute [rw] planet
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
# @!attribute [rw] starship
#   @return [Array, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] vehicle
#   @return [Array, nil]
FilmListMatch = Struct.new(
  :character,
  :created,
  :director,
  :edited,
  :episode_id,
  :opening_crawl,
  :planet,
  :producer,
  :release_date,
  :species,
  :starship,
  :title,
  :url,
  :vehicle,
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
# @!attribute [rw] film
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
# @!attribute [rw] starship
#   @return [Array, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] vehicle
#   @return [Array, nil]
Person = Struct.new(
  :birth_year,
  :created,
  :edited,
  :eye_color,
  :film,
  :gender,
  :hair_color,
  :height,
  :homeworld,
  :mass,
  :name,
  :skin_color,
  :species,
  :starship,
  :url,
  :vehicle,
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

# Match filter for Person#list (any subset of Person fields).
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
# @!attribute [rw] film
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
# @!attribute [rw] starship
#   @return [Array, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] vehicle
#   @return [Array, nil]
PersonListMatch = Struct.new(
  :birth_year,
  :created,
  :edited,
  :eye_color,
  :film,
  :gender,
  :hair_color,
  :height,
  :homeworld,
  :mass,
  :name,
  :skin_color,
  :species,
  :starship,
  :url,
  :vehicle,
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
# @!attribute [rw] film
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
# @!attribute [rw] resident
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
  :film,
  :gravity,
  :name,
  :orbital_period,
  :population,
  :resident,
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

# Match filter for Planet#list (any subset of Planet fields).
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
# @!attribute [rw] film
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
# @!attribute [rw] resident
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
  :film,
  :gravity,
  :name,
  :orbital_period,
  :population,
  :resident,
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
# @!attribute [rw] eye_color
#   @return [String, nil]
#
# @!attribute [rw] film
#   @return [Array, nil]
#
# @!attribute [rw] hair_color
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
# @!attribute [rw] person
#   @return [Array, nil]
#
# @!attribute [rw] skin_color
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
  :eye_color,
  :film,
  :hair_color,
  :homeworld,
  :language,
  :name,
  :person,
  :skin_color,
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

# Match filter for Species#list (any subset of Species fields).
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
# @!attribute [rw] eye_color
#   @return [String, nil]
#
# @!attribute [rw] film
#   @return [Array, nil]
#
# @!attribute [rw] hair_color
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
# @!attribute [rw] person
#   @return [Array, nil]
#
# @!attribute [rw] skin_color
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
  :eye_color,
  :film,
  :hair_color,
  :homeworld,
  :language,
  :name,
  :person,
  :skin_color,
  :url,
  keyword_init: true
)

# Starship entity data model.
#
# @!attribute [rw] cargo_capacity
#   @return [String, nil]
#
# @!attribute [rw] consumable
#   @return [String, nil]
#
# @!attribute [rw] cost_in_credit
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
# @!attribute [rw] film
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
# @!attribute [rw] mglt
#   @return [String, nil]
#
# @!attribute [rw] model
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] passenger
#   @return [String, nil]
#
# @!attribute [rw] pilot
#   @return [Array, nil]
#
# @!attribute [rw] starship_class
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
Starship = Struct.new(
  :cargo_capacity,
  :consumable,
  :cost_in_credit,
  :created,
  :crew,
  :edited,
  :film,
  :hyperdrive_rating,
  :length,
  :manufacturer,
  :max_atmosphering_speed,
  :mglt,
  :model,
  :name,
  :passenger,
  :pilot,
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

# Match filter for Starship#list (any subset of Starship fields).
#
# @!attribute [rw] cargo_capacity
#   @return [String, nil]
#
# @!attribute [rw] consumable
#   @return [String, nil]
#
# @!attribute [rw] cost_in_credit
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
# @!attribute [rw] film
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
# @!attribute [rw] mglt
#   @return [String, nil]
#
# @!attribute [rw] model
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] passenger
#   @return [String, nil]
#
# @!attribute [rw] pilot
#   @return [Array, nil]
#
# @!attribute [rw] starship_class
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
StarshipListMatch = Struct.new(
  :cargo_capacity,
  :consumable,
  :cost_in_credit,
  :created,
  :crew,
  :edited,
  :film,
  :hyperdrive_rating,
  :length,
  :manufacturer,
  :max_atmosphering_speed,
  :mglt,
  :model,
  :name,
  :passenger,
  :pilot,
  :starship_class,
  :url,
  keyword_init: true
)

# Vehicle entity data model.
#
# @!attribute [rw] cargo_capacity
#   @return [String, nil]
#
# @!attribute [rw] consumable
#   @return [String, nil]
#
# @!attribute [rw] cost_in_credit
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
# @!attribute [rw] film
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
# @!attribute [rw] passenger
#   @return [String, nil]
#
# @!attribute [rw] pilot
#   @return [Array, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] vehicle_class
#   @return [String, nil]
Vehicle = Struct.new(
  :cargo_capacity,
  :consumable,
  :cost_in_credit,
  :created,
  :crew,
  :edited,
  :film,
  :length,
  :manufacturer,
  :max_atmosphering_speed,
  :model,
  :name,
  :passenger,
  :pilot,
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

# Match filter for Vehicle#list (any subset of Vehicle fields).
#
# @!attribute [rw] cargo_capacity
#   @return [String, nil]
#
# @!attribute [rw] consumable
#   @return [String, nil]
#
# @!attribute [rw] cost_in_credit
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
# @!attribute [rw] film
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
# @!attribute [rw] passenger
#   @return [String, nil]
#
# @!attribute [rw] pilot
#   @return [Array, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] vehicle_class
#   @return [String, nil]
VehicleListMatch = Struct.new(
  :cargo_capacity,
  :consumable,
  :cost_in_credit,
  :created,
  :crew,
  :edited,
  :film,
  :length,
  :manufacturer,
  :max_atmosphering_speed,
  :model,
  :name,
  :passenger,
  :pilot,
  :url,
  :vehicle_class,
  keyword_init: true
)

