# GithubRest Golang SDK



The Golang SDK for the GithubRest API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Branch(nil)` — each with the same small set of operations (`List`, `Load`, `Create`, `Update`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/github-rest-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/github-rest-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/github-rest-sdk/go=../github-rest-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    "os"
    sdk "github.com/voxgig-sdk/github-rest-sdk/go"
)

func main() {
    client := sdk.NewGithubRestSDK(map[string]any{
        "apikey": os.Getenv("GITHUB_REST_APIKEY"),
    })

    // List branch records — the value is the array of records itself.
    branchs, err := client.Branch(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range branchs.([]any) {
        fmt.Println(item)
    }
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
branchs, err := client.Branch(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = branchs
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

branch, err := client.Branch(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(branch) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewGithubRestSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
GITHUB_REST_TEST_LIVE=TRUE
GITHUB_REST_APIKEY=<your-key>
```

Then run:

```bash
cd go && go test ./test/...
```


## Reference

### NewGithubRestSDK

```go
func NewGithubRestSDK(options map[string]any) *GithubRestSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *GithubRestSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### GithubRestSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Branch` | `(data map[string]any) GithubRestEntity` | Create a Branch entity instance. |
| `Commit` | `(data map[string]any) GithubRestEntity` | Create a Commit entity instance. |
| `Gist` | `(data map[string]any) GithubRestEntity` | Create a Gist entity instance. |
| `Issue` | `(data map[string]any) GithubRestEntity` | Create an Issue entity instance. |
| `Notification` | `(data map[string]any) GithubRestEntity` | Create a Notification entity instance. |
| `Org` | `(data map[string]any) GithubRestEntity` | Create an Org entity instance. |
| `Pull` | `(data map[string]any) GithubRestEntity` | Create a Pull entity instance. |
| `RateLimit` | `(data map[string]any) GithubRestEntity` | Create a RateLimit entity instance. |
| `Repo` | `(data map[string]any) GithubRestEntity` | Create a Repo entity instance. |
| `Search` | `(data map[string]any) GithubRestEntity` | Create a Search entity instance. |
| `User` | `(data map[string]any) GithubRestEntity` | Create an User entity instance. |

### Entity interface (GithubRestEntity)

