<?php
declare(strict_types=1);

// Typed models for the StarWars SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Film entity data model. */
class Film
{
    public ?array $character = null;
    public ?string $created = null;
    public ?string $director = null;
    public ?string $edited = null;
    public ?int $episode_id = null;
    public ?string $opening_crawl = null;
    public ?array $planet = null;
    public ?string $producer = null;
    public ?string $release_date = null;
    public ?array $species = null;
    public ?array $starship = null;
    public ?string $title = null;
    public ?string $url = null;
    public ?array $vehicle = null;
}

/** Request payload for Film#load. */
class FilmLoadMatch
{
    public int $id;
}

/** Request payload for Film#list. */
class FilmListMatch
{
    public ?array $character = null;
    public ?string $created = null;
    public ?string $director = null;
    public ?string $edited = null;
    public ?int $episode_id = null;
    public ?string $opening_crawl = null;
    public ?array $planet = null;
    public ?string $producer = null;
    public ?string $release_date = null;
    public ?array $species = null;
    public ?array $starship = null;
    public ?string $title = null;
    public ?string $url = null;
    public ?array $vehicle = null;
}

/** PeopleList entity data model. */
class PeopleList
{
}

/** Person entity data model. */
class Person
{
    public ?string $birth_year = null;
    public ?string $created = null;
    public ?string $edited = null;
    public ?string $eye_color = null;
    public ?array $film = null;
    public ?string $gender = null;
    public ?string $hair_color = null;
    public ?string $height = null;
    public ?string $homeworld = null;
    public ?string $mass = null;
    public ?string $name = null;
    public ?string $skin_color = null;
    public ?array $species = null;
    public ?array $starship = null;
    public ?string $url = null;
    public ?array $vehicle = null;
}

/** Request payload for Person#load. */
class PersonLoadMatch
{
    public int $id;
}

/** Request payload for Person#list. */
class PersonListMatch
{
    public ?string $birth_year = null;
    public ?string $created = null;
    public ?string $edited = null;
    public ?string $eye_color = null;
    public ?array $film = null;
    public ?string $gender = null;
    public ?string $hair_color = null;
    public ?string $height = null;
    public ?string $homeworld = null;
    public ?string $mass = null;
    public ?string $name = null;
    public ?string $skin_color = null;
    public ?array $species = null;
    public ?array $starship = null;
    public ?string $url = null;
    public ?array $vehicle = null;
}

/** Planet entity data model. */
class Planet
{
    public ?string $climate = null;
    public ?string $created = null;
    public ?string $diameter = null;
    public ?string $edited = null;
    public ?array $film = null;
    public ?string $gravity = null;
    public ?string $name = null;
    public ?string $orbital_period = null;
    public ?string $population = null;
    public ?array $resident = null;
    public ?string $rotation_period = null;
    public ?string $surface_water = null;
    public ?string $terrain = null;
    public ?string $url = null;
}

/** Request payload for Planet#load. */
class PlanetLoadMatch
{
    public int $id;
}

/** Request payload for Planet#list. */
class PlanetListMatch
{
    public ?string $climate = null;
    public ?string $created = null;
    public ?string $diameter = null;
    public ?string $edited = null;
    public ?array $film = null;
    public ?string $gravity = null;
    public ?string $name = null;
    public ?string $orbital_period = null;
    public ?string $population = null;
    public ?array $resident = null;
    public ?string $rotation_period = null;
    public ?string $surface_water = null;
    public ?string $terrain = null;
    public ?string $url = null;
}

/** Species entity data model. */
class Species
{
    public ?string $average_height = null;
    public ?string $average_lifespan = null;
    public ?string $classification = null;
    public ?string $created = null;
    public ?string $designation = null;
    public ?string $edited = null;
    public ?string $eye_color = null;
    public ?array $film = null;
    public ?string $hair_color = null;
    public ?string $homeworld = null;
    public ?string $language = null;
    public ?string $name = null;
    public ?array $person = null;
    public ?string $skin_color = null;
    public ?string $url = null;
}

/** Request payload for Species#load. */
class SpeciesLoadMatch
{
    public int $id;
}

/** Request payload for Species#list. */
class SpeciesListMatch
{
    public ?string $average_height = null;
    public ?string $average_lifespan = null;
    public ?string $classification = null;
    public ?string $created = null;
    public ?string $designation = null;
    public ?string $edited = null;
    public ?string $eye_color = null;
    public ?array $film = null;
    public ?string $hair_color = null;
    public ?string $homeworld = null;
    public ?string $language = null;
    public ?string $name = null;
    public ?array $person = null;
    public ?string $skin_color = null;
    public ?string $url = null;
}

/** Starship entity data model. */
class Starship
{
    public ?string $cargo_capacity = null;
    public ?string $consumable = null;
    public ?string $cost_in_credit = null;
    public ?string $created = null;
    public ?string $crew = null;
    public ?string $edited = null;
    public ?array $film = null;
    public ?string $hyperdrive_rating = null;
    public ?string $length = null;
    public ?string $manufacturer = null;
    public ?string $max_atmosphering_speed = null;
    public ?string $mglt = null;
    public ?string $model = null;
    public ?string $name = null;
    public ?string $passenger = null;
    public ?array $pilot = null;
    public ?string $starship_class = null;
    public ?string $url = null;
}

/** Request payload for Starship#load. */
class StarshipLoadMatch
{
    public int $id;
}

/** Request payload for Starship#list. */
class StarshipListMatch
{
    public ?string $cargo_capacity = null;
    public ?string $consumable = null;
    public ?string $cost_in_credit = null;
    public ?string $created = null;
    public ?string $crew = null;
    public ?string $edited = null;
    public ?array $film = null;
    public ?string $hyperdrive_rating = null;
    public ?string $length = null;
    public ?string $manufacturer = null;
    public ?string $max_atmosphering_speed = null;
    public ?string $mglt = null;
    public ?string $model = null;
    public ?string $name = null;
    public ?string $passenger = null;
    public ?array $pilot = null;
    public ?string $starship_class = null;
    public ?string $url = null;
}

/** Vehicle entity data model. */
class Vehicle
{
    public ?string $cargo_capacity = null;
    public ?string $consumable = null;
    public ?string $cost_in_credit = null;
    public ?string $created = null;
    public ?string $crew = null;
    public ?string $edited = null;
    public ?array $film = null;
    public ?string $length = null;
    public ?string $manufacturer = null;
    public ?string $max_atmosphering_speed = null;
    public ?string $model = null;
    public ?string $name = null;
    public ?string $passenger = null;
    public ?array $pilot = null;
    public ?string $url = null;
    public ?string $vehicle_class = null;
}

/** Request payload for Vehicle#load. */
class VehicleLoadMatch
{
    public int $id;
}

/** Request payload for Vehicle#list. */
class VehicleListMatch
{
    public ?string $cargo_capacity = null;
    public ?string $consumable = null;
    public ?string $cost_in_credit = null;
    public ?string $created = null;
    public ?string $crew = null;
    public ?string $edited = null;
    public ?array $film = null;
    public ?string $length = null;
    public ?string $manufacturer = null;
    public ?string $max_atmosphering_speed = null;
    public ?string $model = null;
    public ?string $name = null;
    public ?string $passenger = null;
    public ?array $pilot = null;
    public ?string $url = null;
    public ?string $vehicle_class = null;
}

