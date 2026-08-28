# GithubRest Python SDK



The Python SDK for the GithubRest API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Branch()` — each
carrying a small, uniform set of operations (`list`, `load`, `create`, `update`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/github-rest-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
import os
from githubrest_sdk import GithubRestSDK

client = GithubRestSDK({
    "apikey": os.environ.get("GITHUB_REST_APIKEY"),
})
```

### 2. List branch records

`list()` returns a `list` of records (each a `dict`) and raises on
error — iterate it directly.

```python
try:
    branchs = client.Branch().list({"owner": "example", "repo": "example"})
    for branch in branchs:
        print(branch)
except Exception as err:
    print(f"list failed: {err}")
```

### 3. Load an issue

Issue is nested under owner, so provide the `owner`.
`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    issue = client.Issue().load({"owner": "example_owner", "repo": "example_repo", "id": 1})
    print(issue)
except Exception as err:
    print(f"load failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    issues = client.Issue().list()
    print(issues)
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = GithubRestSDK.test()

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
issue = client.Issue().list()
# issue contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = GithubRestSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### GithubRestSDK

```python
from githubrest_sdk import GithubRestSDK

client = GithubRestSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = GithubRestSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### GithubRestSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
| `Branch` | `(data) -> BranchEntity` | Create a Branch entity instance. |
| `Commit` | `(data) -> CommitEntity` | Create a Commit entity instance. |
| `Gist` | `(data) -> GistEntity` | Create a Gist entity instance. |
| `Issue` | `(data) -> IssueEntity` | Create an Issue entity instance. |
| `Notification` | `(data) -> NotificationEntity` | Create a Notification entity instance. |
| `Org` | `(data) -> OrgEntity` | Create an Org entity instance. |
| `Pull` | `(data) -> PullEntity` | Create a Pull entity instance. |
| `RateLimit` | `(data) -> RateLimitEntity` | Create a RateLimit entity instance. |
| `Repo` | `(data) -> RepoEntity` | Create a Repo entity instance. |
| `Search` | `(data) -> SearchEntity` | Create a Search entity instance. |
| `User` | `(data) -> UserEntity` | Create an User entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

### Entities

#### Branch

| Field | Description |
| --- | --- |
| `commit` |  |
| `name` |  |
| `protected` |  |

Operations: List.

API path: `/repos/{owner}/{repo}/branches`

#### Commit

| Field | Description |
| --- | --- |
| `author` |  |
| `commit` |  |
| `committer` |  |
| `html_url` |  |
| `node_id` |  |
| `sha` |  |
| `url` |  |

Operations: List.

API path: `/repos/{owner}/{repo}/commits`

#### Gist

| Field | Description |
| --- | --- |
| `created_at` |  |
| `description` | Description of the gist |
| `files` | Names and content for the files that make up the gist |
| `html_url` |  |
| `id` |  |
| `node_id` |  |
| `owner` |  |
| `public` | Whether the gist is public |
| `updated_at` |  |
| `url` |  |

Operations: Create, List.

API path: `/gists`

#### Issue

| Field | Description |
| --- | --- |
| `assignee` |  |
| `assignees` | Logins for Users to assign to this issue |
| `body` | The contents of the issue |
| `closed_at` |  |
| `comments` |  |
| `created_at` |  |
| `html_url` |  |
| `id` |  |
| `labels` | Labels to associate with this issue |
| `milestone` | The number of the milestone to associate this issue with |
| `node_id` |  |
| `number` | The issue number |
| `state` | State of the issue |
| `title` | The issue title |
| `updated_at` |  |
| `url` |  |
| `user` |  |

Operations: Create, List, Load, Update.

API path: `/repos/{owner}/{repo}/issues`

#### Notification

| Field | Description |
| --- | --- |
| `id` |  |
| `last_read_at` |  |
| `reason` |  |
| `repository` |  |
| `subject` |  |
| `unread` |  |
| `updated_at` |  |
| `url` |  |

Operations: List.

API path: `/notifications`

#### Org

