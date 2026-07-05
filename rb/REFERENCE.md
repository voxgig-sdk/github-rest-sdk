# GithubRest Ruby SDK Reference

Complete API reference for the GithubRest Ruby SDK.


## GithubRestSDK

### Constructor

```ruby
require_relative 'GithubRest_sdk'

client = GithubRestSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `GithubRestSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = GithubRestSDK.test
```


### Instance Methods

#### `Branch(data = nil)`

Create a new `Branch` entity instance. Pass `nil` for no initial data.

#### `Commit(data = nil)`

Create a new `Commit` entity instance. Pass `nil` for no initial data.

#### `Gist(data = nil)`

Create a new `Gist` entity instance. Pass `nil` for no initial data.

#### `Issue(data = nil)`

Create a new `Issue` entity instance. Pass `nil` for no initial data.

#### `Notification(data = nil)`

Create a new `Notification` entity instance. Pass `nil` for no initial data.

#### `Org(data = nil)`

Create a new `Org` entity instance. Pass `nil` for no initial data.

#### `Pull(data = nil)`

Create a new `Pull` entity instance. Pass `nil` for no initial data.

#### `RateLimit(data = nil)`

Create a new `RateLimit` entity instance. Pass `nil` for no initial data.

#### `Repo(data = nil)`

Create a new `Repo` entity instance. Pass `nil` for no initial data.

#### `Search(data = nil)`

Create a new `Search` entity instance. Pass `nil` for no initial data.

#### `User(data = nil)`

Create a new `User` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## BranchEntity

```ruby
branch = client.Branch
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `commit` | `Hash` | No |  |
| `name` | `String` | No |  |
| `protected` | `Boolean` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Branch.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BranchEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CommitEntity