All entities implement the `GithubRestEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` / `Update` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    branch, err := client.Branch(nil).List(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // branch is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Branch

| Field | Description |
| --- | --- |
| `"commit"` |  |
| `"name"` |  |
| `"protected"` |  |

Operations: List.

API path: `/repos/{owner}/{repo}/branches`

#### Commit

| Field | Description |
| --- | --- |
| `"author"` |  |
| `"commit"` |  |
| `"committer"` |  |
| `"html_url"` |  |
| `"node_id"` |  |
| `"sha"` |  |
| `"url"` |  |

Operations: List.

API path: `/repos/{owner}/{repo}/commits`

#### Gist

| Field | Description |
| --- | --- |
| `"created_at"` |  |
| `"description"` |  |
| `"file"` |  |
| `"html_url"` |  |
| `"id"` |  |
| `"node_id"` |  |
| `"owner"` |  |
| `"public"` |  |
| `"updated_at"` |  |
| `"url"` |  |

Operations: Create, List.

API path: `/gists`

#### Issue

| Field | Description |
| --- | --- |
| `"assignee"` |  |
| `"body"` |  |
| `"closed_at"` |  |
| `"comment"` |  |
| `"created_at"` |  |
| `"html_url"` |  |
| `"id"` |  |
| `"label"` |  |
| `"milestone"` |  |
| `"node_id"` |  |
| `"number"` |  |
| `"state"` |  |
| `"title"` |  |
| `"updated_at"` |  |
| `"url"` |  |
| `"user"` |  |

Operations: Create, List, Load, Update.

API path: `/repos/{owner}/{repo}/issues`

#### Notification

| Field | Description |
| --- | --- |
| `"id"` |  |
| `"last_read_at"` |  |
| `"reason"` |  |
| `"repository"` |  |
| `"subject"` |  |
| `"unread"` |  |
| `"updated_at"` |  |
| `"url"` |  |

Operations: List.

API path: `/notifications`

#### Org

| Field | Description |
| --- | --- |
| `"avatar_url"` |  |
| `"blog"` |  |
| `"created_at"` |  |
| `"description"` |  |
| `"email"` |  |
| `"follower"` |  |
| `"following"` |  |
| `"html_url"` |  |
| `"id"` |  |
| `"location"` |  |
| `"login"` |  |
| `"name"` |  |
| `"node_id"` |  |
| `"public_gist"` |  |
| `"public_repo"` |  |
| `"updated_at"` |  |
| `"url"` |  |

Operations: Load.

API path: `/orgs/{org}`

#### Pull

| Field | Description |
| --- | --- |
| `"base"` |  |
| `"body"` |  |
| `"closed_at"` |  |
| `"created_at"` |  |
| `"draft"` |  |
| `"head"` |  |
| `"html_url"` |  |
| `"id"` |  |
| `"merged_at"` |  |
| `"node_id"` |  |
| `"number"` |  |
| `"state"` |  |
| `"title"` |  |
| `"updated_at"` |  |
| `"url"` |  |
| `"user"` |  |

Operations: Create, List, Load.

API path: `/repos/{owner}/{repo}/pulls`

#### RateLimit

| Field | Description |
| --- | --- |
| `"rate"` |  |
| `"resource"` |  |

Operations: Load.

API path: `/rate_limit`

#### Repo

| Field | Description |
| --- | --- |
| `"created_at"` |  |
| `"default_branch"` |  |
| `"description"` |  |
| `"fork"` |  |
| `"forks_count"` |  |
| `"full_name"` |  |
| `"html_url"` |  |
| `"id"` |  |
| `"language"` |  |
| `"name"` |  |
| `"node_id"` |  |
| `"open_issues_count"` |  |
| `"owner"` |  |
| `"private"` |  |
| `"pushed_at"` |  |
| `"size"` |  |
| `"stargazers_count"` |  |
| `"updated_at"` |  |
| `"url"` |  |
| `"visibility"` |  |
| `"watchers_count"` |  |

Operations: List, Load.

API path: `/users/{username}/repos`

#### Search

| Field | Description |
| --- | --- |
| `"assignee"` |  |
| `"body"` |  |
| `"closed_at"` |  |
| `"comment"` |  |
| `"created_at"` |  |
| `"default_branch"` |  |
| `"description"` |  |
| `"fork"` |  |
| `"forks_count"` |  |
| `"full_name"` |  |
| `"html_url"` |  |
| `"id"` |  |
| `"label"` |  |
| `"language"` |  |
| `"milestone"` |  |
| `"name"` |  |
| `"node_id"` |  |
| `"number"` |  |
| `"open_issues_count"` |  |
| `"owner"` |  |
| `"private"` |  |
| `"pushed_at"` |  |
| `"size"` |  |
| `"stargazers_count"` |  |
| `"state"` |  |
| `"title"` |  |
| `"updated_at"` |  |
| `"url"` |  |
| `"user"` |  |
| `"visibility"` |  |
| `"watchers_count"` |  |

Operations: List.

API path: `/search/issues`

#### User

| Field | Description |
| --- | --- |
| `"avatar_url"` |  |
| `"bio"` |  |
| `"blog"` |  |
| `"company"` |  |
| `"created_at"` |  |
| `"email"` |  |
| `"follower"` |  |
| `"following"` |  |
| `"html_url"` |  |
| `"id"` |  |
| `"location"` |  |
| `"login"` |  |
| `"name"` |  |
| `"node_id"` |  |
| `"public_gist"` |  |
| `"public_repo"` |  |
| `"type"` |  |
| `"updated_at"` |  |
| `"url"` |  |

Operations: Load.

API path: `/users/{username}`



## Entities


### Branch

Create an instance: `branch := client.Branch(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `commit` | `map[string]any` |  |
| `name` | `string` |  |
| `protected` | `bool` |  |

#### Example: List

```go
branchs, err := client.Branch(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(branchs) // the array of records
```


### Commit

Create an instance: `commit := client.Commit(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `author` | `map[string]any` |  |
| `commit` | `map[string]any` |  |
| `committer` | `map[string]any` |  |
| `html_url` | `string` |  |
| `node_id` | `string` |  |
| `sha` | `string` |  |
| `url` | `string` |  |

#### Example: List

```go
commits, err := client.Commit(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(commits) // the array of records
```


### Gist

Create an instance: `gist := client.Gist(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` |  |
| `description` | `string` |  |
| `file` | `map[string]any` |  |
| `html_url` | `string` |  |
| `id` | `string` |  |
| `node_id` | `string` |  |
| `owner` | `map[string]any` |  |
| `public` | `bool` |  |
| `updated_at` | `string` |  |
| `url` | `string` |  |

#### Example: List

```go
gists, err := client.Gist(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(gists) // the array of records
```

#### Example: Create

```go
result, err := client.Gist(nil).Create(map[string]any{
    "file": /* map[string]any */,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Issue

Create an instance: `issue := client.Issue(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `assignee` | `any` |  |
| `body` | `string` |  |
| `closed_at` | `string` |  |
| `comment` | `int` |  |
| `created_at` | `string` |  |
| `html_url` | `string` |  |
| `id` | `int` |  |
| `label` | `[]any` |  |
| `milestone` | `map[string]any` |  |
| `node_id` | `string` |  |
| `number` | `int` |  |
| `state` | `string` |  |
| `title` | `string` |  |
| `updated_at` | `string` |  |
| `url` | `string` |  |
| `user` | `map[string]any` |  |

#### Example: Load

```go
issue, err := client.Issue(nil).Load(map[string]any{"id": 1, "owner": "owner", "repo": "repo"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(issue) // the loaded record
```

#### Example: List

```go
issues, err := client.Issue(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(issues) // the array of records
```

#### Example: Create

```go
result, err := client.Issue(nil).Create(map[string]any{
    "owner": /* string */,
    "repo": /* string */,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Notification

Create an instance: `notification := client.Notification(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `last_read_at` | `string` |  |
| `reason` | `string` |  |
| `repository` | `map[string]any` |  |
| `subject` | `map[string]any` |  |
| `unread` | `bool` |  |
| `updated_at` | `string` |  |
| `url` | `string` |  |

#### Example: List

```go
notifications, err := client.Notification(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(notifications) // the array of records
```


### Org

Create an instance: `org := client.Org(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `avatar_url` | `string` |  |
| `blog` | `string` |  |
| `created_at` | `string` |  |
| `description` | `string` |  |
| `email` | `string` |  |
| `follower` | `int` |  |
| `following` | `int` |  |
| `html_url` | `string` |  |
| `id` | `int` |  |
| `location` | `string` |  |
| `login` | `string` |  |
| `name` | `string` |  |
| `node_id` | `string` |  |
| `public_gist` | `int` |  |
| `public_repo` | `int` |  |
| `updated_at` | `string` |  |
| `url` | `string` |  |

#### Example: Load

```go
org, err := client.Org(nil).Load(map[string]any{"id": "org_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(org) // the loaded record
```


### Pull

Create an instance: `pull := client.Pull(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base` | `map[string]any` |  |
| `body` | `string` |  |
| `closed_at` | `string` |  |
| `created_at` | `string` |  |
| `draft` | `bool` |  |
| `head` | `map[string]any` |  |
| `html_url` | `string` |  |
| `id` | `int` |  |
| `merged_at` | `string` |  |
| `node_id` | `string` |  |
| `number` | `int` |  |
| `state` | `string` |  |
| `title` | `string` |  |
| `updated_at` | `string` |  |
| `url` | `string` |  |
| `user` | `map[string]any` |  |

#### Example: Load

```go
pull, err := client.Pull(nil).Load(map[string]any{"id": 1, "owner": "owner", "repo": "repo"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(pull) // the loaded record
```

#### Example: List

```go
pulls, err := client.Pull(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(pulls) // the array of records
```

#### Example: Create

```go
result, err := client.Pull(nil).Create(map[string]any{
    "owner": /* string */,
    "repo": /* string */,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### RateLimit

Create an instance: `rateLimit := client.RateLimit(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `rate` | `map[string]any` |  |
| `resource` | `map[string]any` |  |

#### Example: Load

```go
rateLimit, err := client.RateLimit(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(rateLimit) // the loaded record
```


### Repo

Create an instance: `repo := client.Repo(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` |  |
| `default_branch` | `string` |  |
| `description` | `string` |  |
| `fork` | `bool` |  |
| `forks_count` | `int` |  |
| `full_name` | `string` |  |
| `html_url` | `string` |  |
| `id` | `int` |  |
| `language` | `string` |  |
| `name` | `string` |  |
| `node_id` | `string` |  |
| `open_issues_count` | `int` |  |
| `owner` | `map[string]any` |  |
| `private` | `bool` |  |
| `pushed_at` | `string` |  |
| `size` | `int` |  |
| `stargazers_count` | `int` |  |
| `updated_at` | `string` |  |
| `url` | `string` |  |
| `visibility` | `string` |  |
| `watchers_count` | `int` |  |

#### Example: Load

```go
repo, err := client.Repo(nil).Load(map[string]any{"owner": "owner", "repo": "repo"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(repo) // the loaded record
```

#### Example: List

```go
repos, err := client.Repo(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(repos) // the array of records
```


### Search

Create an instance: `search := client.Search(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `assignee` | `any` |  |
| `body` | `string` |  |
| `closed_at` | `string` |  |
| `comment` | `int` |  |
| `created_at` | `string` |  |
| `default_branch` | `string` |  |
| `description` | `string` |  |
| `fork` | `bool` |  |
| `forks_count` | `int` |  |
| `full_name` | `string` |  |
| `html_url` | `string` |  |
| `id` | `int` |  |
| `label` | `[]any` |  |
| `language` | `string` |  |
| `milestone` | `map[string]any` |  |
| `name` | `string` |  |
| `node_id` | `string` |  |
| `number` | `int` |  |
| `open_issues_count` | `int` |  |
| `owner` | `map[string]any` |  |
| `private` | `bool` |  |
| `pushed_at` | `string` |  |
| `size` | `int` |  |
| `stargazers_count` | `int` |  |
| `state` | `string` |  |
| `title` | `string` |  |
| `updated_at` | `string` |  |
| `url` | `string` |  |
| `user` | `map[string]any` |  |
| `visibility` | `string` |  |
| `watchers_count` | `int` |  |

#### Example: List

```go
searchs, err := client.Search(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(searchs) // the array of records
```


### User

Create an instance: `user := client.User(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `avatar_url` | `string` |  |
| `bio` | `string` |  |
| `blog` | `string` |  |
| `company` | `string` |  |
| `created_at` | `string` |  |
| `email` | `string` |  |
| `follower` | `int` |  |
| `following` | `int` |  |
| `html_url` | `string` |  |
| `id` | `int` |  |
| `location` | `string` |  |
| `login` | `string` |  |
| `name` | `string` |  |
| `node_id` | `string` |  |
| `public_gist` | `int` |  |
| `public_repo` | `int` |  |
| `type` | `string` |  |
| `updated_at` | `string` |  |
| `url` | `string` |  |

#### Example: Load

```go
user, err := client.User(nil).Load(map[string]any{"id": "user_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(user) // the loaded record
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/github-rest-sdk/go/
├── github-rest.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/github-rest-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
branch := client.Branch(nil)
branch.List(nil, nil)

// branch.Data() now returns the branch data from the last list
// branch.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
