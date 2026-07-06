// Typed models for the StarWars SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Film is the typed data model for the film entity.
type Film struct {
	Character *[]any `json:"character,omitempty"`
	Created *string `json:"created,omitempty"`
	Director *string `json:"director,omitempty"`
	Edited *string `json:"edited,omitempty"`
	EpisodeId *int `json:"episode_id,omitempty"`
	OpeningCrawl *string `json:"opening_crawl,omitempty"`
	Planet *[]any `json:"planet,omitempty"`
	Producer *string `json:"producer,omitempty"`
	ReleaseDate *string `json:"release_date,omitempty"`
	Species *[]any `json:"species,omitempty"`
	Starship *[]any `json:"starship,omitempty"`
	Title *string `json:"title,omitempty"`
	Url *string `json:"url,omitempty"`
	Vehicle *[]any `json:"vehicle,omitempty"`
}

// FilmLoadMatch is the typed request payload for Film.LoadTyped.
type FilmLoadMatch struct {
	Id int `json:"id"`
}

// FilmListMatch is the typed request payload for Film.ListTyped.
type FilmListMatch struct {
	Character *[]any `json:"character,omitempty"`
	Created *string `json:"created,omitempty"`
	Director *string `json:"director,omitempty"`
	Edited *string `json:"edited,omitempty"`
	EpisodeId *int `json:"episode_id,omitempty"`
	OpeningCrawl *string `json:"opening_crawl,omitempty"`
	Planet *[]any `json:"planet,omitempty"`
	Producer *string `json:"producer,omitempty"`
	ReleaseDate *string `json:"release_date,omitempty"`
	Species *[]any `json:"species,omitempty"`
	Starship *[]any `json:"starship,omitempty"`
	Title *string `json:"title,omitempty"`
	Url *string `json:"url,omitempty"`
	Vehicle *[]any `json:"vehicle,omitempty"`
}

// PeopleList is the typed data model for the people_list entity.
type PeopleList struct {
}

// Person is the typed data model for the person entity.
type Person struct {
	BirthYear *string `json:"birth_year,omitempty"`
	Created *string `json:"created,omitempty"`
	Edited *string `json:"edited,omitempty"`
	EyeColor *string `json:"eye_color,omitempty"`
	Film *[]any `json:"film,omitempty"`
	Gender *string `json:"gender,omitempty"`
	HairColor *string `json:"hair_color,omitempty"`
	Height *string `json:"height,omitempty"`
	Homeworld *string `json:"homeworld,omitempty"`
	Mass *string `json:"mass,omitempty"`
	Name *string `json:"name,omitempty"`
	SkinColor *string `json:"skin_color,omitempty"`
	Species *[]any `json:"species,omitempty"`
	Starship *[]any `json:"starship,omitempty"`
	Url *string `json:"url,omitempty"`
	Vehicle *[]any `json:"vehicle,omitempty"`
}

// PersonLoadMatch is the typed request payload for Person.LoadTyped.
type PersonLoadMatch struct {
	Id int `json:"id"`
}

// PersonListMatch is the typed request payload for Person.ListTyped.
type PersonListMatch struct {
	BirthYear *string `json:"birth_year,omitempty"`
	Created *string `json:"created,omitempty"`
	Edited *string `json:"edited,omitempty"`
	EyeColor *string `json:"eye_color,omitempty"`
	Film *[]any `json:"film,omitempty"`
	Gender *string `json:"gender,omitempty"`
	HairColor *string `json:"hair_color,omitempty"`
	Height *string `json:"height,omitempty"`
	Homeworld *string `json:"homeworld,omitempty"`
	Mass *string `json:"mass,omitempty"`
	Name *string `json:"name,omitempty"`
	SkinColor *string `json:"skin_color,omitempty"`
	Species *[]any `json:"species,omitempty"`
	Starship *[]any `json:"starship,omitempty"`
	Url *string `json:"url,omitempty"`
	Vehicle *[]any `json:"vehicle,omitempty"`
}

