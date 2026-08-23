# GithubRest Lua SDK Reference

Complete API reference for the GithubRest Lua SDK.


## GithubRestSDK

### Constructor

```lua
local sdk = require("github-rest_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Branch(data)`

Create a new `Branch` entity instance. Pass `nil` for no initial data.

#### `Commit(data)`

Create a new `Commit` entity instance. Pass `nil` for no initial data.

#### `Gist(data)`

Create a new `Gist` entity instance. Pass `nil` for no initial data.

#### `Issue(data)`

Create a new `Issue` entity instance. Pass `nil` for no initial data.

#### `Notification(data)`

Create a new `Notification` entity instance. Pass `nil` for no initial data.

#### `Org(data)`

Create a new `Org` entity instance. Pass `nil` for no initial data.

#### `Pull(data)`

Create a new `Pull` entity instance. Pass `nil` for no initial data.

#### `RateLimit(data)`

Create a new `RateLimit` entity instance. Pass `nil` for no initial data.

#### `Repo(data)`

Create a new `Repo` entity instance. Pass `nil` for no initial data.

#### `Search(data)`

Create a new `Search` entity instance. Pass `nil` for no initial data.

#### `User(data)`

Create a new `User` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## BranchEntity

```lua
local branch = client:Branch(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `commit` | `table` | No |  |
| `name` | `string` | No |  |
| `protected` | `boolean` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Branch():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BranchEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CommitEntity

```lua
local commit = client:Commit(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `author` | `table` | No |  |
| `commit` | `table` | No |  |
| `committer` | `table` | No |  |
| `html_url` | `string` | No |  |
| `node_id` | `string` | No |  |
| `sha` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Commit():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CommitEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## GistEntity

```lua
local gist = client:Gist(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No |  |
| `description` | `string` | No | Description of the gist |
| `files` | `table` | Yes | Names and content for the files that make up the gist |
| `html_url` | `string` | No |  |
| `id` | `string` | No |  |
| `node_id` | `string` | No |  |
| `owner` | `table` | No |  |
| `public` | `boolean` | No | Whether the gist is public |
| `updated_at` | `string` | No |  |
| `url` | `string` | No |  |

### Field Usage by Operation

| Field | list | create |
| --- | --- | --- |
| `created_at` | - | - |
| `description` | - | - |
| `files` | Yes | - |
| `html_url` | - | - |
| `id` | - | - |
| `node_id` | - | - |
| `owner` | - | - |
| `public` | - | - |
| `updated_at` | - | - |
| `url` | - | - |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Gist():create({
  files = --[[ table ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Gist():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GistEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## IssueEntity

```lua
local issue = client:Issue(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `assignee` | `any` | No |  |
| `assignees` | `table` | No | Logins for Users to assign to this issue |
| `body` | `string` | No | The contents of the issue |
| `closed_at` | `string` | No |  |
| `comments` | `number` | No |  |
| `created_at` | `string` | No |  |
| `html_url` | `string` | No |  |
| `id` | `number` | No |  |
| `labels` | `table` | No | Labels to associate with this issue |
| `milestone` | `table` | No | The number of the milestone to associate this issue with |
| `node_id` | `string` | No |  |
| `number` | `number` | No | The issue number |
| `state` | `string` | No | State of the issue |
| `title` | `string` | No | The issue title |
| `updated_at` | `string` | No |  |
| `url` | `string` | No |  |
| `user` | `table` | No |  |

### Field Usage by Operation

| Field | load | list | create | update |
| --- | --- | --- | --- | --- |
| `assignee` | - | - | - | - |
| `assignees` | - | - | - | - |
| `body` | - | - | - | - |
| `closed_at` | - | - | - | - |
| `comments` | - | - | - | - |
| `created_at` | - | - | - | - |
| `html_url` | - | - | - | - |
| `id` | - | - | - | - |
| `labels` | - | - | - | - |
| `milestone` | - | - | - | - |
| `node_id` | - | - | - | - |
| `number` | - | - | - | - |
| `state` | - | - | - | - |
| `title` | - | - | Yes | - |
| `updated_at` | - | - | - | - |
| `url` | - | - | - | - |
| `user` | - | - | - | - |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Issue():create({
  owner = --[[ string ]],
  repo = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Issue():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Issue():load({ id = 1, owner = "owner", repo = "repo" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:Issue():update({
  id = 1,
  owner = "owner",
  repo = "repo",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `IssueEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## NotificationEntity

```lua
local notification = client:Notification(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `last_read_at` | `string` | No |  |
| `reason` | `string` | No |  |
| `repository` | `table` | No |  |
| `subject` | `table` | No |  |
| `unread` | `boolean` | No |  |
| `updated_at` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Notification():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `NotificationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## OrgEntity

```lua
local org = client:Org(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `avatar_url` | `string` | No |  |
| `blog` | `string` | No |  |
| `created_at` | `string` | No |  |
| `description` | `string` | No |  |
| `email` | `string` | No |  |
| `followers` | `number` | No |  |
| `following` | `number` | No |  |
| `html_url` | `string` | No |  |
| `id` | `number` | No |  |
| `location` | `string` | No |  |
| `login` | `string` | No |  |
| `name` | `string` | No |  |
| `node_id` | `string` | No |  |
| `public_gists` | `number` | No |  |
| `public_repos` | `number` | No |  |
| `updated_at` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Org():load({ id = "org_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OrgEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PullEntity

```lua
local pull = client:Pull(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base` | `table` | No | The name of the branch you want the changes pulled into |
| `body` | `string` | No | The contents of the pull request |
| `closed_at` | `string` | No |  |
| `created_at` | `string` | No |  |
| `draft` | `boolean` | No | Indicates whether the pull request is a draft |
| `head` | `table` | No | The name of the branch where your changes are implemented |
| `html_url` | `string` | No |  |
| `id` | `number` | No |  |
| `merged_at` | `string` | No |  |
| `node_id` | `string` | No |  |
| `number` | `number` | No |  |
| `state` | `string` | No |  |
| `title` | `string` | No | The title of the pull request |
| `updated_at` | `string` | No |  |
| `url` | `string` | No |  |
| `user` | `table` | No |  |

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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Pull():create({
  owner = --[[ string ]],
  repo = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Pull():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Pull():load({ id = 1, owner = "owner", repo = "repo" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PullEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## RateLimitEntity

```lua
local rate_limit = client:RateLimit(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `rate` | `table` | No |  |
| `resources` | `table` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:RateLimit():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RateLimitEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## RepoEntity

```lua
local repo = client:Repo(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `avatar_url` | `string` | No | URL to the user's avatar image |
| `bio` | `string` | No |  |
| `blog` | `string` | No |  |
| `company` | `string` | No |  |
| `created_at` | `string` | No |  |
| `default_branch` | `string` | No |  |
| `description` | `string` | No |  |
| `email` | `string` | No |  |
| `followers` | `number` | No |  |
| `following` | `number` | No |  |
| `fork` | `boolean` | No |  |
| `forks_count` | `number` | No |  |
| `full_name` | `string` | No | The full name including owner |
| `html_url` | `string` | No |  |
| `id` | `number` | No | The user's unique identifier |
| `language` | `string` | No |  |
| `location` | `string` | No |  |
| `login` | `string` | No | The user's GitHub username |
| `name` | `string` | No | The name of the repository |
| `node_id` | `string` | No |  |
| `open_issues_count` | `number` | No |  |
| `owner` | `table` | No |  |
| `private` | `boolean` | No | Whether the repository is private |
| `public_gists` | `number` | No |  |
| `public_repos` | `number` | No |  |
| `pushed_at` | `string` | No |  |
| `size` | `number` | No |  |
| `stargazers_count` | `number` | No |  |
| `type` | `string` | No |  |
| `updated_at` | `string` | No |  |
| `url` | `string` | No |  |
| `visibility` | `string` | No |  |
| `watchers_count` | `number` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Repo():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Repo():load({ owner = "owner", repo = "repo" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RepoEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## SearchEntity

```lua
local search = client:Search(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `assignee` | `any` | No |  |
| `assignees` | `table` | No |  |
| `body` | `string` | No |  |
| `closed_at` | `string` | No |  |
| `comments` | `number` | No |  |
| `created_at` | `string` | No |  |
| `default_branch` | `string` | No |  |
| `description` | `string` | No |  |
| `fork` | `boolean` | No |  |
| `forks_count` | `number` | No |  |
| `full_name` | `string` | No | The full name including owner |
| `html_url` | `string` | No |  |
| `id` | `number` | No |  |
| `labels` | `table` | No |  |
| `language` | `string` | No |  |
| `milestone` | `table` | No |  |
| `name` | `string` | No | The name of the repository |
| `node_id` | `string` | No |  |
| `number` | `number` | No | The issue number |
| `open_issues_count` | `number` | No |  |
| `owner` | `table` | No |  |
| `private` | `boolean` | No | Whether the repository is private |
| `pushed_at` | `string` | No |  |
| `size` | `number` | No |  |
| `stargazers_count` | `number` | No |  |
| `state` | `string` | No |  |
| `title` | `string` | No | The issue title |
| `updated_at` | `string` | No |  |
| `url` | `string` | No |  |
| `user` | `table` | No |  |
| `visibility` | `string` | No |  |
| `watchers_count` | `number` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Search():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SearchEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## UserEntity

```lua
local user = client:User(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `avatar_url` | `string` | No | URL to the user's avatar image |
| `bio` | `string` | No |  |
| `blog` | `string` | No |  |
| `company` | `string` | No |  |
| `created_at` | `string` | No |  |
| `email` | `string` | No |  |
| `followers` | `number` | No |  |
| `following` | `number` | No |  |
| `html_url` | `string` | No |  |
| `id` | `number` | No | The user's unique identifier |
| `location` | `string` | No |  |
| `login` | `string` | No | The user's GitHub username |
| `name` | `string` | No |  |
| `node_id` | `string` | No |  |
| `public_gists` | `number` | No |  |
| `public_repos` | `number` | No |  |
| `type` | `string` | No |  |
| `updated_at` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:User():load({ id = "user_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UserEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