| Field | Description |
| --- | --- |
| `avatar_url` |  |
| `blog` |  |
| `created_at` |  |
| `description` |  |
| `email` |  |
| `followers` |  |
| `following` |  |
| `html_url` |  |
| `id` |  |
| `location` |  |
| `login` |  |
| `name` |  |
| `node_id` |  |
| `public_gists` |  |
| `public_repos` |  |
| `updated_at` |  |
| `url` |  |

Operations: Load.

API path: `/orgs/{org}`

#### Pull

| Field | Description |
| --- | --- |
| `base` | The name of the branch you want the changes pulled into |
| `body` | The contents of the pull request |
| `closed_at` |  |
| `created_at` |  |
| `draft` | Indicates whether the pull request is a draft |
| `head` | The name of the branch where your changes are implemented |
| `html_url` |  |
| `id` |  |
| `merged_at` |  |
| `node_id` |  |
| `number` |  |
| `state` |  |
| `title` | The title of the pull request |
| `updated_at` |  |
| `url` |  |
| `user` |  |

Operations: Create, List, Load.

API path: `/repos/{owner}/{repo}/pulls`

#### RateLimit

| Field | Description |
| --- | --- |
| `rate` |  |
| `resources` |  |

Operations: Load.

API path: `/rate_limit`

#### Repo

| Field | Description |
| --- | --- |
| `avatar_url` | URL to the user's avatar image |
| `bio` |  |
| `blog` |  |
| `company` |  |
| `created_at` |  |
| `default_branch` |  |
| `description` |  |
| `email` |  |
| `followers` |  |
| `following` |  |
| `fork` |  |
| `forks_count` |  |
| `full_name` | The full name including owner |
| `html_url` |  |
| `id` | The user's unique identifier |
| `language` |  |
| `location` |  |
| `login` | The user's GitHub username |
| `name` | The name of the repository |
| `node_id` |  |
| `open_issues_count` |  |
| `owner` |  |
| `private` | Whether the repository is private |
| `public_gists` |  |
| `public_repos` |  |
| `pushed_at` |  |
| `size` |  |
| `stargazers_count` |  |
| `type` |  |
| `updated_at` |  |
| `url` |  |
| `visibility` |  |
| `watchers_count` |  |

Operations: List, Load.

API path: `/users/{username}/repos`

#### Search

| Field | Description |
| --- | --- |
| `assignee` |  |
| `assignees` |  |
| `body` |  |
| `closed_at` |  |
| `comments` |  |
| `created_at` |  |
| `default_branch` |  |
| `description` |  |
| `fork` |  |
| `forks_count` |  |
| `full_name` | The full name including owner |
| `html_url` |  |
| `id` |  |
| `labels` |  |
| `language` |  |
| `milestone` |  |
| `name` | The name of the repository |
| `node_id` |  |
| `number` | The issue number |
| `open_issues_count` |  |
| `owner` |  |
| `private` | Whether the repository is private |
| `pushed_at` |  |
| `size` |  |
| `stargazers_count` |  |
| `state` |  |
| `title` | The issue title |
| `updated_at` |  |
| `url` |  |
| `user` |  |
| `visibility` |  |
| `watchers_count` |  |

Operations: List.

API path: `/search/issues`

#### User

| Field | Description |
| --- | --- |
| `avatar_url` | URL to the user's avatar image |
| `bio` |  |
| `blog` |  |
| `company` |  |
| `created_at` |  |
| `email` |  |
| `followers` |  |
| `following` |  |
| `html_url` |  |
| `id` | The user's unique identifier |
| `location` |  |
| `login` | The user's GitHub username |
| `name` |  |
| `node_id` |  |
| `public_gists` |  |
| `public_repos` |  |
| `type` |  |
| `updated_at` |  |
| `url` |  |

Operations: Load.

API path: `/users/{username}`



## Entities


### Branch

Create an instance: `branch = client.Branch()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `commit` | `dict` |  |
| `name` | `str` |  |
| `protected` | `bool` |  |

#### Example: List

```python
branchs = client.Branch().list({"owner": "example", "repo": "example"})
```


### Commit

Create an instance: `commit = client.Commit()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `author` | `dict` |  |
| `commit` | `dict` |  |
| `committer` | `dict` |  |
| `html_url` | `str` |  |
| `node_id` | `str` |  |
| `sha` | `str` |  |
| `url` | `str` |  |

