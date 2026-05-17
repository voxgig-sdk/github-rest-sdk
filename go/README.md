# GithubRest Golang SDK

The Golang SDK for the GithubRest API. Provides an entity-oriented interface using standard Go conventions — no generics required, data flows as `map[string]any`.


## Install
```bash
go get github.com/voxgig-sdk/github-rest-sdk/go
```

If the module is not yet published to a registry, use a `replace` directive
in your `go.mod` to point to a local checkout:

```bash
go mod edit -replace github.com/voxgig-sdk/github-rest-sdk/go=../path/to/github.com/voxgig-sdk/github-rest-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```go
package main

import (
    "fmt"
    "os"

    sdk "github.com/voxgig-sdk/github-rest-sdk/go"
    "github.com/voxgig-sdk/github-rest-sdk/go/core"
)

func main() {
    client := sdk.NewGithubRestSDK(map[string]any{
        "apikey": os.Getenv("GITHUB-REST_APIKEY"),
    })
```

### 2. List branchs

```go
    result, err := client.Branch(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }

    rm := core.ToMapAny(result)
    if rm["ok"] == true {
        for _, item := range rm["data"].([]any) {
            p := core.ToMapAny(item)
            fmt.Println(p["id"], p["name"])
        }
    }
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
client := sdk.TestSDK(nil, nil)

result, err := client.Planet(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
// result contains mock response data
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
GITHUB-REST_TEST_LIVE=TRUE
GITHUB-REST_APIKEY=<your-key>
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
| `Issue` | `(data map[string]any) GithubRestEntity` | Create a Issue entity instance. |
| `Notification` | `(data map[string]any) GithubRestEntity` | Create a Notification entity instance. |
| `Org` | `(data map[string]any) GithubRestEntity` | Create a Org entity instance. |
| `Pull` | `(data map[string]any) GithubRestEntity` | Create a Pull entity instance. |
| `RateLimit` | `(data map[string]any) GithubRestEntity` | Create a RateLimit entity instance. |
| `Repo` | `(data map[string]any) GithubRestEntity` | Create a Repo entity instance. |
| `Search` | `(data map[string]any) GithubRestEntity` | Create a Search entity instance. |
| `User` | `(data map[string]any) GithubRestEntity` | Create a User entity instance. |

### Entity interface (GithubRestEntity)

All entities implement the `GithubRestEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(any, error)`. The `any` value is a
`map[string]any` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `"ok"` | `bool` | `true` if the HTTP status is 2xx. |
| `"status"` | `int` | HTTP status code. |
| `"headers"` | `map[string]any` | Response headers. |
| `"data"` | `any` | Parsed JSON response body. |

On error, `"ok"` is `false` and `"err"` contains the error value.

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
| `commit` | ``$OBJECT`` |  |
| `name` | ``$STRING`` |  |
| `protected` | ``$BOOLEAN`` |  |

#### Example: List

```go
results, err := client.Branch(nil).List(nil, nil)
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
| `author` | ``$OBJECT`` |  |
| `commit` | ``$OBJECT`` |  |
| `committer` | ``$OBJECT`` |  |
| `html_url` | ``$STRING`` |  |
| `node_id` | ``$STRING`` |  |
| `sha` | ``$STRING`` |  |
| `url` | ``$STRING`` |  |

#### Example: List

```go
results, err := client.Commit(nil).List(nil, nil)
```


### Gist

Create an instance: `gist := client.Gist(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | ``$STRING`` |  |
| `description` | ``$STRING`` |  |
| `file` | ``$OBJECT`` |  |
| `html_url` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `node_id` | ``$STRING`` |  |
| `owner` | ``$OBJECT`` |  |
| `public` | ``$BOOLEAN`` |  |
| `updated_at` | ``$STRING`` |  |
| `url` | ``$STRING`` |  |

#### Example: List

```go
results, err := client.Gist(nil).List(nil, nil)
```

#### Example: Create

```go
result, err := client.Gist(nil).Create(map[string]any{
    "file": /* `$OBJECT` */,
}, nil)
```


### Issue

Create an instance: `issue := client.Issue(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `assignee` | ``$ANY`` |  |
| `body` | ``$STRING`` |  |
| `closed_at` | ``$STRING`` |  |
| `comment` | ``$INTEGER`` |  |
| `created_at` | ``$STRING`` |  |
| `html_url` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `label` | ``$ARRAY`` |  |
| `milestone` | ``$OBJECT`` |  |
| `node_id` | ``$STRING`` |  |
| `number` | ``$INTEGER`` |  |
| `state` | ``$STRING`` |  |
| `title` | ``$STRING`` |  |
| `updated_at` | ``$STRING`` |  |
| `url` | ``$STRING`` |  |
| `user` | ``$OBJECT`` |  |

#### Example: Load

```go
result, err := client.Issue(nil).Load(map[string]any{"id": "issue_id"}, nil)
```

#### Example: List

```go
results, err := client.Issue(nil).List(nil, nil)
```

#### Example: Create

```go
result, err := client.Issue(nil).Create(map[string]any{
}, nil)
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
| `id` | ``$STRING`` |  |
| `last_read_at` | ``$STRING`` |  |
| `reason` | ``$STRING`` |  |
| `repository` | ``$OBJECT`` |  |
| `subject` | ``$OBJECT`` |  |
| `unread` | ``$BOOLEAN`` |  |
| `updated_at` | ``$STRING`` |  |
| `url` | ``$STRING`` |  |

#### Example: List

```go
results, err := client.Notification(nil).List(nil, nil)
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
| `avatar_url` | ``$STRING`` |  |
| `blog` | ``$STRING`` |  |
| `created_at` | ``$STRING`` |  |
| `description` | ``$STRING`` |  |
| `email` | ``$STRING`` |  |
| `follower` | ``$INTEGER`` |  |
| `following` | ``$INTEGER`` |  |
| `html_url` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `location` | ``$STRING`` |  |
| `login` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `node_id` | ``$STRING`` |  |
| `public_gist` | ``$INTEGER`` |  |
| `public_repo` | ``$INTEGER`` |  |
| `updated_at` | ``$STRING`` |  |
| `url` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.Org(nil).Load(map[string]any{"id": "org_id"}, nil)
```


### Pull

Create an instance: `pull := client.Pull(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base` | ``$OBJECT`` |  |
| `body` | ``$STRING`` |  |
| `closed_at` | ``$STRING`` |  |
| `created_at` | ``$STRING`` |  |
| `draft` | ``$BOOLEAN`` |  |
| `head` | ``$OBJECT`` |  |
| `html_url` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `merged_at` | ``$STRING`` |  |
| `node_id` | ``$STRING`` |  |
| `number` | ``$INTEGER`` |  |
| `state` | ``$STRING`` |  |
| `title` | ``$STRING`` |  |
| `updated_at` | ``$STRING`` |  |
| `url` | ``$STRING`` |  |
| `user` | ``$OBJECT`` |  |

#### Example: Load

```go
result, err := client.Pull(nil).Load(map[string]any{"id": "pull_id"}, nil)
```

#### Example: List

```go
results, err := client.Pull(nil).List(nil, nil)
```

#### Example: Create

```go
result, err := client.Pull(nil).Create(map[string]any{
}, nil)
```


### RateLimit

Create an instance: `rate_limit := client.RateLimit(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `rate` | ``$OBJECT`` |  |
| `resource` | ``$OBJECT`` |  |

#### Example: Load

```go
result, err := client.RateLimit(nil).Load(map[string]any{"id": "rate_limit_id"}, nil)
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
| `created_at` | ``$STRING`` |  |
| `default_branch` | ``$STRING`` |  |
| `description` | ``$STRING`` |  |
| `fork` | ``$BOOLEAN`` |  |
| `forks_count` | ``$INTEGER`` |  |
| `full_name` | ``$STRING`` |  |
| `html_url` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `language` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `node_id` | ``$STRING`` |  |
| `open_issues_count` | ``$INTEGER`` |  |
| `owner` | ``$OBJECT`` |  |
| `private` | ``$BOOLEAN`` |  |
| `pushed_at` | ``$STRING`` |  |
| `size` | ``$INTEGER`` |  |
| `stargazers_count` | ``$INTEGER`` |  |
| `updated_at` | ``$STRING`` |  |
| `url` | ``$STRING`` |  |
| `visibility` | ``$STRING`` |  |
| `watchers_count` | ``$INTEGER`` |  |

#### Example: Load

```go
result, err := client.Repo(nil).Load(map[string]any{"id": "repo_id"}, nil)
```

#### Example: List

```go
results, err := client.Repo(nil).List(nil, nil)
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
| `assignee` | ``$ANY`` |  |
| `body` | ``$STRING`` |  |
| `closed_at` | ``$STRING`` |  |
| `comment` | ``$INTEGER`` |  |
| `created_at` | ``$STRING`` |  |
| `default_branch` | ``$STRING`` |  |
| `description` | ``$STRING`` |  |
| `fork` | ``$BOOLEAN`` |  |
| `forks_count` | ``$INTEGER`` |  |
| `full_name` | ``$STRING`` |  |
| `html_url` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `label` | ``$ARRAY`` |  |
| `language` | ``$STRING`` |  |
| `milestone` | ``$OBJECT`` |  |
| `name` | ``$STRING`` |  |
| `node_id` | ``$STRING`` |  |
| `number` | ``$INTEGER`` |  |
| `open_issues_count` | ``$INTEGER`` |  |
| `owner` | ``$OBJECT`` |  |
| `private` | ``$BOOLEAN`` |  |
| `pushed_at` | ``$STRING`` |  |
| `size` | ``$INTEGER`` |  |
| `stargazers_count` | ``$INTEGER`` |  |
| `state` | ``$STRING`` |  |
| `title` | ``$STRING`` |  |
| `updated_at` | ``$STRING`` |  |
| `url` | ``$STRING`` |  |
| `user` | ``$OBJECT`` |  |
| `visibility` | ``$STRING`` |  |
| `watchers_count` | ``$INTEGER`` |  |

#### Example: List

```go
results, err := client.Search(nil).List(nil, nil)
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
| `avatar_url` | ``$STRING`` |  |
| `bio` | ``$STRING`` |  |
| `blog` | ``$STRING`` |  |
| `company` | ``$STRING`` |  |
| `created_at` | ``$STRING`` |  |
| `email` | ``$STRING`` |  |
| `follower` | ``$INTEGER`` |  |
| `following` | ``$INTEGER`` |  |
| `html_url` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `location` | ``$STRING`` |  |
| `login` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `node_id` | ``$STRING`` |  |
| `public_gist` | ``$INTEGER`` |  |
| `public_repo` | ``$INTEGER`` |  |
| `type` | ``$STRING`` |  |
| `updated_at` | ``$STRING`` |  |
| `url` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.User(nil).Load(map[string]any{"id": "user_id"}, nil)
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

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

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller. An unexpected panic triggers the
`PreUnexpected` hook.

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

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
moon := client.Moon(nil)
moon.Load(map[string]any{"planet_id": "earth", "id": "luna"}, nil)

// moon.Data() now returns the loaded moon data
// moon.Match() returns the last match criteria
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
