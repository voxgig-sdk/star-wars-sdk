// Typed models for the StarWars SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/star-wars-sdk/go/core"
)

// Film is the typed data model for the film entity.
type Film struct {
}

// FilmLoadMatch is the typed request payload for Film.LoadTyped.
type FilmLoadMatch struct {
	Id int `json:"id"`
}

// FilmListMatch is the typed request payload for Film.ListTyped.
type FilmListMatch struct {
	Page *int `json:"page,omitempty"`
	Search *string `json:"search,omitempty"`
}

// Person is the typed data model for the person entity.
type Person struct {
}

// PersonLoadMatch is the typed request payload for Person.LoadTyped.
type PersonLoadMatch struct {
	Id int `json:"id"`
}

// PersonListMatch is the typed request payload for Person.ListTyped.
type PersonListMatch struct {
	Page *int `json:"page,omitempty"`
	Search *string `json:"search,omitempty"`
}

// Planet is the typed data model for the planet entity.
type Planet struct {
}

// PlanetLoadMatch is the typed request payload for Planet.LoadTyped.
type PlanetLoadMatch struct {
	Id int `json:"id"`
}

// PlanetListMatch is the typed request payload for Planet.ListTyped.
type PlanetListMatch struct {
	Page *int `json:"page,omitempty"`
	Search *string `json:"search,omitempty"`
}

// Species is the typed data model for the species entity.
type Species struct {
}

// SpeciesLoadMatch is the typed request payload for Species.LoadTyped.
type SpeciesLoadMatch struct {
	Id int `json:"id"`
}

// SpeciesListMatch is the typed request payload for Species.ListTyped.
type SpeciesListMatch struct {
	Page *int `json:"page,omitempty"`
	Search *string `json:"search,omitempty"`
}

// Starship is the typed data model for the starship entity.
type Starship struct {
}

// StarshipLoadMatch is the typed request payload for Starship.LoadTyped.
type StarshipLoadMatch struct {
	Id int `json:"id"`
}

// StarshipListMatch is the typed request payload for Starship.ListTyped.
type StarshipListMatch struct {
	Page *int `json:"page,omitempty"`
	Search *string `json:"search,omitempty"`
}

// Vehicle is the typed data model for the vehicle entity.
type Vehicle struct {
}

// VehicleLoadMatch is the typed request payload for Vehicle.LoadTyped.
type VehicleLoadMatch struct {
	Id int `json:"id"`
}

// VehicleListMatch is the typed request payload for Vehicle.ListTyped.
type VehicleListMatch struct {
	Page *int `json:"page,omitempty"`
	Search *string `json:"search,omitempty"`
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
