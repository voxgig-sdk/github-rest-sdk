# GithubRest Lua SDK



The Lua SDK for the GithubRest API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Branch()` — each with the same small set of operations (`list`, `load`, `create`, `update`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/github-rest-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("github-rest_sdk")

local client = sdk.new({
  apikey = os.getenv("GITHUB_REST_APIKEY"),
})
```

### 2. List branch records

Entity operations return `(value, err)`. For `list`, `value` is the
array of records itself — iterate it directly (there is no wrapper).

```lua
local branchs, err = client:Branch():list()
if err then error(err) end

for _, item in ipairs(branchs) do
  print(item["name"])
end
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local branchs, err = client:Branch():list()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:Branch():list()
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
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
cd lua && busted test/
```


## Reference

### GithubRestSDK

```lua
local sdk = require("github-rest_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### GithubRestSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
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
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `create` | `(reqdata, ctrl) -> any, err` | Create a new entity. |
| `update` | `(reqdata, ctrl) -> any, err` | Update an existing entity. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` / `create` / `update` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local branch, err = client:Branch():load()
    if err then error(err) end
    -- branch is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

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
| `description` |  |
| `file` |  |
| `html_url` |  |
| `id` |  |
| `node_id` |  |
| `owner` |  |
| `public` |  |
| `updated_at` |  |
| `url` |  |

Operations: Create, List.

API path: `/gists`

#### Issue

| Field | Description |
| --- | --- |
| `assignee` |  |
| `body` |  |
| `closed_at` |  |
| `comment` |  |
| `created_at` |  |
| `html_url` |  |
| `id` |  |
| `label` |  |
| `milestone` |  |
| `node_id` |  |
| `number` |  |
| `state` |  |
| `title` |  |
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
| `follower` |  |
| `following` |  |
| `html_url` |  |
| `id` |  |
| `location` |  |
| `login` |  |
| `name` |  |
| `node_id` |  |
| `public_gist` |  |
| `public_repo` |  |
| `updated_at` |  |
| `url` |  |

Operations: Load.

API path: `/orgs/{org}`

#### Pull

| Field | Description |
| --- | --- |
| `base` |  |
| `body` |  |
| `closed_at` |  |
| `created_at` |  |
| `draft` |  |
| `head` |  |
| `html_url` |  |
| `id` |  |
| `merged_at` |  |
| `node_id` |  |
| `number` |  |
| `state` |  |
| `title` |  |
| `updated_at` |  |
| `url` |  |
| `user` |  |

Operations: Create, List, Load.

API path: `/repos/{owner}/{repo}/pulls`

#### RateLimit

| Field | Description |
| --- | --- |
| `rate` |  |
| `resource` |  |

Operations: Load.

API path: `/rate_limit`

#### Repo

| Field | Description |
| --- | --- |
| `created_at` |  |
| `default_branch` |  |
| `description` |  |
| `fork` |  |
| `forks_count` |  |
| `full_name` |  |
| `html_url` |  |
| `id` |  |
| `language` |  |
| `name` |  |
| `node_id` |  |
| `open_issues_count` |  |
| `owner` |  |
| `private` |  |
| `pushed_at` |  |
| `size` |  |
| `stargazers_count` |  |
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
| `body` |  |
| `closed_at` |  |
| `comment` |  |
| `created_at` |  |
| `default_branch` |  |
| `description` |  |
| `fork` |  |
| `forks_count` |  |
| `full_name` |  |
| `html_url` |  |
| `id` |  |
| `label` |  |
| `language` |  |
| `milestone` |  |
| `name` |  |
| `node_id` |  |
| `number` |  |
| `open_issues_count` |  |
| `owner` |  |
| `private` |  |
| `pushed_at` |  |
| `size` |  |
| `stargazers_count` |  |
| `state` |  |
| `title` |  |
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
| `avatar_url` |  |
| `bio` |  |
| `blog` |  |
| `company` |  |
| `created_at` |  |
| `email` |  |
| `follower` |  |
| `following` |  |
| `html_url` |  |
| `id` |  |
| `location` |  |
| `login` |  |
| `name` |  |
| `node_id` |  |
| `public_gist` |  |
| `public_repo` |  |
| `type` |  |
| `updated_at` |  |
| `url` |  |

Operations: Load.

API path: `/users/{username}`



## Entities


### Branch

