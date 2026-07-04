# GithubRest Ruby SDK



The Ruby SDK for the GithubRest API — an entity-oriented client using idiomatic Ruby conventions.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/github-rest-sdk/releases](https://github.com/voxgig-sdk/github-rest-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "GithubRest_sdk"

client = GithubRestSDK.new({
  "apikey" => ENV["GITHUB_REST_APIKEY"],
})
```

### 2. List branch records

```ruby
begin
  # list returns an Array of Branch records — iterate directly.
  branchs = client.Branch.list
  branchs.each do |item|
    puts "#{item["id"]} #{item["name"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  warn result["err"]
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```ruby
client = GithubRestSDK.test({
  "entity" => { "branch" => { "test01" => { "id" => "test01" } } },
})

# load returns the bare mock record (raises on error).
branch = client.Branch.load({ "id" => "test01" })
puts branch
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = GithubRestSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
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
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### GithubRestSDK

```ruby
require_relative "GithubRest_sdk"
client = GithubRestSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `String` | API key for authentication. |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = GithubRestSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### GithubRestSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
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
| `list` | `(reqmatch, ctrl) -> Array` | List entities matching the criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `GithubRestError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

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

Create an instance: `branch = client.Branch`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `commit` | ``$OBJECT`` |  |
| `name` | ``$STRING`` |  |
| `protected` | ``$BOOLEAN`` |  |

#### Example: List

```ruby
# list returns an Array of Branch records (raises on error).
branchs = client.Branch.list
```


### Commit

Create an instance: `commit = client.Commit`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

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

```ruby
# list returns an Array of Commit records (raises on error).
commits = client.Commit.list
```


### Gist

Create an instance: `gist = client.Gist`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

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

```ruby
# list returns an Array of Gist records (raises on error).
gists = client.Gist.list
```

#### Example: Create

```ruby
gist = client.Gist.create({
  "file" => nil, # `$OBJECT`
})
```


### Issue

Create an instance: `issue = client.Issue`

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

```ruby
# load returns the bare Issue record (raises on error).
issue = client.Issue.load({ "id" => "issue_id" })
```

#### Example: List

```ruby
# list returns an Array of Issue records (raises on error).
issues = client.Issue.list
```

#### Example: Create

```ruby
issue = client.Issue.create({
})
```


### Notification

Create an instance: `notification = client.Notification`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

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

```ruby
# list returns an Array of Notification records (raises on error).
notifications = client.Notification.list
```


### Org

Create an instance: `org = client.Org`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

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

```ruby
# load returns the bare Org record (raises on error).
org = client.Org.load({ "id" => "org_id" })
```


### Pull

Create an instance: `pull = client.Pull`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

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

```ruby
# load returns the bare Pull record (raises on error).
pull = client.Pull.load({ "id" => "pull_id" })
```

#### Example: List

```ruby
# list returns an Array of Pull records (raises on error).
pulls = client.Pull.list
```

#### Example: Create

```ruby
pull = client.Pull.create({
})
```


### RateLimit

Create an instance: `rate_limit = client.RateLimit`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `rate` | ``$OBJECT`` |  |
| `resource` | ``$OBJECT`` |  |

#### Example: Load

```ruby
# load returns the bare RateLimit record (raises on error).
rate_limit = client.RateLimit.load({ "id" => "rate_limit_id" })
```


### Repo

Create an instance: `repo = client.Repo`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

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

```ruby
# load returns the bare Repo record (raises on error).
repo = client.Repo.load({ "id" => "repo_id" })
```

#### Example: List

```ruby
# list returns an Array of Repo records (raises on error).
repos = client.Repo.list
```


### Search

Create an instance: `search = client.Search`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

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

```ruby
# list returns an Array of Search records (raises on error).
searchs = client.Search.list
```


### User

Create an instance: `user = client.User`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

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

```ruby
# load returns the bare User record (raises on error).
user = client.User.load({ "id" => "user_id" })
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
error is returned to the caller as a second return value.

### Features and hooks

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── GithubRest_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`GithubRest_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```ruby
branch = client.Branch
branch.load({ "id" => "example_id" })

# branch.data_get now returns the loaded branch data
# branch.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
