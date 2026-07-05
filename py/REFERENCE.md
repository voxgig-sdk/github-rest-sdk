# GithubRest Python SDK Reference

Complete API reference for the GithubRest Python SDK.


## GithubRestSDK

### Constructor

```python
from githubrest_sdk import GithubRestSDK

client = GithubRestSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `GithubRestSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = GithubRestSDK.test()
```


### Instance Methods

#### `Branch(data=None)`

Create a new `BranchEntity` instance. Pass `None` for no initial data.

#### `Commit(data=None)`

Create a new `CommitEntity` instance. Pass `None` for no initial data.

#### `Gist(data=None)`

Create a new `GistEntity` instance. Pass `None` for no initial data.

#### `Issue(data=None)`

Create a new `IssueEntity` instance. Pass `None` for no initial data.

#### `Notification(data=None)`

Create a new `NotificationEntity` instance. Pass `None` for no initial data.

#### `Org(data=None)`

Create a new `OrgEntity` instance. Pass `None` for no initial data.

#### `Pull(data=None)`

Create a new `PullEntity` instance. Pass `None` for no initial data.

#### `RateLimit(data=None)`

Create a new `RateLimitEntity` instance. Pass `None` for no initial data.

#### `Repo(data=None)`

Create a new `RepoEntity` instance. Pass `None` for no initial data.

#### `Search(data=None)`

Create a new `SearchEntity` instance. Pass `None` for no initial data.

#### `User(data=None)`

Create a new `UserEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## BranchEntity

```python
branch = client.Branch()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `commit` | `dict` | No |  |
| `name` | `str` | No |  |
| `protected` | `bool` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Branch().list()
for branch in results:
    print(branch)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BranchEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CommitEntity

```python
commit = client.Commit()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `author` | `dict` | No |  |
| `commit` | `dict` | No |  |
| `committer` | `dict` | No |  |
| `html_url` | `str` | No |  |
| `node_id` | `str` | No |  |
| `sha` | `str` | No |  |
| `url` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Commit().list()
for commit in results:
    print(commit)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CommitEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## GistEntity

