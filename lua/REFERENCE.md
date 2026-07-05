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
| `description` | `string` | No |  |
| `file` | `table` | Yes |  |
| `html_url` | `string` | No |  |
| `id` | `string` | No |  |
| `node_id` | `string` | No |  |
| `owner` | `table` | No |  |
| `public` | `boolean` | No |  |
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Gist():create({
  file = --[[ table ]],
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
| `body` | `string` | No |  |
| `closed_at` | `string` | No |  |
| `comment` | `number` | No |  |
| `created_at` | `string` | No |  |
| `html_url` | `string` | No |  |
| `id` | `number` | No |  |
| `label` | `table` | No |  |
| `milestone` | `table` | No |  |
| `node_id` | `string` | No |  |
| `number` | `number` | No |  |
| `state` | `string` | No |  |
| `title` | `string` | No |  |
| `updated_at` | `string` | No |  |
| `url` | `string` | No |  |
| `user` | `table` | No |  |

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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Issue():create({
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
local result, err = client:Issue():load({ id = "issue_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:Issue():update({
  id = "issue_id",
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
| `follower` | `number` | No |  |
| `following` | `number` | No |  |
| `html_url` | `string` | No |  |
| `id` | `number` | No |  |
| `location` | `string` | No |  |
| `login` | `string` | No |  |
| `name` | `string` | No |  |
| `node_id` | `string` | No |  |
| `public_gist` | `number` | No |  |
| `public_repo` | `number` | No |  |
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
| `base` | `table` | No |  |
| `body` | `string` | No |  |
| `closed_at` | `string` | No |  |
| `created_at` | `string` | No |  |
| `draft` | `boolean` | No |  |
| `head` | `table` | No |  |
| `html_url` | `string` | No |  |
| `id` | `number` | No |  |
| `merged_at` | `string` | No |  |
| `node_id` | `string` | No |  |
| `number` | `number` | No |  |
| `state` | `string` | No |  |
| `title` | `string` | No |  |
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
local result, err = client:Pull():load({ id = "pull_id" })
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
| `resource` | `table` | No |  |

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
| `created_at` | `string` | No |  |
| `default_branch` | `string` | No |  |
| `description` | `string` | No |  |
| `fork` | `boolean` | No |  |
| `forks_count` | `number` | No |  |
| `full_name` | `string` | No |  |
| `html_url` | `string` | No |  |
| `id` | `number` | No |  |
| `language` | `string` | No |  |
| `name` | `string` | No |  |
| `node_id` | `string` | No |  |
| `open_issues_count` | `number` | No |  |
| `owner` | `table` | No |  |
| `private` | `boolean` | No |  |
| `pushed_at` | `string` | No |  |
| `size` | `number` | No |  |
| `stargazers_count` | `number` | No |  |
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
local result, err = client:Repo():load()
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
| `body` | `string` | No |  |
| `closed_at` | `string` | No |  |
| `comment` | `number` | No |  |
| `created_at` | `string` | No |  |
| `default_branch` | `string` | No |  |
| `description` | `string` | No |  |
| `fork` | `boolean` | No |  |
| `forks_count` | `number` | No |  |
| `full_name` | `string` | No |  |
| `html_url` | `string` | No |  |
| `id` | `number` | No |  |
| `label` | `table` | No |  |
| `language` | `string` | No |  |
| `milestone` | `table` | No |  |
| `name` | `string` | No |  |
| `node_id` | `string` | No |  |
| `number` | `number` | No |  |
| `open_issues_count` | `number` | No |  |
| `owner` | `table` | No |  |
| `private` | `boolean` | No |  |
| `pushed_at` | `string` | No |  |
| `size` | `number` | No |  |
| `stargazers_count` | `number` | No |  |
| `state` | `string` | No |  |
| `title` | `string` | No |  |
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
| `avatar_url` | `string` | No |  |
| `bio` | `string` | No |  |
| `blog` | `string` | No |  |
| `company` | `string` | No |  |
| `created_at` | `string` | No |  |
| `email` | `string` | No |  |
| `follower` | `number` | No |  |
| `following` | `number` | No |  |
| `html_url` | `string` | No |  |
| `id` | `number` | No |  |
| `location` | `string` | No |  |
| `login` | `string` | No |  |
| `name` | `string` | No |  |
| `node_id` | `string` | No |  |
| `public_gist` | `number` | No |  |
| `public_repo` | `number` | No |  |
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

