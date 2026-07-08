// Typed models for the GithubRest SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Branch is the typed data model for the branch entity.
type Branch struct {
	Commit *map[string]any `json:"commit,omitempty"`
	Name *string `json:"name,omitempty"`
	Protected *bool `json:"protected,omitempty"`
}

// BranchListMatch is the typed request payload for Branch.ListTyped.
type BranchListMatch struct {
	Owner string `json:"owner"`
	Repo string `json:"repo"`
}

// Commit is the typed data model for the commit entity.
type Commit struct {
	Author *map[string]any `json:"author,omitempty"`
	Commit *map[string]any `json:"commit,omitempty"`
	Committer *map[string]any `json:"committer,omitempty"`
	HtmlUrl *string `json:"html_url,omitempty"`
	NodeId *string `json:"node_id,omitempty"`
	Sha *string `json:"sha,omitempty"`
	Url *string `json:"url,omitempty"`
}

// CommitListMatch is the typed request payload for Commit.ListTyped.
type CommitListMatch struct {
	Owner string `json:"owner"`
	Repo string `json:"repo"`
}

// Gist is the typed data model for the gist entity.
type Gist struct {
	CreatedAt *string `json:"created_at,omitempty"`
	Description *string `json:"description,omitempty"`
	File map[string]any `json:"file"`
	HtmlUrl *string `json:"html_url,omitempty"`
	Id *string `json:"id,omitempty"`
	NodeId *string `json:"node_id,omitempty"`
	Owner *map[string]any `json:"owner,omitempty"`
	Public *bool `json:"public,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	Url *string `json:"url,omitempty"`
}

// GistListMatch is the typed request payload for Gist.ListTyped.
type GistListMatch struct {
	CreatedAt *string `json:"created_at,omitempty"`
	Description *string `json:"description,omitempty"`
	File *map[string]any `json:"file,omitempty"`
	HtmlUrl *string `json:"html_url,omitempty"`
	Id *string `json:"id,omitempty"`
	NodeId *string `json:"node_id,omitempty"`
	Owner *map[string]any `json:"owner,omitempty"`
	Public *bool `json:"public,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	Url *string `json:"url,omitempty"`
}

// GistCreateData is the typed request payload for Gist.CreateTyped.
type GistCreateData struct {
	CreatedAt *string `json:"created_at,omitempty"`
	Description *string `json:"description,omitempty"`
	File map[string]any `json:"file"`
	HtmlUrl *string `json:"html_url,omitempty"`
	Id *string `json:"id,omitempty"`
	NodeId *string `json:"node_id,omitempty"`
	Owner *map[string]any `json:"owner,omitempty"`
	Public *bool `json:"public,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	Url *string `json:"url,omitempty"`
}

// Issue is the typed data model for the issue entity.
type Issue struct {
	Assignee *any `json:"assignee,omitempty"`
	Body *string `json:"body,omitempty"`
	ClosedAt *string `json:"closed_at,omitempty"`
	Comment *int `json:"comment,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	HtmlUrl *string `json:"html_url,omitempty"`
	Id *int `json:"id,omitempty"`
	Label *[]any `json:"label,omitempty"`
	Milestone *map[string]any `json:"milestone,omitempty"`
	NodeId *string `json:"node_id,omitempty"`
	Number *int `json:"number,omitempty"`
	State *string `json:"state,omitempty"`
	Title *string `json:"title,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	Url *string `json:"url,omitempty"`
	User *map[string]any `json:"user,omitempty"`
}

// IssueLoadMatch is the typed request payload for Issue.LoadTyped.
type IssueLoadMatch struct {
	Id int `json:"id"`
	Owner string `json:"owner"`
	Repo string `json:"repo"`
}

// IssueListMatch is the typed request payload for Issue.ListTyped.
type IssueListMatch struct {
	Owner string `json:"owner"`
	Repo string `json:"repo"`
}

// IssueCreateData is the typed request payload for Issue.CreateTyped.
type IssueCreateData struct {
	Owner string `json:"owner"`
	Repo string `json:"repo"`
}

// IssueUpdateData is the typed request payload for Issue.UpdateTyped.
type IssueUpdateData struct {
	Id int `json:"id"`
	Owner string `json:"owner"`
	Repo string `json:"repo"`
}

// Notification is the typed data model for the notification entity.
type Notification struct {
	Id *string `json:"id,omitempty"`
	LastReadAt *string `json:"last_read_at,omitempty"`
	Reason *string `json:"reason,omitempty"`
	Repository *map[string]any `json:"repository,omitempty"`
	Subject *map[string]any `json:"subject,omitempty"`
	Unread *bool `json:"unread,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	Url *string `json:"url,omitempty"`
}

