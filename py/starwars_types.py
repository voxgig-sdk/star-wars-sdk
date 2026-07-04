# Typed models for the StarWars SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Film(TypedDict, total=False):
    character: list
    created: str
    director: str
    edited: str
    episode_id: int
    opening_crawl: str
    planet: list
    producer: str
    release_date: str
    species: list
    starship: list
    title: str
    url: str
    vehicle: list


class FilmLoadMatch(TypedDict):
    id: int


class FilmListMatch(TypedDict, total=False):
    character: list
    created: str
    director: str
    edited: str
    episode_id: int
    opening_crawl: str
    planet: list
    producer: str
    release_date: str
    species: list
    starship: list
    title: str
    url: str
    vehicle: list


class PeopleList(TypedDict):
    pass


class Person(TypedDict, total=False):
    birth_year: str
    created: str
    edited: str
    eye_color: str
    film: list
    gender: str
    hair_color: str
    height: str
    homeworld: str
    mass: str
    name: str
    skin_color: str
    species: list
    starship: list
    url: str
    vehicle: list


class PersonLoadMatch(TypedDict):
    id: int


class PersonListMatch(TypedDict, total=False):
    birth_year: str
    created: str
    edited: str
    eye_color: str
    film: list
    gender: str
    hair_color: str
    height: str
    homeworld: str
    mass: str
    name: str
    skin_color: str
    species: list
    starship: list
    url: str
    vehicle: list


class Planet(TypedDict, total=False):
    climate: str
    created: str
    diameter: str
    edited: str
    film: list
    gravity: str
    name: str
    orbital_period: str
    population: str
    resident: list
    rotation_period: str
    surface_water: str
    terrain: str
    url: str


class PlanetLoadMatch(TypedDict):
    id: int


class PlanetListMatch(TypedDict, total=False):
    climate: str
    created: str
    diameter: str
    edited: str
    film: list
    gravity: str
    name: str
    orbital_period: str
    population: str
    resident: list
    rotation_period: str
    surface_water: str
    terrain: str
    url: str


class Species(TypedDict, total=False):
    average_height: str
    average_lifespan: str
    classification: str
    created: str
    designation: str
    edited: str
    eye_color: str
    film: list
    hair_color: str
    homeworld: str
    language: str
    name: str
    person: list
    skin_color: str
    url: str


class SpeciesLoadMatch(TypedDict):
    id: int


class SpeciesListMatch(TypedDict, total=False):
    average_height: str
    average_lifespan: str
    classification: str
    created: str
    designation: str
    edited: str
    eye_color: str
    film: list
    hair_color: str
    homeworld: str
    language: str
    name: str
    person: list
    skin_color: str
    url: str


class Starship(TypedDict, total=False):
    cargo_capacity: str
    consumable: str
    cost_in_credit: str
    created: str
    crew: str
    edited: str
    film: list
    hyperdrive_rating: str
    length: str
    manufacturer: str
    max_atmosphering_speed: str
    mglt: str
    model: str
    name: str
    passenger: str
    pilot: list
    starship_class: str
    url: str


class StarshipLoadMatch(TypedDict):
    id: int


class StarshipListMatch(TypedDict, total=False):
    cargo_capacity: str
    consumable: str
    cost_in_credit: str
    created: str
    crew: str
    edited: str
    film: list
    hyperdrive_rating: str
    length: str
    manufacturer: str
    max_atmosphering_speed: str
    mglt: str
    model: str
    name: str
    passenger: str
    pilot: list
    starship_class: str
    url: str


class Vehicle(TypedDict, total=False):
    cargo_capacity: str
    consumable: str
    cost_in_credit: str
    created: str
    crew: str
    edited: str
    film: list
    length: str
    manufacturer: str
    max_atmosphering_speed: str
    model: str
    name: str
    passenger: str
    pilot: list
    url: str
    vehicle_class: str


class VehicleLoadMatch(TypedDict):
    id: int


class VehicleListMatch(TypedDict, total=False):
    cargo_capacity: str
    consumable: str
    cost_in_credit: str
    created: str
    crew: str
    edited: str
    film: list
    length: str
    manufacturer: str
    max_atmosphering_speed: str
    model: str
    name: str
    passenger: str
    pilot: list
    url: str
    vehicle_class: str
