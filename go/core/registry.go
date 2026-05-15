package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewBranchEntityFunc func(client *GithubRestSDK, entopts map[string]any) GithubRestEntity

var NewCommitEntityFunc func(client *GithubRestSDK, entopts map[string]any) GithubRestEntity

var NewGistEntityFunc func(client *GithubRestSDK, entopts map[string]any) GithubRestEntity

var NewIssueEntityFunc func(client *GithubRestSDK, entopts map[string]any) GithubRestEntity

var NewNotificationEntityFunc func(client *GithubRestSDK, entopts map[string]any) GithubRestEntity

var NewOrgEntityFunc func(client *GithubRestSDK, entopts map[string]any) GithubRestEntity

var NewPullEntityFunc func(client *GithubRestSDK, entopts map[string]any) GithubRestEntity

var NewRateLimitEntityFunc func(client *GithubRestSDK, entopts map[string]any) GithubRestEntity

var NewRepoEntityFunc func(client *GithubRestSDK, entopts map[string]any) GithubRestEntity

var NewSearchEntityFunc func(client *GithubRestSDK, entopts map[string]any) GithubRestEntity

var NewUserEntityFunc func(client *GithubRestSDK, entopts map[string]any) GithubRestEntity