// NotificationListMatch is the typed request payload for Notification.ListTyped.
type NotificationListMatch struct {
	Id *string `json:"id,omitempty"`
	LastReadAt *string `json:"last_read_at,omitempty"`
	Reason *string `json:"reason,omitempty"`
	Repository *map[string]any `json:"repository,omitempty"`
	Subject *map[string]any `json:"subject,omitempty"`
	Unread *bool `json:"unread,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	Url *string `json:"url,omitempty"`
}

// Org is the typed data model for the org entity.
type Org struct {
	AvatarUrl *string `json:"avatar_url,omitempty"`
	Blog *string `json:"blog,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	Description *string `json:"description,omitempty"`
	Email *string `json:"email,omitempty"`
	Follower *int `json:"follower,omitempty"`
	Following *int `json:"following,omitempty"`
	HtmlUrl *string `json:"html_url,omitempty"`
	Id *int `json:"id,omitempty"`
	Location *string `json:"location,omitempty"`
	Login *string `json:"login,omitempty"`
	Name *string `json:"name,omitempty"`
	NodeId *string `json:"node_id,omitempty"`
	PublicGist *int `json:"public_gist,omitempty"`
	PublicRepo *int `json:"public_repo,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	Url *string `json:"url,omitempty"`
}

// OrgLoadMatch is the typed request payload for Org.LoadTyped.
type OrgLoadMatch struct {
	Id string `json:"id"`
}

// Pull is the typed data model for the pull entity.
type Pull struct {
	Base *map[string]any `json:"base,omitempty"`
	Body *string `json:"body,omitempty"`
	ClosedAt *string `json:"closed_at,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	Draft *bool `json:"draft,omitempty"`
	Head *map[string]any `json:"head,omitempty"`
	HtmlUrl *string `json:"html_url,omitempty"`
	Id *int `json:"id,omitempty"`
	MergedAt *string `json:"merged_at,omitempty"`
	NodeId *string `json:"node_id,omitempty"`
	Number *int `json:"number,omitempty"`
	State *string `json:"state,omitempty"`
	Title *string `json:"title,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	Url *string `json:"url,omitempty"`
	User *map[string]any `json:"user,omitempty"`
}

// PullLoadMatch is the typed request payload for Pull.LoadTyped.
type PullLoadMatch struct {
	Id int `json:"id"`
	Owner string `json:"owner"`
	Repo string `json:"repo"`
}

// PullListMatch is the typed request payload for Pull.ListTyped.
type PullListMatch struct {
	Owner string `json:"owner"`
	Repo string `json:"repo"`
}

// PullCreateData is the typed request payload for Pull.CreateTyped.
type PullCreateData struct {
	Owner string `json:"owner"`
	Repo string `json:"repo"`
}

// RateLimit is the typed data model for the rate_limit entity.
type RateLimit struct {
	Rate *map[string]any `json:"rate,omitempty"`
	Resource *map[string]any `json:"resource,omitempty"`
}

// RateLimitLoadMatch is the typed request payload for RateLimit.LoadTyped.
type RateLimitLoadMatch struct {
	Rate *map[string]any `json:"rate,omitempty"`
	Resource *map[string]any `json:"resource,omitempty"`
}

// Repo is the typed data model for the repo entity.
type Repo struct {
	CreatedAt *string `json:"created_at,omitempty"`
	DefaultBranch *string `json:"default_branch,omitempty"`
	Description *string `json:"description,omitempty"`
	Fork *bool `json:"fork,omitempty"`
	ForksCount *int `json:"forks_count,omitempty"`
	FullName *string `json:"full_name,omitempty"`
	HtmlUrl *string `json:"html_url,omitempty"`
	Id *int `json:"id,omitempty"`
	Language *string `json:"language,omitempty"`
	Name *string `json:"name,omitempty"`
	NodeId *string `json:"node_id,omitempty"`
	OpenIssuesCount *int `json:"open_issues_count,omitempty"`
	Owner *map[string]any `json:"owner,omitempty"`
	Private *bool `json:"private,omitempty"`
	PushedAt *string `json:"pushed_at,omitempty"`
	Size *int `json:"size,omitempty"`
	StargazersCount *int `json:"stargazers_count,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	Url *string `json:"url,omitempty"`
	Visibility *string `json:"visibility,omitempty"`
	WatchersCount *int `json:"watchers_count,omitempty"`
}

// RepoLoadMatch is the typed request payload for Repo.LoadTyped.
type RepoLoadMatch struct {
	Owner string `json:"owner"`
	Repo string `json:"repo"`
}

