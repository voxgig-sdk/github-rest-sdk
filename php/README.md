# GithubRest PHP SDK



The PHP SDK for the GithubRest API — an entity-oriented client using PHP conventions.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
composer require voxgig-sdk/github-rest
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'githubrest_sdk.php';

$client = new GithubRestSDK([
    "apikey" => getenv("GITHUB-REST_APIKEY"),
]);
```

### 2. List branchs

```php
[$result, $err] = $client->Branch()->list();
if ($err) { throw new \Exception($err); }

if (is_array($result)) {
    foreach ($result as $item) {
        $d = $item->data_get();
        echo $d["id"] . " " . $d["name"] . "\n";
    }
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
if ($err) { throw new \Exception($err); }

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
}
```

### Prepare a request without sending it

```php
[$fetchdef, $err] = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);
if ($err) { throw new \Exception($err); }

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required:

```php
$client = GithubRestSDK::test();

[$result, $err] = $client->GithubRest()->load(["id" => "test01"]);
// $result contains mock response data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new GithubRestSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
GITHUB-REST_TEST_LIVE=TRUE
GITHUB-REST_APIKEY=<your-key>
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### GithubRestSDK

```php
require_once 'githubrest_sdk.php';
$client = new GithubRestSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = GithubRestSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### GithubRestSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Branch` | `($data): BranchEntity` | Create a Branch entity instance. |
| `Commit` | `($data): CommitEntity` | Create a Commit entity instance. |
| `Gist` | `($data): GistEntity` | Create a Gist entity instance. |
| `Issue` | `($data): IssueEntity` | Create a Issue entity instance. |
| `Notification` | `($data): NotificationEntity` | Create a Notification entity instance. |
| `Org` | `($data): OrgEntity` | Create a Org entity instance. |
| `Pull` | `($data): PullEntity` | Create a Pull entity instance. |
| `RateLimit` | `($data): RateLimitEntity` | Create a RateLimit entity instance. |
| `Repo` | `($data): RepoEntity` | Create a Repo entity instance. |
| `Search` | `($data): SearchEntity` | Create a Search entity instance. |
| `User` | `($data): UserEntity` | Create a User entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `($reqmatch, $ctrl): array` | List entities matching the criteria. |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `update` | `($reqdata, $ctrl): array` | Update an existing entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return `[$result, $err]`. The first value is an
`array` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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

Create an instance: `const branch = client.Branch()`

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

```ts
const branchs = await client.Branch().list()
```


### Commit

Create an instance: `const commit = client.Commit()`

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

```ts
const commits = await client.Commit().list()
```


### Gist

Create an instance: `const gist = client.Gist()`

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

```ts
const gists = await client.Gist().list()
```

#### Example: Create

```ts
const gist = await client.Gist().create({
  file: /* `$OBJECT` */,
})
```


### Issue

Create an instance: `const issue = client.Issue()`

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

```ts
const issue = await client.Issue().load({ id: 'issue_id' })
```

#### Example: List

```ts
const issues = await client.Issue().list()
```

#### Example: Create

```ts
const issue = await client.Issue().create({
})
```


### Notification

Create an instance: `const notification = client.Notification()`

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

```ts
const notifications = await client.Notification().list()
```


### Org

Create an instance: `const org = client.Org()`

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

```ts
const org = await client.Org().load({ id: 'org_id' })
```


### Pull

Create an instance: `const pull = client.Pull()`

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

```ts
const pull = await client.Pull().load({ id: 'pull_id' })
```

#### Example: List

```ts
const pulls = await client.Pull().list()
```

#### Example: Create

```ts
const pull = await client.Pull().create({
})
```


### RateLimit

Create an instance: `const rate_limit = client.RateLimit()`

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

```ts
const rate_limit = await client.RateLimit().load({ id: 'rate_limit_id' })
```


### Repo

Create an instance: `const repo = client.Repo()`

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

```ts
const repo = await client.Repo().load({ id: 'repo_id' })
```

#### Example: List

```ts
const repos = await client.Repo().list()
```


### Search

Create an instance: `const search = client.Search()`

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

```ts
const searchs = await client.Search().list()
```


### User

Create an instance: `const user = client.User()`

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

```ts
const user = await client.User().load({ id: 'user_id' })
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
error is returned to the caller as the second element in the return array.

### Features and hooks

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── githubrest_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`githubrest_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$moon = $client->Moon();
[$result, $err] = $moon->load(["planet_id" => "earth", "id" => "luna"]);

// $moon->dataGet() now returns the loaded moon data
// $moon->matchGet() returns the last match criteria
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
