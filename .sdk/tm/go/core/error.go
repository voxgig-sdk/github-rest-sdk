package core

type GithubRestError struct {
	IsGithubRestError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewGithubRestError(code string, msg string, ctx *Context) *GithubRestError {
	return &GithubRestError{
		IsGithubRestError: true,
		Sdk:              "GithubRest",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *GithubRestError) Error() string {
	return e.Msg
}
