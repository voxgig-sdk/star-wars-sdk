package voxgigstarwarssdk

import (
	"github.com/voxgig-sdk/star-wars-sdk/go/core"
	"github.com/voxgig-sdk/star-wars-sdk/go/entity"
	"github.com/voxgig-sdk/star-wars-sdk/go/feature"
	_ "github.com/voxgig-sdk/star-wars-sdk/go/utility"
)

// Type aliases preserve external API.
type StarWarsSDK = core.StarWarsSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type StarWarsEntity = core.StarWarsEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type StarWarsError = core.StarWarsError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewFilmEntityFunc = func(client *core.StarWarsSDK, entopts map[string]any) core.StarWarsEntity {
		return entity.NewFilmEntity(client, entopts)
	}
	core.NewPeopleListEntityFunc = func(client *core.StarWarsSDK, entopts map[string]any) core.StarWarsEntity {
		return entity.NewPeopleListEntity(client, entopts)
	}
	core.NewPersonEntityFunc = func(client *core.StarWarsSDK, entopts map[string]any) core.StarWarsEntity {
		return entity.NewPersonEntity(client, entopts)
	}
	core.NewPlanetEntityFunc = func(client *core.StarWarsSDK, entopts map[string]any) core.StarWarsEntity {
		return entity.NewPlanetEntity(client, entopts)
	}
	core.NewSpeciesEntityFunc = func(client *core.StarWarsSDK, entopts map[string]any) core.StarWarsEntity {
		return entity.NewSpeciesEntity(client, entopts)
	}
	core.NewStarshipEntityFunc = func(client *core.StarWarsSDK, entopts map[string]any) core.StarWarsEntity {
		return entity.NewStarshipEntity(client, entopts)
	}
	core.NewVehicleEntityFunc = func(client *core.StarWarsSDK, entopts map[string]any) core.StarWarsEntity {
		return entity.NewVehicleEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewStarWarsSDK = core.NewStarWarsSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewStarWarsSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *StarWarsSDK  { return NewStarWarsSDK(nil) }
func Test() *StarWarsSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