#### Example: List

```python
commits = client.Commit().list({"owner": "example", "repo": "example"})
```


### Gist

Create an instance: `gist = client.Gist()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `str` |  |
| `description` | `str` | Description of the gist |
| `files` | `dict` | Names and content for the files that make up the gist |
| `html_url` | `str` |  |
| `id` | `str` |  |
| `node_id` | `str` |  |
| `owner` | `dict` |  |
| `public` | `bool` | Whether the gist is public |
| `updated_at` | `str` |  |
| `url` | `str` |  |

#### Example: List

```python
gists = client.Gist().list()
```

#### Example: Create

```python
gist = client.Gist().create({
    "files": {},  # dict
})
```


### Issue

Create an instance: `issue = client.Issue()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `assignee` | `Any` |  |
| `assignees` | `list` | Logins for Users to assign to this issue |
| `body` | `str` | The contents of the issue |
| `closed_at` | `str` |  |
| `comments` | `int` |  |
| `created_at` | `str` |  |
| `html_url` | `str` |  |
| `id` | `int` |  |
| `labels` | `list` | Labels to associate with this issue |
| `milestone` | `dict` | The number of the milestone to associate this issue with |
| `node_id` | `str` |  |
| `number` | `int` | The issue number |
| `state` | `str` | State of the issue |
| `title` | `str` | The issue title |
| `updated_at` | `str` |  |
| `url` | `str` |  |
| `user` | `dict` |  |

#### Example: Load

```python
issue = client.Issue().load({"id": 1, "owner": "owner", "repo": "repo"})
```

#### Example: List

```python
issues = client.Issue().list({"owner": "example", "repo": "example"})
```

#### Example: Create

```python
issue = client.Issue().create({
    "owner": "example_owner",  # str
    "repo": "example_repo",  # str
})
```


### Notification

Create an instance: `notification = client.Notification()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |
| `last_read_at` | `str` |  |
| `reason` | `str` |  |
| `repository` | `dict` |  |
| `subject` | `dict` |  |
| `unread` | `bool` |  |
| `updated_at` | `str` |  |
| `url` | `str` |  |

#### Example: List

```python
notifications = client.Notification().list()
```


### Org

Create an instance: `org = client.Org()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `avatar_url` | `str` |  |
| `blog` | `str` |  |
| `created_at` | `str` |  |
| `description` | `str` |  |
| `email` | `str` |  |
| `followers` | `int` |  |
| `following` | `int` |  |
| `html_url` | `str` |  |
| `id` | `int` |  |
| `location` | `str` |  |
| `login` | `str` |  |
| `name` | `str` |  |
| `node_id` | `str` |  |
| `public_gists` | `int` |  |
| `public_repos` | `int` |  |
| `updated_at` | `str` |  |
| `url` | `str` |  |

#### Example: Load

```python
org = client.Org().load({"id": "org_id"})
```


### Pull

Create an instance: `pull = client.Pull()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base` | `dict` | The name of the branch you want the changes pulled into |
| `body` | `str` | The contents of the pull request |
| `closed_at` | `str` |  |
| `created_at` | `str` |  |
| `draft` | `bool` | Indicates whether the pull request is a draft |
| `head` | `dict` | The name of the branch where your changes are implemented |
| `html_url` | `str` |  |
| `id` | `int` |  |
| `merged_at` | `str` |  |
| `node_id` | `str` |  |
| `number` | `int` |  |
| `state` | `str` |  |
| `title` | `str` | The title of the pull request |
| `updated_at` | `str` |  |
| `url` | `str` |  |
| `user` | `dict` |  |

#### Example: Load

```python
pull = client.Pull().load({"id": 1, "owner": "owner", "repo": "repo"})
```

#### Example: List

```python
pulls = client.Pull().list({"owner": "example", "repo": "example"})
```

#### Example: Create

