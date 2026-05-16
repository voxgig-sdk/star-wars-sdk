package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewFilmEntityFunc func(client *StarWarsSDK, entopts map[string]any) StarWarsEntity

var NewPeopleListEntityFunc func(client *StarWarsSDK, entopts map[string]any) StarWarsEntity

var NewPersonEntityFunc func(client *StarWarsSDK, entopts map[string]any) StarWarsEntity

var NewPlanetEntityFunc func(client *StarWarsSDK, entopts map[string]any) StarWarsEntity

var NewSpeciesEntityFunc func(client *StarWarsSDK, entopts map[string]any) StarWarsEntity

var NewStarshipEntityFunc func(client *StarWarsSDK, entopts map[string]any) StarWarsEntity

var NewVehicleEntityFunc func(client *StarWarsSDK, entopts map[string]any) StarWarsEntity

