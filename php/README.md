# GithubRest PHP SDK



The PHP SDK for the GithubRest API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Branch()` — with named operations (`list`/`load`/`create`/`update`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/github-rest-sdk/releases](https://github.com/voxgig-sdk/github-rest-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'githubrest_sdk.php';

$client = new GithubRestSDK([
    "apikey" => getenv("GITHUB_REST_APIKEY"),
]);
```

### 2. List branch records

```php
try {
    // list() returns an array of Branch records — iterate directly.
    $branchs = $client->Branch()->list();
    foreach ($branchs as $item) {
        echo $item["commit"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $branchs = $client->Branch()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required:

```php
$client = GithubRestSDK::test();

// Entity ops return the bare mock record (throws on error).
$branch = $client->Branch()->list();
print_r($branch);
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
GITHUB_REST_TEST_LIVE=TRUE
GITHUB_REST_APIKEY=<your-key>
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
| `Issue` | `($data): IssueEntity` | Create an Issue entity instance. |
| `Notification` | `($data): NotificationEntity` | Create a Notification entity instance. |
| `Org` | `($data): OrgEntity` | Create an Org entity instance. |
| `Pull` | `($data): PullEntity` | Create a Pull entity instance. |
| `RateLimit` | `($data): RateLimitEntity` | Create a RateLimit entity instance. |
| `Repo` | `($data): RepoEntity` | Create a Repo entity instance. |
| `Search` | `($data): SearchEntity` | Create a Search entity instance. |
| `User` | `($data): UserEntity` | Create an User entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `update` | `($reqdata, $ctrl): array` | Update an existing entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the bare result data (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

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

Create an instance: `$branch = $client->Branch();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `commit` | `array` |  |
| `name` | `string` |  |
| `protected` | `bool` |  |

#### Example: List

```php
// list() returns an array of Branch records (throws on error).
$branchs = $client->Branch()->list();
```


### Commit

Create an instance: `$commit = $client->Commit();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `author` | `array` |  |
| `commit` | `array` |  |
| `committer` | `array` |  |
| `html_url` | `string` |  |
| `node_id` | `string` |  |
| `sha` | `string` |  |
| `url` | `string` |  |

#### Example: List

```php
// list() returns an array of Commit records (throws on error).
$commits = $client->Commit()->list();
```


### Gist

Create an instance: `$gist = $client->Gist();`

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
| `file` | `array` |  |
| `html_url` | `string` |  |
| `id` | `string` |  |
| `node_id` | `string` |  |
| `owner` | `array` |  |
| `public` | `bool` |  |
| `updated_at` | `string` |  |
| `url` | `string` |  |

#### Example: List

```php
// list() returns an array of Gist records (throws on error).
$gists = $client->Gist()->list();
```

#### Example: Create

```php
$gist = $client->Gist()->create([
    "file" => null, // array
]);
```


### Issue

Create an instance: `$issue = $client->Issue();`

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
| `assignee` | `mixed` |  |
| `body` | `string` |  |
| `closed_at` | `string` |  |
| `comment` | `int` |  |
| `created_at` | `string` |  |
| `html_url` | `string` |  |
| `id` | `int` |  |
| `label` | `array` |  |
| `milestone` | `array` |  |
| `node_id` | `string` |  |
| `number` | `int` |  |
| `state` | `string` |  |
| `title` | `string` |  |
| `updated_at` | `string` |  |
| `url` | `string` |  |
| `user` | `array` |  |

#### Example: Load

```php
// load() returns the bare Issue record (throws on error).
$issue = $client->Issue()->load(["id" => "issue_id"]);
```

#### Example: List

```php
// list() returns an array of Issue records (throws on error).
$issues = $client->Issue()->list();
```

#### Example: Create

```php
$issue = $client->Issue()->create([
]);
```


### Notification

Create an instance: `$notification = $client->Notification();`

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
| `repository` | `array` |  |
| `subject` | `array` |  |
| `unread` | `bool` |  |
| `updated_at` | `string` |  |
| `url` | `string` |  |

#### Example: List

```php
// list() returns an array of Notification records (throws on error).
$notifications = $client->Notification()->list();
```


### Org

Create an instance: `$org = $client->Org();`

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
| `follower` | `int` |  |
| `following` | `int` |  |
| `html_url` | `string` |  |
| `id` | `int` |  |
| `location` | `string` |  |
| `login` | `string` |  |
| `name` | `string` |  |
| `node_id` | `string` |  |
| `public_gist` | `int` |  |
| `public_repo` | `int` |  |
| `updated_at` | `string` |  |
| `url` | `string` |  |

#### Example: Load

```php
// load() returns the bare Org record (throws on error).
$org = $client->Org()->load(["id" => "org_id"]);
```


### Pull

Create an instance: `$pull = $client->Pull();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base` | `array` |  |
| `body` | `string` |  |
| `closed_at` | `string` |  |
| `created_at` | `string` |  |
| `draft` | `bool` |  |
| `head` | `array` |  |
| `html_url` | `string` |  |
| `id` | `int` |  |
| `merged_at` | `string` |  |
| `node_id` | `string` |  |
| `number` | `int` |  |
| `state` | `string` |  |
| `title` | `string` |  |
| `updated_at` | `string` |  |
| `url` | `string` |  |
| `user` | `array` |  |

#### Example: Load

```php
// load() returns the bare Pull record (throws on error).
$pull = $client->Pull()->load(["id" => "pull_id"]);
```

#### Example: List

```php
// list() returns an array of Pull records (throws on error).
$pulls = $client->Pull()->list();
```

#### Example: Create

```php
$pull = $client->Pull()->create([
]);
```


### RateLimit

Create an instance: `$rate_limit = $client->RateLimit();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `rate` | `array` |  |
| `resource` | `array` |  |

#### Example: Load

```php
// load() returns the bare RateLimit record (throws on error).
$rate_limit = $client->RateLimit()->load();
```


### Repo

Create an instance: `$repo = $client->Repo();`

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
| `fork` | `bool` |  |
| `forks_count` | `int` |  |
| `full_name` | `string` |  |
| `html_url` | `string` |  |
| `id` | `int` |  |
| `language` | `string` |  |
| `name` | `string` |  |
| `node_id` | `string` |  |
| `open_issues_count` | `int` |  |
| `owner` | `array` |  |
| `private` | `bool` |  |
| `pushed_at` | `string` |  |
| `size` | `int` |  |
| `stargazers_count` | `int` |  |
| `updated_at` | `string` |  |
| `url` | `string` |  |
| `visibility` | `string` |  |
| `watchers_count` | `int` |  |

#### Example: Load

```php
// load() returns the bare Repo record (throws on error).
$repo = $client->Repo()->load();
```

#### Example: List

```php
// list() returns an array of Repo records (throws on error).
$repos = $client->Repo()->list();
```


### Search

Create an instance: `$search = $client->Search();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `assignee` | `mixed` |  |
| `body` | `string` |  |
| `closed_at` | `string` |  |
| `comment` | `int` |  |
| `created_at` | `string` |  |
| `default_branch` | `string` |  |
| `description` | `string` |  |
| `fork` | `bool` |  |
| `forks_count` | `int` |  |
| `full_name` | `string` |  |
| `html_url` | `string` |  |
| `id` | `int` |  |
| `label` | `array` |  |
| `language` | `string` |  |
| `milestone` | `array` |  |
| `name` | `string` |  |
| `node_id` | `string` |  |
| `number` | `int` |  |
| `open_issues_count` | `int` |  |
| `owner` | `array` |  |
| `private` | `bool` |  |
| `pushed_at` | `string` |  |
| `size` | `int` |  |
| `stargazers_count` | `int` |  |
| `state` | `string` |  |
| `title` | `string` |  |
| `updated_at` | `string` |  |
| `url` | `string` |  |
| `user` | `array` |  |
| `visibility` | `string` |  |
| `watchers_count` | `int` |  |

#### Example: List

```php
// list() returns an array of Search records (throws on error).
$searchs = $client->Search()->list();
```


### User

Create an instance: `$user = $client->User();`

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
| `follower` | `int` |  |
| `following` | `int` |  |
| `html_url` | `string` |  |
| `id` | `int` |  |
| `location` | `string` |  |
| `login` | `string` |  |
| `name` | `string` |  |
| `node_id` | `string` |  |
| `public_gist` | `int` |  |
| `public_repo` | `int` |  |
| `type` | `string` |  |
| `updated_at` | `string` |  |
| `url` | `string` |  |

#### Example: Load

```php
// load() returns the bare User record (throws on error).
$user = $client->User()->load(["id" => "user_id"]);
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

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$branch = $client->Branch();
$branch->list();

// $branch->data_get() now returns the branch data from the last list
// $branch->match_get() returns the last match criteria
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