// Planet is the typed data model for the planet entity.
type Planet struct {
	Climate *string `json:"climate,omitempty"`
	Created *string `json:"created,omitempty"`
	Diameter *string `json:"diameter,omitempty"`
	Edited *string `json:"edited,omitempty"`
	Film *[]any `json:"film,omitempty"`
	Gravity *string `json:"gravity,omitempty"`
	Name *string `json:"name,omitempty"`
	OrbitalPeriod *string `json:"orbital_period,omitempty"`
	Population *string `json:"population,omitempty"`
	Resident *[]any `json:"resident,omitempty"`
	RotationPeriod *string `json:"rotation_period,omitempty"`
	SurfaceWater *string `json:"surface_water,omitempty"`
	Terrain *string `json:"terrain,omitempty"`
	Url *string `json:"url,omitempty"`
}

// PlanetLoadMatch is the typed request payload for Planet.LoadTyped.
type PlanetLoadMatch struct {
	Id int `json:"id"`
}

// PlanetListMatch is the typed request payload for Planet.ListTyped.
type PlanetListMatch struct {
	Climate *string `json:"climate,omitempty"`
	Created *string `json:"created,omitempty"`
	Diameter *string `json:"diameter,omitempty"`
	Edited *string `json:"edited,omitempty"`
	Film *[]any `json:"film,omitempty"`
	Gravity *string `json:"gravity,omitempty"`
	Name *string `json:"name,omitempty"`
	OrbitalPeriod *string `json:"orbital_period,omitempty"`
	Population *string `json:"population,omitempty"`
	Resident *[]any `json:"resident,omitempty"`
	RotationPeriod *string `json:"rotation_period,omitempty"`
	SurfaceWater *string `json:"surface_water,omitempty"`
	Terrain *string `json:"terrain,omitempty"`
	Url *string `json:"url,omitempty"`
}

// Species is the typed data model for the species entity.
type Species struct {
	AverageHeight *string `json:"average_height,omitempty"`
	AverageLifespan *string `json:"average_lifespan,omitempty"`
	Classification *string `json:"classification,omitempty"`
	Created *string `json:"created,omitempty"`
	Designation *string `json:"designation,omitempty"`
	Edited *string `json:"edited,omitempty"`
	EyeColor *string `json:"eye_color,omitempty"`
	Film *[]any `json:"film,omitempty"`
	HairColor *string `json:"hair_color,omitempty"`
	Homeworld *string `json:"homeworld,omitempty"`
	Language *string `json:"language,omitempty"`
	Name *string `json:"name,omitempty"`
	Person *[]any `json:"person,omitempty"`
	SkinColor *string `json:"skin_color,omitempty"`
	Url *string `json:"url,omitempty"`
}

// SpeciesLoadMatch is the typed request payload for Species.LoadTyped.
type SpeciesLoadMatch struct {
	Id int `json:"id"`
}

// SpeciesListMatch is the typed request payload for Species.ListTyped.
type SpeciesListMatch struct {
	AverageHeight *string `json:"average_height,omitempty"`
	AverageLifespan *string `json:"average_lifespan,omitempty"`
	Classification *string `json:"classification,omitempty"`
	Created *string `json:"created,omitempty"`
	Designation *string `json:"designation,omitempty"`
	Edited *string `json:"edited,omitempty"`
	EyeColor *string `json:"eye_color,omitempty"`
	Film *[]any `json:"film,omitempty"`
	HairColor *string `json:"hair_color,omitempty"`
	Homeworld *string `json:"homeworld,omitempty"`
	Language *string `json:"language,omitempty"`
	Name *string `json:"name,omitempty"`
	Person *[]any `json:"person,omitempty"`
	SkinColor *string `json:"skin_color,omitempty"`
	Url *string `json:"url,omitempty"`
}

