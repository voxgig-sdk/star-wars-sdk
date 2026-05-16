package core

type StarWarsError struct {
	IsStarWarsError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewStarWarsError(code string, msg string, ctx *Context) *StarWarsError {
	return &StarWarsError{
		IsStarWarsError: true,
		Sdk:              "StarWars",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *StarWarsError) Error() string {
	return e.Msg
}