```ruby
commit = client.Commit
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `author` | `Hash` | No |  |
| `commit` | `Hash` | No |  |
| `committer` | `Hash` | No |  |
| `html_url` | `String` | No |  |
| `node_id` | `String` | No |  |
| `sha` | `String` | No |  |
| `url` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Commit.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CommitEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## GistEntity

```ruby
gist = client.Gist
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `String` | No |  |
| `description` | `String` | No |  |
| `file` | `Hash` | Yes |  |
| `html_url` | `String` | No |  |
| `id` | `String` | No |  |
| `node_id` | `String` | No |  |
| `owner` | `Hash` | No |  |
| `public` | `Boolean` | No |  |
| `updated_at` | `String` | No |  |
| `url` | `String` | No |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Gist.create({
  "file" => {}, # Hash
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Gist.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `GistEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## IssueEntity

```ruby
issue = client.Issue
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `assignee` | `Object` | No |  |
| `body` | `String` | No |  |
| `closed_at` | `String` | No |  |
| `comment` | `Integer` | No |  |
| `created_at` | `String` | No |  |
| `html_url` | `String` | No |  |
| `id` | `Integer` | No |  |
| `label` | `Array` | No |  |
| `milestone` | `Hash` | No |  |
| `node_id` | `String` | No |  |
| `number` | `Integer` | No |  |
| `state` | `String` | No |  |
| `title` | `String` | No |  |
| `updated_at` | `String` | No |  |
| `url` | `String` | No |  |
| `user` | `Hash` | No |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Issue.create({
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Issue.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Issue.load({ "id" => "issue_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Raises on error.

```ruby
result = client.Issue.update({
  "id" => "issue_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `IssueEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## NotificationEntity

```ruby
notification = client.Notification
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | No |  |
| `last_read_at` | `String` | No |  |
| `reason` | `String` | No |  |
| `repository` | `Hash` | No |  |
| `subject` | `Hash` | No |  |
| `unread` | `Boolean` | No |  |
| `updated_at` | `String` | No |  |
| `url` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Notification.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `NotificationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## OrgEntity

```ruby
org = client.Org
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `avatar_url` | `String` | No |  |
| `blog` | `String` | No |  |
| `created_at` | `String` | No |  |
| `description` | `String` | No |  |
| `email` | `String` | No |  |
| `follower` | `Integer` | No |  |
| `following` | `Integer` | No |  |
| `html_url` | `String` | No |  |
| `id` | `Integer` | No |  |
| `location` | `String` | No |  |
| `login` | `String` | No |  |
| `name` | `String` | No |  |
| `node_id` | `String` | No |  |
| `public_gist` | `Integer` | No |  |
| `public_repo` | `Integer` | No |  |
| `updated_at` | `String` | No |  |
| `url` | `String` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Org.load({ "id" => "org_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `OrgEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PullEntity

```ruby
pull = client.Pull
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base` | `Hash` | No |  |
| `body` | `String` | No |  |
| `closed_at` | `String` | No |  |
| `created_at` | `String` | No |  |
| `draft` | `Boolean` | No |  |
| `head` | `Hash` | No |  |
| `html_url` | `String` | No |  |
| `id` | `Integer` | No |  |
| `merged_at` | `String` | No |  |
| `node_id` | `String` | No |  |
| `number` | `Integer` | No |  |
| `state` | `String` | No |  |
| `title` | `String` | No |  |
| `updated_at` | `String` | No |  |
| `url` | `String` | No |  |
| `user` | `Hash` | No |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Pull.create({
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Pull.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Pull.load({ "id" => "pull_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PullEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## RateLimitEntity

```ruby
rate_limit = client.RateLimit
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `rate` | `Hash` | No |  |
| `resource` | `Hash` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.RateLimit.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `RateLimitEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## RepoEntity

```ruby
repo = client.Repo
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `String` | No |  |
| `default_branch` | `String` | No |  |
| `description` | `String` | No |  |
| `fork` | `Boolean` | No |  |
| `forks_count` | `Integer` | No |  |
| `full_name` | `String` | No |  |
| `html_url` | `String` | No |  |
| `id` | `Integer` | No |  |
| `language` | `String` | No |  |
| `name` | `String` | No |  |
| `node_id` | `String` | No |  |
| `open_issues_count` | `Integer` | No |  |
| `owner` | `Hash` | No |  |
| `private` | `Boolean` | No |  |
| `pushed_at` | `String` | No |  |
| `size` | `Integer` | No |  |
| `stargazers_count` | `Integer` | No |  |
| `updated_at` | `String` | No |  |
| `url` | `String` | No |  |
| `visibility` | `String` | No |  |
| `watchers_count` | `Integer` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Repo.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Repo.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `RepoEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SearchEntity

```ruby
search = client.Search
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `assignee` | `Object` | No |  |
| `body` | `String` | No |  |
| `closed_at` | `String` | No |  |
| `comment` | `Integer` | No |  |
| `created_at` | `String` | No |  |
| `default_branch` | `String` | No |  |
| `description` | `String` | No |  |
| `fork` | `Boolean` | No |  |
| `forks_count` | `Integer` | No |  |
| `full_name` | `String` | No |  |
| `html_url` | `String` | No |  |
| `id` | `Integer` | No |  |
| `label` | `Array` | No |  |
| `language` | `String` | No |  |
| `milestone` | `Hash` | No |  |
| `name` | `String` | No |  |
| `node_id` | `String` | No |  |
| `number` | `Integer` | No |  |
| `open_issues_count` | `Integer` | No |  |
| `owner` | `Hash` | No |  |
| `private` | `Boolean` | No |  |
| `pushed_at` | `String` | No |  |
| `size` | `Integer` | No |  |
| `stargazers_count` | `Integer` | No |  |
| `state` | `String` | No |  |
| `title` | `String` | No |  |
| `updated_at` | `String` | No |  |
| `url` | `String` | No |  |
| `user` | `Hash` | No |  |
| `visibility` | `String` | No |  |
| `watchers_count` | `Integer` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Search.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SearchEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## UserEntity

```ruby
user = client.User
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `avatar_url` | `String` | No |  |
| `bio` | `String` | No |  |
| `blog` | `String` | No |  |
| `company` | `String` | No |  |
| `created_at` | `String` | No |  |
| `email` | `String` | No |  |
| `follower` | `Integer` | No |  |
| `following` | `Integer` | No |  |
| `html_url` | `String` | No |  |
| `id` | `Integer` | No |  |
| `location` | `String` | No |  |
| `login` | `String` | No |  |
| `name` | `String` | No |  |
| `node_id` | `String` | No |  |
| `public_gist` | `Integer` | No |  |
| `public_repo` | `Integer` | No |  |
| `type` | `String` | No |  |
| `updated_at` | `String` | No |  |
| `url` | `String` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.User.load({ "id" => "user_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `UserEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = GithubRestSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