// Starship is the typed data model for the starship entity.
type Starship struct {
	CargoCapacity *string `json:"cargo_capacity,omitempty"`
	Consumable *string `json:"consumable,omitempty"`
	CostInCredit *string `json:"cost_in_credit,omitempty"`
	Created *string `json:"created,omitempty"`
	Crew *string `json:"crew,omitempty"`
	Edited *string `json:"edited,omitempty"`
	Film *[]any `json:"film,omitempty"`
	HyperdriveRating *string `json:"hyperdrive_rating,omitempty"`
	Length *string `json:"length,omitempty"`
	Manufacturer *string `json:"manufacturer,omitempty"`
	MaxAtmospheringSpeed *string `json:"max_atmosphering_speed,omitempty"`
	Mglt *string `json:"mglt,omitempty"`
	Model *string `json:"model,omitempty"`
	Name *string `json:"name,omitempty"`
	Passenger *string `json:"passenger,omitempty"`
	Pilot *[]any `json:"pilot,omitempty"`
	StarshipClass *string `json:"starship_class,omitempty"`
	Url *string `json:"url,omitempty"`
}

// StarshipLoadMatch is the typed request payload for Starship.LoadTyped.
type StarshipLoadMatch struct {
	Id int `json:"id"`
}

// StarshipListMatch is the typed request payload for Starship.ListTyped.
type StarshipListMatch struct {
	CargoCapacity *string `json:"cargo_capacity,omitempty"`
	Consumable *string `json:"consumable,omitempty"`
	CostInCredit *string `json:"cost_in_credit,omitempty"`
	Created *string `json:"created,omitempty"`
	Crew *string `json:"crew,omitempty"`
	Edited *string `json:"edited,omitempty"`
	Film *[]any `json:"film,omitempty"`
	HyperdriveRating *string `json:"hyperdrive_rating,omitempty"`
	Length *string `json:"length,omitempty"`
	Manufacturer *string `json:"manufacturer,omitempty"`
	MaxAtmospheringSpeed *string `json:"max_atmosphering_speed,omitempty"`
	Mglt *string `json:"mglt,omitempty"`
	Model *string `json:"model,omitempty"`
	Name *string `json:"name,omitempty"`
	Passenger *string `json:"passenger,omitempty"`
	Pilot *[]any `json:"pilot,omitempty"`
	StarshipClass *string `json:"starship_class,omitempty"`
	Url *string `json:"url,omitempty"`
}

// Vehicle is the typed data model for the vehicle entity.
type Vehicle struct {
	CargoCapacity *string `json:"cargo_capacity,omitempty"`
	Consumable *string `json:"consumable,omitempty"`
	CostInCredit *string `json:"cost_in_credit,omitempty"`
	Created *string `json:"created,omitempty"`
	Crew *string `json:"crew,omitempty"`
	Edited *string `json:"edited,omitempty"`
	Film *[]any `json:"film,omitempty"`
	Length *string `json:"length,omitempty"`
	Manufacturer *string `json:"manufacturer,omitempty"`
	MaxAtmospheringSpeed *string `json:"max_atmosphering_speed,omitempty"`
	Model *string `json:"model,omitempty"`
	Name *string `json:"name,omitempty"`
	Passenger *string `json:"passenger,omitempty"`
	Pilot *[]any `json:"pilot,omitempty"`
	Url *string `json:"url,omitempty"`
	VehicleClass *string `json:"vehicle_class,omitempty"`
}

// VehicleLoadMatch is the typed request payload for Vehicle.LoadTyped.
type VehicleLoadMatch struct {
	Id int `json:"id"`
}

// VehicleListMatch is the typed request payload for Vehicle.ListTyped.
type VehicleListMatch struct {
	CargoCapacity *string `json:"cargo_capacity,omitempty"`
	Consumable *string `json:"consumable,omitempty"`
	CostInCredit *string `json:"cost_in_credit,omitempty"`
	Created *string `json:"created,omitempty"`
	Crew *string `json:"crew,omitempty"`
	Edited *string `json:"edited,omitempty"`
	Film *[]any `json:"film,omitempty"`
	Length *string `json:"length,omitempty"`
	Manufacturer *string `json:"manufacturer,omitempty"`
	MaxAtmospheringSpeed *string `json:"max_atmosphering_speed,omitempty"`
	Model *string `json:"model,omitempty"`
	Name *string `json:"name,omitempty"`
	Passenger *string `json:"passenger,omitempty"`
	Pilot *[]any `json:"pilot,omitempty"`
	Url *string `json:"url,omitempty"`
	VehicleClass *string `json:"vehicle_class,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
