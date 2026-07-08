# GithubRest Golang SDK Reference

Complete API reference for the GithubRest Golang SDK.


## GithubRestSDK

### Constructor

```go
func NewGithubRestSDK(options map[string]any) *GithubRestSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *GithubRestSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *GithubRestSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Branch(data map[string]any) GithubRestEntity`

Create a new `Branch` entity instance. Pass `nil` for no initial data.

#### `Commit(data map[string]any) GithubRestEntity`

Create a new `Commit` entity instance. Pass `nil` for no initial data.

#### `Gist(data map[string]any) GithubRestEntity`

Create a new `Gist` entity instance. Pass `nil` for no initial data.

#### `Issue(data map[string]any) GithubRestEntity`

Create a new `Issue` entity instance. Pass `nil` for no initial data.

#### `Notification(data map[string]any) GithubRestEntity`

Create a new `Notification` entity instance. Pass `nil` for no initial data.

#### `Org(data map[string]any) GithubRestEntity`

Create a new `Org` entity instance. Pass `nil` for no initial data.

#### `Pull(data map[string]any) GithubRestEntity`

Create a new `Pull` entity instance. Pass `nil` for no initial data.

#### `RateLimit(data map[string]any) GithubRestEntity`

Create a new `RateLimit` entity instance. Pass `nil` for no initial data.

#### `Repo(data map[string]any) GithubRestEntity`

Create a new `Repo` entity instance. Pass `nil` for no initial data.

#### `Search(data map[string]any) GithubRestEntity`

Create a new `Search` entity instance. Pass `nil` for no initial data.

#### `User(data map[string]any) GithubRestEntity`

Create a new `User` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## BranchEntity

