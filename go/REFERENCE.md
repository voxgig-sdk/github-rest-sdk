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
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `commit` | ``$OBJECT`` | No |  |
| `name` | ``$STRING`` | No |  |
| `protected` | ``$BOOLEAN`` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Branch(nil).List(nil, nil)
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
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `author` | ``$OBJECT`` | No |  |
| `commit` | ``$OBJECT`` | No |  |
| `committer` | ``$OBJECT`` | No |  |
| `html_url` | ``$STRING`` | No |  |
| `node_id` | ``$STRING`` | No |  |
| `sha` | ``$STRING`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Commit(nil).List(nil, nil)
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
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | ``$STRING`` | No |  |
| `description` | ``$STRING`` | No |  |
| `file` | ``$OBJECT`` | Yes |  |
| `html_url` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `node_id` | ``$STRING`` | No |  |
| `owner` | ``$OBJECT`` | No |  |
| `public` | ``$BOOLEAN`` | No |  |
| `updated_at` | ``$STRING`` | No |  |
| `url` | ``$STRING`` | No |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `created_at` | - | - | - | - | - |
| `description` | - | - | - | - | - |
| `file` | - | Yes | - | - | - |
| `html_url` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `node_id` | - | - | - | - | - |
| `owner` | - | - | - | - | - |
| `public` | - | - | - | - | - |
| `updated_at` | - | - | - | - | - |
| `url` | - | - | - | - | - |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Gist(nil).Create(map[string]any{
    "file": /* `$OBJECT` */,
}, nil)
```

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Gist(nil).List(nil, nil)
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
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `assignee` | ``$ANY`` | No |  |
| `body` | ``$STRING`` | No |  |
| `closed_at` | ``$STRING`` | No |  |
| `comment` | ``$INTEGER`` | No |  |
| `created_at` | ``$STRING`` | No |  |
| `html_url` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `label` | ``$ARRAY`` | No |  |
| `milestone` | ``$OBJECT`` | No |  |
| `node_id` | ``$STRING`` | No |  |
| `number` | ``$INTEGER`` | No |  |
| `state` | ``$STRING`` | No |  |
| `title` | ``$STRING`` | No |  |
| `updated_at` | ``$STRING`` | No |  |
| `url` | ``$STRING`` | No |  |
| `user` | ``$OBJECT`` | No |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `assignee` | - | - | - | - | - |
| `body` | - | - | - | - | - |
| `closed_at` | - | - | - | - | - |
| `comment` | - | - | - | - | - |
| `created_at` | - | - | - | - | - |
| `html_url` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `label` | - | - | - | - | - |
| `milestone` | - | - | - | - | - |
| `node_id` | - | - | - | - | - |
| `number` | - | - | - | - | - |
| `state` | - | - | - | - | - |
| `title` | - | - | Yes | - | - |
| `updated_at` | - | - | - | - | - |
| `url` | - | - | - | - | - |
| `user` | - | - | - | - | - |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Issue(nil).Create(map[string]any{
}, nil)
```

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Issue(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Issue(nil).Load(map[string]any{"id": "issue_id"}, nil)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.Issue(nil).Update(map[string]any{
    "id": "issue_id",
    // Fields to update
}, nil)
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
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | ``$STRING`` | No |  |
| `last_read_at` | ``$STRING`` | No |  |
| `reason` | ``$STRING`` | No |  |
| `repository` | ``$OBJECT`` | No |  |
| `subject` | ``$OBJECT`` | No |  |
| `unread` | ``$BOOLEAN`` | No |  |
| `updated_at` | ``$STRING`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Notification(nil).List(nil, nil)
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
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `avatar_url` | ``$STRING`` | No |  |
| `blog` | ``$STRING`` | No |  |
| `created_at` | ``$STRING`` | No |  |
| `description` | ``$STRING`` | No |  |
| `email` | ``$STRING`` | No |  |
| `follower` | ``$INTEGER`` | No |  |
| `following` | ``$INTEGER`` | No |  |
| `html_url` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `location` | ``$STRING`` | No |  |
| `login` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `node_id` | ``$STRING`` | No |  |
| `public_gist` | ``$INTEGER`` | No |  |
| `public_repo` | ``$INTEGER`` | No |  |
| `updated_at` | ``$STRING`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Org(nil).Load(map[string]any{"id": "org_id"}, nil)
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
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base` | ``$OBJECT`` | No |  |
| `body` | ``$STRING`` | No |  |
| `closed_at` | ``$STRING`` | No |  |
| `created_at` | ``$STRING`` | No |  |
| `draft` | ``$BOOLEAN`` | No |  |
| `head` | ``$OBJECT`` | No |  |
| `html_url` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `merged_at` | ``$STRING`` | No |  |
| `node_id` | ``$STRING`` | No |  |
| `number` | ``$INTEGER`` | No |  |
| `state` | ``$STRING`` | No |  |
| `title` | ``$STRING`` | No |  |
| `updated_at` | ``$STRING`` | No |  |
| `url` | ``$STRING`` | No |  |
| `user` | ``$OBJECT`` | No |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `base` | - | - | Yes | - | - |
| `body` | - | - | - | - | - |
| `closed_at` | - | - | - | - | - |
| `created_at` | - | - | - | - | - |
| `draft` | - | - | - | - | - |
| `head` | - | - | Yes | - | - |
| `html_url` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `merged_at` | - | - | - | - | - |
| `node_id` | - | - | - | - | - |
| `number` | - | - | - | - | - |
| `state` | - | - | - | - | - |
| `title` | - | - | Yes | - | - |
| `updated_at` | - | - | - | - | - |
| `url` | - | - | - | - | - |
| `user` | - | - | - | - | - |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Pull(nil).Create(map[string]any{
}, nil)
```

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Pull(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Pull(nil).Load(map[string]any{"id": "pull_id"}, nil)
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
rate_limit := client.RateLimit(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `rate` | ``$OBJECT`` | No |  |
| `resource` | ``$OBJECT`` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.RateLimit(nil).Load(map[string]any{"id": "rate_limit_id"}, nil)
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
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | ``$STRING`` | No |  |
| `default_branch` | ``$STRING`` | No |  |
| `description` | ``$STRING`` | No |  |
| `fork` | ``$BOOLEAN`` | No |  |
| `forks_count` | ``$INTEGER`` | No |  |
| `full_name` | ``$STRING`` | No |  |
| `html_url` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `language` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `node_id` | ``$STRING`` | No |  |
| `open_issues_count` | ``$INTEGER`` | No |  |
| `owner` | ``$OBJECT`` | No |  |
| `private` | ``$BOOLEAN`` | No |  |
| `pushed_at` | ``$STRING`` | No |  |
| `size` | ``$INTEGER`` | No |  |
| `stargazers_count` | ``$INTEGER`` | No |  |
| `updated_at` | ``$STRING`` | No |  |
| `url` | ``$STRING`` | No |  |
| `visibility` | ``$STRING`` | No |  |
| `watchers_count` | ``$INTEGER`` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Repo(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Repo(nil).Load(map[string]any{"id": "repo_id"}, nil)
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
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `assignee` | ``$ANY`` | No |  |
| `body` | ``$STRING`` | No |  |
| `closed_at` | ``$STRING`` | No |  |
| `comment` | ``$INTEGER`` | No |  |
| `created_at` | ``$STRING`` | No |  |
| `default_branch` | ``$STRING`` | No |  |
| `description` | ``$STRING`` | No |  |
| `fork` | ``$BOOLEAN`` | No |  |
| `forks_count` | ``$INTEGER`` | No |  |
| `full_name` | ``$STRING`` | No |  |
| `html_url` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `label` | ``$ARRAY`` | No |  |
| `language` | ``$STRING`` | No |  |
| `milestone` | ``$OBJECT`` | No |  |
| `name` | ``$STRING`` | No |  |
| `node_id` | ``$STRING`` | No |  |
| `number` | ``$INTEGER`` | No |  |
| `open_issues_count` | ``$INTEGER`` | No |  |
| `owner` | ``$OBJECT`` | No |  |
| `private` | ``$BOOLEAN`` | No |  |
| `pushed_at` | ``$STRING`` | No |  |
| `size` | ``$INTEGER`` | No |  |
| `stargazers_count` | ``$INTEGER`` | No |  |
| `state` | ``$STRING`` | No |  |
| `title` | ``$STRING`` | No |  |
| `updated_at` | ``$STRING`` | No |  |
| `url` | ``$STRING`` | No |  |
| `user` | ``$OBJECT`` | No |  |
| `visibility` | ``$STRING`` | No |  |
| `watchers_count` | ``$INTEGER`` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Search(nil).List(nil, nil)
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
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `avatar_url` | ``$STRING`` | No |  |
| `bio` | ``$STRING`` | No |  |
| `blog` | ``$STRING`` | No |  |
| `company` | ``$STRING`` | No |  |
| `created_at` | ``$STRING`` | No |  |
| `email` | ``$STRING`` | No |  |
| `follower` | ``$INTEGER`` | No |  |
| `following` | ``$INTEGER`` | No |  |
| `html_url` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `location` | ``$STRING`` | No |  |
| `login` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `node_id` | ``$STRING`` | No |  |
| `public_gist` | ``$INTEGER`` | No |  |
| `public_repo` | ``$INTEGER`` | No |  |
| `type` | ``$STRING`` | No |  |
| `updated_at` | ``$STRING`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.User(nil).Load(map[string]any{"id": "user_id"}, nil)
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

