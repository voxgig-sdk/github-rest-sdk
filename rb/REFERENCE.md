# GithubRest Ruby SDK Reference

Complete API reference for the GithubRest Ruby SDK.


## GithubRestSDK

### Constructor

```ruby
require_relative 'github-rest_sdk'

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

#### `direct(fetchargs = {}) -> Hash, err`

Make a direct HTTP request to any API endpoint.

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

**Returns:** `Hash, err`

#### `prepare(fetchargs = {}) -> Hash, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Hash, err`


---

## BranchEntity

```ruby
branch = client.Branch
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `commit` | ``$OBJECT`` | No |  |
| `name` | ``$STRING`` | No |  |
| `protected` | ``$BOOLEAN`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.Branch.list(nil)
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
| `author` | ``$OBJECT`` | No |  |
| `commit` | ``$OBJECT`` | No |  |
| `committer` | ``$OBJECT`` | No |  |
| `html_url` | ``$STRING`` | No |  |
| `node_id` | ``$STRING`` | No |  |
| `sha` | ``$STRING`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.Commit.list(nil)
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

#### `create(reqdata, ctrl = nil) -> result, err`

Create a new entity with the given data.

```ruby
result, err = client.Gist.create({
  "file" => # `$OBJECT`,
})
```

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.Gist.list(nil)
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

#### `create(reqdata, ctrl = nil) -> result, err`

Create a new entity with the given data.

```ruby
result, err = client.Issue.create({
})
```

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.Issue.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.Issue.load({ "id" => "issue_id" })
```

#### `update(reqdata, ctrl = nil) -> result, err`

Update an existing entity. The data must include the entity `id`.

```ruby
result, err = client.Issue.update({
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
| `id` | ``$STRING`` | No |  |
| `last_read_at` | ``$STRING`` | No |  |
| `reason` | ``$STRING`` | No |  |
| `repository` | ``$OBJECT`` | No |  |
| `subject` | ``$OBJECT`` | No |  |
| `unread` | ``$BOOLEAN`` | No |  |
| `updated_at` | ``$STRING`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.Notification.list(nil)
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

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.Org.load({ "id" => "org_id" })
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

#### `create(reqdata, ctrl = nil) -> result, err`

Create a new entity with the given data.

```ruby
result, err = client.Pull.create({
})
```

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.Pull.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.Pull.load({ "id" => "pull_id" })
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
| `rate` | ``$OBJECT`` | No |  |
| `resource` | ``$OBJECT`` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.RateLimit.load({ "id" => "rate_limit_id" })
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

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.Repo.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.Repo.load({ "id" => "repo_id" })
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

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.Search.list(nil)
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

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.User.load({ "id" => "user_id" })
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