```python
gist = client.Gist()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | No |  |
| `description` | `str` | No |  |
| `file` | `dict` | Yes |  |
| `html_url` | `str` | No |  |
| `id` | `str` | No |  |
| `node_id` | `str` | No |  |
| `owner` | `dict` | No |  |
| `public` | `bool` | No |  |
| `updated_at` | `str` | No |  |
| `url` | `str` | No |  |

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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Gist().create({
    "file": {},  # dict
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Gist().list()
for gist in results:
    print(gist)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GistEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## IssueEntity

```python
issue = client.Issue()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `assignee` | `Any` | No |  |
| `body` | `str` | No |  |
| `closed_at` | `str` | No |  |
| `comment` | `int` | No |  |
| `created_at` | `str` | No |  |
| `html_url` | `str` | No |  |
| `id` | `int` | No |  |
| `label` | `list` | No |  |
| `milestone` | `dict` | No |  |
| `node_id` | `str` | No |  |
| `number` | `int` | No |  |
| `state` | `str` | No |  |
| `title` | `str` | No |  |
| `updated_at` | `str` | No |  |
| `url` | `str` | No |  |
| `user` | `dict` | No |  |

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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Issue().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Issue().list()
for issue in results:
    print(issue)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Issue().load({"id": "issue_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Issue().update({
    "id": "issue_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `IssueEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## NotificationEntity

```python
notification = client.Notification()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |
| `last_read_at` | `str` | No |  |
| `reason` | `str` | No |  |
| `repository` | `dict` | No |  |
| `subject` | `dict` | No |  |
| `unread` | `bool` | No |  |
| `updated_at` | `str` | No |  |
| `url` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Notification().list()
for notification in results:
    print(notification)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `NotificationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## OrgEntity

```python
org = client.Org()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `avatar_url` | `str` | No |  |
| `blog` | `str` | No |  |
| `created_at` | `str` | No |  |
| `description` | `str` | No |  |
| `email` | `str` | No |  |
| `follower` | `int` | No |  |
| `following` | `int` | No |  |
| `html_url` | `str` | No |  |
| `id` | `int` | No |  |
| `location` | `str` | No |  |
| `login` | `str` | No |  |
| `name` | `str` | No |  |
| `node_id` | `str` | No |  |
| `public_gist` | `int` | No |  |
| `public_repo` | `int` | No |  |
| `updated_at` | `str` | No |  |
| `url` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Org().load({"id": "org_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OrgEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PullEntity

```python
pull = client.Pull()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base` | `dict` | No |  |
| `body` | `str` | No |  |
| `closed_at` | `str` | No |  |
| `created_at` | `str` | No |  |
| `draft` | `bool` | No |  |
| `head` | `dict` | No |  |
| `html_url` | `str` | No |  |
| `id` | `int` | No |  |
| `merged_at` | `str` | No |  |
| `node_id` | `str` | No |  |
| `number` | `int` | No |  |
| `state` | `str` | No |  |
| `title` | `str` | No |  |
| `updated_at` | `str` | No |  |
| `url` | `str` | No |  |
| `user` | `dict` | No |  |

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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Pull().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Pull().list()
for pull in results:
    print(pull)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Pull().load({"id": "pull_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PullEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RateLimitEntity

```python
rate_limit = client.RateLimit()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `rate` | `dict` | No |  |
| `resource` | `dict` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.RateLimit().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RateLimitEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RepoEntity

```python
repo = client.Repo()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | No |  |
| `default_branch` | `str` | No |  |
| `description` | `str` | No |  |
| `fork` | `bool` | No |  |
| `forks_count` | `int` | No |  |
| `full_name` | `str` | No |  |
| `html_url` | `str` | No |  |
| `id` | `int` | No |  |
| `language` | `str` | No |  |
| `name` | `str` | No |  |
| `node_id` | `str` | No |  |
| `open_issues_count` | `int` | No |  |
| `owner` | `dict` | No |  |
| `private` | `bool` | No |  |
| `pushed_at` | `str` | No |  |
| `size` | `int` | No |  |
| `stargazers_count` | `int` | No |  |
| `updated_at` | `str` | No |  |
| `url` | `str` | No |  |
| `visibility` | `str` | No |  |
| `watchers_count` | `int` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Repo().list()
for repo in results:
    print(repo)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Repo().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RepoEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SearchEntity

```python
search = client.Search()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `assignee` | `Any` | No |  |
| `body` | `str` | No |  |
| `closed_at` | `str` | No |  |
| `comment` | `int` | No |  |
| `created_at` | `str` | No |  |
| `default_branch` | `str` | No |  |
| `description` | `str` | No |  |
| `fork` | `bool` | No |  |
| `forks_count` | `int` | No |  |
| `full_name` | `str` | No |  |
| `html_url` | `str` | No |  |
| `id` | `int` | No |  |
| `label` | `list` | No |  |
| `language` | `str` | No |  |
| `milestone` | `dict` | No |  |
| `name` | `str` | No |  |
| `node_id` | `str` | No |  |
| `number` | `int` | No |  |
| `open_issues_count` | `int` | No |  |
| `owner` | `dict` | No |  |
| `private` | `bool` | No |  |
| `pushed_at` | `str` | No |  |
| `size` | `int` | No |  |
| `stargazers_count` | `int` | No |  |
| `state` | `str` | No |  |
| `title` | `str` | No |  |
| `updated_at` | `str` | No |  |
| `url` | `str` | No |  |
| `user` | `dict` | No |  |
| `visibility` | `str` | No |  |
| `watchers_count` | `int` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Search().list()
for search in results:
    print(search)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SearchEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## UserEntity

```python
user = client.User()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `avatar_url` | `str` | No |  |
| `bio` | `str` | No |  |
| `blog` | `str` | No |  |
| `company` | `str` | No |  |
| `created_at` | `str` | No |  |
| `email` | `str` | No |  |
| `follower` | `int` | No |  |
| `following` | `int` | No |  |
| `html_url` | `str` | No |  |
| `id` | `int` | No |  |
| `location` | `str` | No |  |
| `login` | `str` | No |  |
| `name` | `str` | No |  |
| `node_id` | `str` | No |  |
| `public_gist` | `int` | No |  |
| `public_repo` | `int` | No |  |
| `type` | `str` | No |  |
| `updated_at` | `str` | No |  |
| `url` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.User().load({"id": "user_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UserEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = GithubRestSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