Create an instance: `local branch = client:Branch(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `commit` | `table` |  |
| `name` | `string` |  |
| `protected` | `boolean` |  |

#### Example: List

```lua
local branchs, err = client:Branch():list()
```


### Commit

Create an instance: `local commit = client:Commit(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `author` | `table` |  |
| `commit` | `table` |  |
| `committer` | `table` |  |
| `html_url` | `string` |  |
| `node_id` | `string` |  |
| `sha` | `string` |  |
| `url` | `string` |  |

#### Example: List

```lua
local commits, err = client:Commit():list()
```


### Gist

Create an instance: `local gist = client:Gist(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` |  |
| `description` | `string` |  |
| `file` | `table` |  |
| `html_url` | `string` |  |
| `id` | `string` |  |
| `node_id` | `string` |  |
| `owner` | `table` |  |
| `public` | `boolean` |  |
| `updated_at` | `string` |  |
| `url` | `string` |  |

#### Example: List

```lua
local gists, err = client:Gist():list()
```

#### Example: Create

```lua
local gist, err = client:Gist():create({
  file = nil, -- table
})
```


### Issue

Create an instance: `local issue = client:Issue(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `assignee` | `any` |  |
| `body` | `string` |  |
| `closed_at` | `string` |  |
| `comment` | `number` |  |
| `created_at` | `string` |  |
| `html_url` | `string` |  |
| `id` | `number` |  |
| `label` | `table` |  |
| `milestone` | `table` |  |
| `node_id` | `string` |  |
| `number` | `number` |  |
| `state` | `string` |  |
| `title` | `string` |  |
| `updated_at` | `string` |  |
| `url` | `string` |  |
| `user` | `table` |  |

#### Example: Load

```lua
local issue, err = client:Issue():load({ id = "issue_id" })
```

#### Example: List

```lua
local issues, err = client:Issue():list()
```

#### Example: Create

```lua
local issue, err = client:Issue():create({
})
```


### Notification

Create an instance: `local notification = client:Notification(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `last_read_at` | `string` |  |
| `reason` | `string` |  |
| `repository` | `table` |  |
| `subject` | `table` |  |
| `unread` | `boolean` |  |
| `updated_at` | `string` |  |
| `url` | `string` |  |

#### Example: List

```lua
local notifications, err = client:Notification():list()
```


### Org

Create an instance: `local org = client:Org(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `avatar_url` | `string` |  |
| `blog` | `string` |  |
| `created_at` | `string` |  |
| `description` | `string` |  |
| `email` | `string` |  |
| `follower` | `number` |  |
| `following` | `number` |  |
| `html_url` | `string` |  |
| `id` | `number` |  |
| `location` | `string` |  |
| `login` | `string` |  |
| `name` | `string` |  |
| `node_id` | `string` |  |
| `public_gist` | `number` |  |
| `public_repo` | `number` |  |
| `updated_at` | `string` |  |
| `url` | `string` |  |

#### Example: Load

```lua
local org, err = client:Org():load({ id = "org_id" })
```


### Pull

Create an instance: `local pull = client:Pull(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base` | `table` |  |
| `body` | `string` |  |
| `closed_at` | `string` |  |
| `created_at` | `string` |  |
| `draft` | `boolean` |  |
| `head` | `table` |  |
| `html_url` | `string` |  |
| `id` | `number` |  |
| `merged_at` | `string` |  |
| `node_id` | `string` |  |
| `number` | `number` |  |
| `state` | `string` |  |
| `title` | `string` |  |
| `updated_at` | `string` |  |
| `url` | `string` |  |
| `user` | `table` |  |

#### Example: Load

```lua
local pull, err = client:Pull():load({ id = "pull_id" })
```

#### Example: List

```lua
local pulls, err = client:Pull():list()
```

#### Example: Create

```lua
local pull, err = client:Pull():create({
})
```


### RateLimit

Create an instance: `local rate_limit = client:RateLimit(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `rate` | `table` |  |
| `resource` | `table` |  |

#### Example: Load

```lua
local rate_limit, err = client:RateLimit():load()
```


### Repo

Create an instance: `local repo = client:Repo(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` |  |
| `default_branch` | `string` |  |
| `description` | `string` |  |
| `fork` | `boolean` |  |
| `forks_count` | `number` |  |
| `full_name` | `string` |  |
| `html_url` | `string` |  |
| `id` | `number` |  |
| `language` | `string` |  |
| `name` | `string` |  |
| `node_id` | `string` |  |
| `open_issues_count` | `number` |  |
| `owner` | `table` |  |
| `private` | `boolean` |  |
| `pushed_at` | `string` |  |
| `size` | `number` |  |
| `stargazers_count` | `number` |  |
| `updated_at` | `string` |  |
| `url` | `string` |  |
| `visibility` | `string` |  |
| `watchers_count` | `number` |  |

#### Example: Load

```lua
local repo, err = client:Repo():load()
```

#### Example: List

```lua
local repos, err = client:Repo():list()
```


### Search

Create an instance: `local search = client:Search(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `assignee` | `any` |  |
| `body` | `string` |  |
| `closed_at` | `string` |  |
| `comment` | `number` |  |
| `created_at` | `string` |  |
| `default_branch` | `string` |  |
| `description` | `string` |  |
| `fork` | `boolean` |  |
| `forks_count` | `number` |  |
| `full_name` | `string` |  |
| `html_url` | `string` |  |
| `id` | `number` |  |
| `label` | `table` |  |
| `language` | `string` |  |
| `milestone` | `table` |  |
| `name` | `string` |  |
| `node_id` | `string` |  |
| `number` | `number` |  |
| `open_issues_count` | `number` |  |
| `owner` | `table` |  |
| `private` | `boolean` |  |
| `pushed_at` | `string` |  |
| `size` | `number` |  |
| `stargazers_count` | `number` |  |
| `state` | `string` |  |
| `title` | `string` |  |
| `updated_at` | `string` |  |
| `url` | `string` |  |
| `user` | `table` |  |
| `visibility` | `string` |  |
| `watchers_count` | `number` |  |

#### Example: List

```lua
local searchs, err = client:Search():list()
```


### User

Create an instance: `local user = client:User(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `avatar_url` | `string` |  |
| `bio` | `string` |  |
| `blog` | `string` |  |
| `company` | `string` |  |
| `created_at` | `string` |  |
| `email` | `string` |  |
| `follower` | `number` |  |
| `following` | `number` |  |
| `html_url` | `string` |  |
| `id` | `number` |  |
| `location` | `string` |  |
| `login` | `string` |  |
| `name` | `string` |  |
| `node_id` | `string` |  |
| `public_gist` | `number` |  |
| `public_repo` | `number` |  |
| `type` | `string` |  |
| `updated_at` | `string` |  |
| `url` | `string` |  |

#### Example: Load

```lua
local user, err = client:User():load({ id = "user_id" })
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

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── github-rest_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`github-rest_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```lua
local branch = client:Branch()
branch:list()

-- branch:data_get() now returns the branch data from the last list
-- branch:match_get() returns the last match criteria
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