```python
pull = client.Pull().create({
    "owner": "example_owner",  # str
    "repo": "example_repo",  # str
})
```


### RateLimit

Create an instance: `rate_limit = client.RateLimit()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `rate` | `dict` |  |
| `resources` | `dict` |  |

#### Example: Load

```python
rate_limit = client.RateLimit().load()
```


### Repo

Create an instance: `repo = client.Repo()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `avatar_url` | `str` | URL to the user's avatar image |
| `bio` | `str` |  |
| `blog` | `str` |  |
| `company` | `str` |  |
| `created_at` | `str` |  |
| `default_branch` | `str` |  |
| `description` | `str` |  |
| `email` | `str` |  |
| `followers` | `int` |  |
| `following` | `int` |  |
| `fork` | `bool` |  |
| `forks_count` | `int` |  |
| `full_name` | `str` | The full name including owner |
| `html_url` | `str` |  |
| `id` | `int` | The user's unique identifier |
| `language` | `str` |  |
| `location` | `str` |  |
| `login` | `str` | The user's GitHub username |
| `name` | `str` | The name of the repository |
| `node_id` | `str` |  |
| `open_issues_count` | `int` |  |
| `owner` | `dict` |  |
| `private` | `bool` | Whether the repository is private |
| `public_gists` | `int` |  |
| `public_repos` | `int` |  |
| `pushed_at` | `str` |  |
| `size` | `int` |  |
| `stargazers_count` | `int` |  |
| `type` | `str` |  |
| `updated_at` | `str` |  |
| `url` | `str` |  |
| `visibility` | `str` |  |
| `watchers_count` | `int` |  |

#### Example: Load

```python
repo = client.Repo().load({"owner": "owner", "repo": "repo"})
```

#### Example: List

```python
repos = client.Repo().list({"username": "example"})
```


### Search

Create an instance: `search = client.Search()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `assignee` | `Any` |  |
| `assignees` | `list` |  |
| `body` | `str` |  |
| `closed_at` | `str` |  |
| `comments` | `int` |  |
| `created_at` | `str` |  |
| `default_branch` | `str` |  |
| `description` | `str` |  |
| `fork` | `bool` |  |
| `forks_count` | `int` |  |
| `full_name` | `str` | The full name including owner |
| `html_url` | `str` |  |
| `id` | `int` |  |
| `labels` | `list` |  |
| `language` | `str` |  |
| `milestone` | `dict` |  |
| `name` | `str` | The name of the repository |
| `node_id` | `str` |  |
| `number` | `int` | The issue number |
| `open_issues_count` | `int` |  |
| `owner` | `dict` |  |
| `private` | `bool` | Whether the repository is private |
| `pushed_at` | `str` |  |
| `size` | `int` |  |
| `stargazers_count` | `int` |  |
| `state` | `str` |  |
| `title` | `str` | The issue title |
| `updated_at` | `str` |  |
| `url` | `str` |  |
| `user` | `dict` |  |
| `visibility` | `str` |  |
| `watchers_count` | `int` |  |

#### Example: List

```python
searchs = client.Search().list({"q": "example"})
```


### User

Create an instance: `user = client.User()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `avatar_url` | `str` | URL to the user's avatar image |
| `bio` | `str` |  |
| `blog` | `str` |  |
| `company` | `str` |  |
| `created_at` | `str` |  |
| `email` | `str` |  |
| `followers` | `int` |  |
| `following` | `int` |  |
| `html_url` | `str` |  |
| `id` | `int` | The user's unique identifier |
| `location` | `str` |  |
| `login` | `str` | The user's GitHub username |
| `name` | `str` |  |
| `node_id` | `str` |  |
| `public_gists` | `int` |  |
| `public_repos` | `int` |  |
| `type` | `str` |  |
| `updated_at` | `str` |  |
| `url` | `str` |  |

#### Example: Load

```python
user = client.User().load({"id": "user_id"})
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | In-memory mock transport for testing without a live server |

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── githubrest_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`githubrest_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
issue = client.Issue()
issue.list()

# issue.data_get() now returns the issue data from the last list
# issue.match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
