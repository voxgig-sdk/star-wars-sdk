# Typed models for the StarWars SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Film:
    character: Optional[list] = None
    created: Optional[str] = None
    director: Optional[str] = None
    edited: Optional[str] = None
    episode_id: Optional[int] = None
    opening_crawl: Optional[str] = None
    planet: Optional[list] = None
    producer: Optional[str] = None
    release_date: Optional[str] = None
    species: Optional[list] = None
    starship: Optional[list] = None
    title: Optional[str] = None
    url: Optional[str] = None
    vehicle: Optional[list] = None


@dataclass
class FilmLoadMatch:
    id: int


@dataclass
class FilmListMatch:
    character: Optional[list] = None
    created: Optional[str] = None
    director: Optional[str] = None
    edited: Optional[str] = None
    episode_id: Optional[int] = None
    opening_crawl: Optional[str] = None
    planet: Optional[list] = None
    producer: Optional[str] = None
    release_date: Optional[str] = None
    species: Optional[list] = None
    starship: Optional[list] = None
    title: Optional[str] = None
    url: Optional[str] = None
    vehicle: Optional[list] = None


@dataclass
class PeopleList:
    pass


@dataclass
class Person:
    birth_year: Optional[str] = None
    created: Optional[str] = None
    edited: Optional[str] = None
    eye_color: Optional[str] = None
    film: Optional[list] = None
    gender: Optional[str] = None
    hair_color: Optional[str] = None
    height: Optional[str] = None
    homeworld: Optional[str] = None
    mass: Optional[str] = None
    name: Optional[str] = None
    skin_color: Optional[str] = None
    species: Optional[list] = None
    starship: Optional[list] = None
    url: Optional[str] = None
    vehicle: Optional[list] = None


@dataclass
class PersonLoadMatch:
    id: int


@dataclass
class PersonListMatch:
    birth_year: Optional[str] = None
    created: Optional[str] = None
    edited: Optional[str] = None
    eye_color: Optional[str] = None
    film: Optional[list] = None
    gender: Optional[str] = None
    hair_color: Optional[str] = None
    height: Optional[str] = None
    homeworld: Optional[str] = None
    mass: Optional[str] = None
    name: Optional[str] = None
    skin_color: Optional[str] = None
    species: Optional[list] = None
    starship: Optional[list] = None
    url: Optional[str] = None
    vehicle: Optional[list] = None


@dataclass
class Planet:
    climate: Optional[str] = None
    created: Optional[str] = None
    diameter: Optional[str] = None
    edited: Optional[str] = None
    film: Optional[list] = None
    gravity: Optional[str] = None
    name: Optional[str] = None
    orbital_period: Optional[str] = None
    population: Optional[str] = None
    resident: Optional[list] = None
    rotation_period: Optional[str] = None
    surface_water: Optional[str] = None
    terrain: Optional[str] = None
    url: Optional[str] = None


@dataclass
class PlanetLoadMatch:
    id: int


@dataclass
class PlanetListMatch:
    climate: Optional[str] = None
    created: Optional[str] = None
    diameter: Optional[str] = None
    edited: Optional[str] = None
    film: Optional[list] = None
    gravity: Optional[str] = None
    name: Optional[str] = None
    orbital_period: Optional[str] = None
    population: Optional[str] = None
    resident: Optional[list] = None
    rotation_period: Optional[str] = None
    surface_water: Optional[str] = None
    terrain: Optional[str] = None
    url: Optional[str] = None


@dataclass
class Species:
    average_height: Optional[str] = None
    average_lifespan: Optional[str] = None
    classification: Optional[str] = None
    created: Optional[str] = None
    designation: Optional[str] = None
    edited: Optional[str] = None
    eye_color: Optional[str] = None
    film: Optional[list] = None
    hair_color: Optional[str] = None
    homeworld: Optional[str] = None
    language: Optional[str] = None
    name: Optional[str] = None
    person: Optional[list] = None
    skin_color: Optional[str] = None
    url: Optional[str] = None


@dataclass
class SpeciesLoadMatch:
    id: int


@dataclass
class SpeciesListMatch:
    average_height: Optional[str] = None
    average_lifespan: Optional[str] = None
    classification: Optional[str] = None
    created: Optional[str] = None
    designation: Optional[str] = None
    edited: Optional[str] = None
    eye_color: Optional[str] = None
    film: Optional[list] = None
    hair_color: Optional[str] = None
    homeworld: Optional[str] = None
    language: Optional[str] = None
    name: Optional[str] = None
    person: Optional[list] = None
    skin_color: Optional[str] = None
    url: Optional[str] = None


@dataclass
class Starship:
    cargo_capacity: Optional[str] = None
    consumable: Optional[str] = None
    cost_in_credit: Optional[str] = None
    created: Optional[str] = None
    crew: Optional[str] = None
    edited: Optional[str] = None
    film: Optional[list] = None
    hyperdrive_rating: Optional[str] = None
    length: Optional[str] = None
    manufacturer: Optional[str] = None
    max_atmosphering_speed: Optional[str] = None
    mglt: Optional[str] = None
    model: Optional[str] = None
    name: Optional[str] = None
    passenger: Optional[str] = None
    pilot: Optional[list] = None
    starship_class: Optional[str] = None
    url: Optional[str] = None


@dataclass
class StarshipLoadMatch:
    id: int


@dataclass
class StarshipListMatch:
    cargo_capacity: Optional[str] = None
    consumable: Optional[str] = None
    cost_in_credit: Optional[str] = None
    created: Optional[str] = None
    crew: Optional[str] = None
    edited: Optional[str] = None
    film: Optional[list] = None
    hyperdrive_rating: Optional[str] = None
    length: Optional[str] = None
    manufacturer: Optional[str] = None
    max_atmosphering_speed: Optional[str] = None
    mglt: Optional[str] = None
    model: Optional[str] = None
    name: Optional[str] = None
    passenger: Optional[str] = None
    pilot: Optional[list] = None
    starship_class: Optional[str] = None
    url: Optional[str] = None


@dataclass
class Vehicle:
    cargo_capacity: Optional[str] = None
    consumable: Optional[str] = None
    cost_in_credit: Optional[str] = None
    created: Optional[str] = None
    crew: Optional[str] = None
    edited: Optional[str] = None
    film: Optional[list] = None
    length: Optional[str] = None
    manufacturer: Optional[str] = None
    max_atmosphering_speed: Optional[str] = None
    model: Optional[str] = None
    name: Optional[str] = None
    passenger: Optional[str] = None
    pilot: Optional[list] = None
    url: Optional[str] = None
    vehicle_class: Optional[str] = None


@dataclass
class VehicleLoadMatch:
    id: int


@dataclass
class VehicleListMatch:
    cargo_capacity: Optional[str] = None
    consumable: Optional[str] = None
    cost_in_credit: Optional[str] = None
    created: Optional[str] = None
    crew: Optional[str] = None
    edited: Optional[str] = None
    film: Optional[list] = None
    length: Optional[str] = None
    manufacturer: Optional[str] = None
    max_atmosphering_speed: Optional[str] = None
    model: Optional[str] = None
    name: Optional[str] = None
    passenger: Optional[str] = None
    pilot: Optional[list] = None
    url: Optional[str] = None
    vehicle_class: Optional[str] = None

