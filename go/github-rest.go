package voxgiggithubrestsdk

import (
	"github.com/voxgig-sdk/github-rest-sdk/core"
	"github.com/voxgig-sdk/github-rest-sdk/entity"
	"github.com/voxgig-sdk/github-rest-sdk/feature"
	_ "github.com/voxgig-sdk/github-rest-sdk/utility"
)

// Type aliases preserve external API.
type GithubRestSDK = core.GithubRestSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type GithubRestEntity = core.GithubRestEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type GithubRestError = core.GithubRestError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewBranchEntityFunc = func(client *core.GithubRestSDK, entopts map[string]any) core.GithubRestEntity {
		return entity.NewBranchEntity(client, entopts)
	}
	core.NewCommitEntityFunc = func(client *core.GithubRestSDK, entopts map[string]any) core.GithubRestEntity {
		return entity.NewCommitEntity(client, entopts)
	}
	core.NewGistEntityFunc = func(client *core.GithubRestSDK, entopts map[string]any) core.GithubRestEntity {
		return entity.NewGistEntity(client, entopts)
	}
	core.NewIssueEntityFunc = func(client *core.GithubRestSDK, entopts map[string]any) core.GithubRestEntity {
		return entity.NewIssueEntity(client, entopts)
	}
	core.NewNotificationEntityFunc = func(client *core.GithubRestSDK, entopts map[string]any) core.GithubRestEntity {
		return entity.NewNotificationEntity(client, entopts)
	}
	core.NewOrgEntityFunc = func(client *core.GithubRestSDK, entopts map[string]any) core.GithubRestEntity {
		return entity.NewOrgEntity(client, entopts)
	}
	core.NewPullEntityFunc = func(client *core.GithubRestSDK, entopts map[string]any) core.GithubRestEntity {
		return entity.NewPullEntity(client, entopts)
	}
	core.NewRateLimitEntityFunc = func(client *core.GithubRestSDK, entopts map[string]any) core.GithubRestEntity {
		return entity.NewRateLimitEntity(client, entopts)
	}
	core.NewRepoEntityFunc = func(client *core.GithubRestSDK, entopts map[string]any) core.GithubRestEntity {
		return entity.NewRepoEntity(client, entopts)
	}
	core.NewSearchEntityFunc = func(client *core.GithubRestSDK, entopts map[string]any) core.GithubRestEntity {
		return entity.NewSearchEntity(client, entopts)
	}
	core.NewUserEntityFunc = func(client *core.GithubRestSDK, entopts map[string]any) core.GithubRestEntity {
		return entity.NewUserEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewGithubRestSDK = core.NewGithubRestSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