// RepoListMatch is the typed request payload for Repo.ListTyped.
type RepoListMatch struct {
	Username *string `json:"username,omitempty"`
	OrgId *string `json:"org_id,omitempty"`
}

// Search is the typed data model for the search entity.
type Search struct {
	Assignee *any `json:"assignee,omitempty"`
	Body *string `json:"body,omitempty"`
	ClosedAt *string `json:"closed_at,omitempty"`
	Comment *int `json:"comment,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	DefaultBranch *string `json:"default_branch,omitempty"`
	Description *string `json:"description,omitempty"`
	Fork *bool `json:"fork,omitempty"`
	ForksCount *int `json:"forks_count,omitempty"`
	FullName *string `json:"full_name,omitempty"`
	HtmlUrl *string `json:"html_url,omitempty"`
	Id *int `json:"id,omitempty"`
	Label *[]any `json:"label,omitempty"`
	Language *string `json:"language,omitempty"`
	Milestone *map[string]any `json:"milestone,omitempty"`
	Name *string `json:"name,omitempty"`
	NodeId *string `json:"node_id,omitempty"`
	Number *int `json:"number,omitempty"`
	OpenIssuesCount *int `json:"open_issues_count,omitempty"`
	Owner *map[string]any `json:"owner,omitempty"`
	Private *bool `json:"private,omitempty"`
	PushedAt *string `json:"pushed_at,omitempty"`
	Size *int `json:"size,omitempty"`
	StargazersCount *int `json:"stargazers_count,omitempty"`
	State *string `json:"state,omitempty"`
	Title *string `json:"title,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	Url *string `json:"url,omitempty"`
	User *map[string]any `json:"user,omitempty"`
	Visibility *string `json:"visibility,omitempty"`
	WatchersCount *int `json:"watchers_count,omitempty"`
}

// SearchListMatch is the typed request payload for Search.ListTyped.
type SearchListMatch struct {
	Assignee *any `json:"assignee,omitempty"`
	Body *string `json:"body,omitempty"`
	ClosedAt *string `json:"closed_at,omitempty"`
	Comment *int `json:"comment,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	DefaultBranch *string `json:"default_branch,omitempty"`
	Description *string `json:"description,omitempty"`
	Fork *bool `json:"fork,omitempty"`
	ForksCount *int `json:"forks_count,omitempty"`
	FullName *string `json:"full_name,omitempty"`
	HtmlUrl *string `json:"html_url,omitempty"`
	Id *int `json:"id,omitempty"`
	Label *[]any `json:"label,omitempty"`
	Language *string `json:"language,omitempty"`
	Milestone *map[string]any `json:"milestone,omitempty"`
	Name *string `json:"name,omitempty"`
	NodeId *string `json:"node_id,omitempty"`
	Number *int `json:"number,omitempty"`
	OpenIssuesCount *int `json:"open_issues_count,omitempty"`
	Owner *map[string]any `json:"owner,omitempty"`
	Private *bool `json:"private,omitempty"`
	PushedAt *string `json:"pushed_at,omitempty"`
	Size *int `json:"size,omitempty"`
	StargazersCount *int `json:"stargazers_count,omitempty"`
	State *string `json:"state,omitempty"`
	Title *string `json:"title,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	Url *string `json:"url,omitempty"`
	User *map[string]any `json:"user,omitempty"`
	Visibility *string `json:"visibility,omitempty"`
	WatchersCount *int `json:"watchers_count,omitempty"`
}

// User is the typed data model for the user entity.
type User struct {
	AvatarUrl *string `json:"avatar_url,omitempty"`
	Bio *string `json:"bio,omitempty"`
	Blog *string `json:"blog,omitempty"`
	Company *string `json:"company,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	Email *string `json:"email,omitempty"`
	Follower *int `json:"follower,omitempty"`
	Following *int `json:"following,omitempty"`
	HtmlUrl *string `json:"html_url,omitempty"`
	Id *int `json:"id,omitempty"`
	Location *string `json:"location,omitempty"`
	Login *string `json:"login,omitempty"`
	Name *string `json:"name,omitempty"`
	NodeId *string `json:"node_id,omitempty"`
	PublicGist *int `json:"public_gist,omitempty"`
	PublicRepo *int `json:"public_repo,omitempty"`
	Type *string `json:"type,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	Url *string `json:"url,omitempty"`
}

// UserLoadMatch is the typed request payload for User.LoadTyped.
type UserLoadMatch struct {
	Id *string `json:"id,omitempty"`
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