```go
branch := client.Branch(nil)
fmt.Println(branch.GetName()) // "branch"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `commit` | `map[string]any` | No |  |
| `name` | `string` | No |  |
| `protected` | `bool` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Branch(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BranchEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CommitEntity

```go
commit := client.Commit(nil)
fmt.Println(commit.GetName()) // "commit"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `author` | `map[string]any` | No |  |
| `commit` | `map[string]any` | No |  |
| `committer` | `map[string]any` | No |  |
| `html_url` | `string` | No |  |
| `node_id` | `string` | No |  |
| `sha` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Commit(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CommitEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## GistEntity

```go
gist := client.Gist(nil)
fmt.Println(gist.GetName()) // "gist"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No |  |
| `description` | `string` | No |  |
| `file` | `map[string]any` | Yes |  |
| `html_url` | `string` | No |  |
| `id` | `string` | No |  |
| `node_id` | `string` | No |  |
| `owner` | `map[string]any` | No |  |
| `public` | `bool` | No |  |
| `updated_at` | `string` | No |  |
| `url` | `string` | No |  |

### Field Usage by Operation

| Field | list | create |
| --- | --- | --- |
| `created_at` | - | - |
| `description` | - | - |
| `file` | Yes | - |
| `html_url` | - | - |
| `id` | - | - |
| `node_id` | - | - |
| `owner` | - | - |
| `public` | - | - |
| `updated_at` | - | - |
| `url` | - | - |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Gist(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Gist(nil).Create(map[string]any{
    "file": /* map[string]any */,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `GistEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## IssueEntity

```go
issue := client.Issue(nil)
fmt.Println(issue.GetName()) // "issue"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `assignee` | `any` | No |  |
| `body` | `string` | No |  |
| `closed_at` | `string` | No |  |
| `comment` | `int` | No |  |
| `created_at` | `string` | No |  |
| `html_url` | `string` | No |  |
| `id` | `int` | No |  |
| `label` | `[]any` | No |  |
| `milestone` | `map[string]any` | No |  |
| `node_id` | `string` | No |  |
| `number` | `int` | No |  |
| `state` | `string` | No |  |
| `title` | `string` | No |  |
| `updated_at` | `string` | No |  |
| `url` | `string` | No |  |
| `user` | `map[string]any` | No |  |

### Field Usage by Operation

| Field | load | list | create | update |
| --- | --- | --- | --- | --- |
| `assignee` | - | - | - | - |
| `body` | - | - | - | - |
| `closed_at` | - | - | - | - |
| `comment` | - | - | - | - |
| `created_at` | - | - | - | - |
| `html_url` | - | - | - | - |
| `id` | - | - | - | - |
| `label` | - | - | - | - |
| `milestone` | - | - | - | - |
| `node_id` | - | - | - | - |
| `number` | - | - | - | - |
| `state` | - | - | - | - |
| `title` | - | - | Yes | - |
| `updated_at` | - | - | - | - |
| `url` | - | - | - | - |
| `user` | - | - | - | - |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Issue(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Issue(nil).Load(map[string]any{"id": 1, "owner": "owner", "repo": "repo"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

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

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.Issue(nil).Update(map[string]any{
    "id": 1,
    "owner": "owner",
    "repo": "repo",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `IssueEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## NotificationEntity

```go
notification := client.Notification(nil)
fmt.Println(notification.GetName()) // "notification"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `last_read_at` | `string` | No |  |
| `reason` | `string` | No |  |
| `repository` | `map[string]any` | No |  |
| `subject` | `map[string]any` | No |  |
| `unread` | `bool` | No |  |
| `updated_at` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Notification(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `NotificationEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## OrgEntity

```go
org := client.Org(nil)
fmt.Println(org.GetName()) // "org"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `avatar_url` | `string` | No |  |
| `blog` | `string` | No |  |
| `created_at` | `string` | No |  |
| `description` | `string` | No |  |
| `email` | `string` | No |  |
| `follower` | `int` | No |  |
| `following` | `int` | No |  |
| `html_url` | `string` | No |  |
| `id` | `int` | No |  |
| `location` | `string` | No |  |
| `login` | `string` | No |  |
| `name` | `string` | No |  |
| `node_id` | `string` | No |  |
| `public_gist` | `int` | No |  |
| `public_repo` | `int` | No |  |
| `updated_at` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Org(nil).Load(map[string]any{"id": "org_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `OrgEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PullEntity

```go
pull := client.Pull(nil)
fmt.Println(pull.GetName()) // "pull"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base` | `map[string]any` | No |  |
| `body` | `string` | No |  |
| `closed_at` | `string` | No |  |
| `created_at` | `string` | No |  |
| `draft` | `bool` | No |  |
| `head` | `map[string]any` | No |  |
| `html_url` | `string` | No |  |
| `id` | `int` | No |  |
| `merged_at` | `string` | No |  |
| `node_id` | `string` | No |  |
| `number` | `int` | No |  |
| `state` | `string` | No |  |
| `title` | `string` | No |  |
| `updated_at` | `string` | No |  |
| `url` | `string` | No |  |
| `user` | `map[string]any` | No |  |

### Field Usage by Operation

| Field | load | list | create |
| --- | --- | --- | --- |
| `base` | - | - | Yes |
| `body` | - | - | - |
| `closed_at` | - | - | - |
| `created_at` | - | - | - |
| `draft` | - | - | - |
| `head` | - | - | Yes |
| `html_url` | - | - | - |
| `id` | - | - | - |
| `merged_at` | - | - | - |
| `node_id` | - | - | - |
| `number` | - | - | - |
| `state` | - | - | - |
| `title` | - | - | Yes |
| `updated_at` | - | - | - |
| `url` | - | - | - |
| `user` | - | - | - |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Pull(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Pull(nil).Load(map[string]any{"id": 1, "owner": "owner", "repo": "repo"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

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

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PullEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## RateLimitEntity

```go
rateLimit := client.RateLimit(nil)
fmt.Println(rateLimit.GetName()) // "rate_limit"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `rate` | `map[string]any` | No |  |
| `resource` | `map[string]any` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.RateLimit(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `RateLimitEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## RepoEntity

```go
repo := client.Repo(nil)
fmt.Println(repo.GetName()) // "repo"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No |  |
| `default_branch` | `string` | No |  |
| `description` | `string` | No |  |
| `fork` | `bool` | No |  |
| `forks_count` | `int` | No |  |
| `full_name` | `string` | No |  |
| `html_url` | `string` | No |  |
| `id` | `int` | No |  |
| `language` | `string` | No |  |
| `name` | `string` | No |  |
| `node_id` | `string` | No |  |
| `open_issues_count` | `int` | No |  |
| `owner` | `map[string]any` | No |  |
| `private` | `bool` | No |  |
| `pushed_at` | `string` | No |  |
| `size` | `int` | No |  |
| `stargazers_count` | `int` | No |  |
| `updated_at` | `string` | No |  |
| `url` | `string` | No |  |
| `visibility` | `string` | No |  |
| `watchers_count` | `int` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Repo(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Repo(nil).Load(map[string]any{"owner": "owner", "repo": "repo"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `RepoEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## SearchEntity

```go
search := client.Search(nil)
fmt.Println(search.GetName()) // "search"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `assignee` | `any` | No |  |
| `body` | `string` | No |  |
| `closed_at` | `string` | No |  |
| `comment` | `int` | No |  |
| `created_at` | `string` | No |  |
| `default_branch` | `string` | No |  |
| `description` | `string` | No |  |
| `fork` | `bool` | No |  |
| `forks_count` | `int` | No |  |
| `full_name` | `string` | No |  |
| `html_url` | `string` | No |  |
| `id` | `int` | No |  |
| `label` | `[]any` | No |  |
| `language` | `string` | No |  |
| `milestone` | `map[string]any` | No |  |
| `name` | `string` | No |  |
| `node_id` | `string` | No |  |
| `number` | `int` | No |  |
| `open_issues_count` | `int` | No |  |
| `owner` | `map[string]any` | No |  |
| `private` | `bool` | No |  |
| `pushed_at` | `string` | No |  |
| `size` | `int` | No |  |
| `stargazers_count` | `int` | No |  |
| `state` | `string` | No |  |
| `title` | `string` | No |  |
| `updated_at` | `string` | No |  |
| `url` | `string` | No |  |
| `user` | `map[string]any` | No |  |
| `visibility` | `string` | No |  |
| `watchers_count` | `int` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Search(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SearchEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## UserEntity

```go
user := client.User(nil)
fmt.Println(user.GetName()) // "user"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `avatar_url` | `string` | No |  |
| `bio` | `string` | No |  |
| `blog` | `string` | No |  |
| `company` | `string` | No |  |
| `created_at` | `string` | No |  |
| `email` | `string` | No |  |
| `follower` | `int` | No |  |
| `following` | `int` | No |  |
| `html_url` | `string` | No |  |
| `id` | `int` | No |  |
| `location` | `string` | No |  |
| `login` | `string` | No |  |
| `name` | `string` | No |  |
| `node_id` | `string` | No |  |
| `public_gist` | `int` | No |  |
| `public_repo` | `int` | No |  |
| `type` | `string` | No |  |
| `updated_at` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.User(nil).Load(map[string]any{"id": "user_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `UserEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewGithubRestSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

