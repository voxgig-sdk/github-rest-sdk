# GithubRest PHP SDK Reference

Complete API reference for the GithubRest PHP SDK.


## GithubRestSDK

### Constructor

```php
require_once __DIR__ . '/githubrest_sdk.php';

$client = new GithubRestSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `GithubRestSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = GithubRestSDK::test();
```


### Instance Methods

#### `Branch($data = null)`

Create a new `BranchEntity` instance. Pass `null` for no initial data.

#### `Commit($data = null)`

Create a new `CommitEntity` instance. Pass `null` for no initial data.

#### `Gist($data = null)`

Create a new `GistEntity` instance. Pass `null` for no initial data.

#### `Issue($data = null)`

Create a new `IssueEntity` instance. Pass `null` for no initial data.

#### `Notification($data = null)`

Create a new `NotificationEntity` instance. Pass `null` for no initial data.

#### `Org($data = null)`

Create a new `OrgEntity` instance. Pass `null` for no initial data.

#### `Pull($data = null)`

Create a new `PullEntity` instance. Pass `null` for no initial data.

#### `RateLimit($data = null)`

Create a new `RateLimitEntity` instance. Pass `null` for no initial data.

#### `Repo($data = null)`

Create a new `RepoEntity` instance. Pass `null` for no initial data.

#### `Search($data = null)`

Create a new `SearchEntity` instance. Pass `null` for no initial data.

#### `User($data = null)`

Create a new `UserEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): GithubRestUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## BranchEntity

```php
$branch = $client->Branch();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `commit` | `array` | No |  |
| `name` | `string` | No |  |
| `protected` | `bool` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Branch()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BranchEntity`

Create a new `BranchEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CommitEntity

```php
$commit = $client->Commit();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `author` | `array` | No |  |
| `commit` | `array` | No |  |
| `committer` | `array` | No |  |
| `html_url` | `string` | No |  |
| `node_id` | `string` | No |  |
| `sha` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Commit()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CommitEntity`

Create a new `CommitEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## GistEntity

```php
$gist = $client->Gist();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No |  |
| `description` | `string` | No |  |
| `file` | `array` | Yes |  |
| `html_url` | `string` | No |  |
| `id` | `string` | No |  |
| `node_id` | `string` | No |  |
| `owner` | `array` | No |  |
| `public` | `bool` | No |  |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Gist()->create([
  "file" => null, // array
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Gist()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): GistEntity`

Create a new `GistEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## IssueEntity

```php
$issue = $client->Issue();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `assignee` | `mixed` | No |  |
| `body` | `string` | No |  |
| `closed_at` | `string` | No |  |
| `comment` | `int` | No |  |
| `created_at` | `string` | No |  |
| `html_url` | `string` | No |  |
| `id` | `int` | No |  |
| `label` | `array` | No |  |
| `milestone` | `array` | No |  |
| `node_id` | `string` | No |  |
| `number` | `int` | No |  |
| `state` | `string` | No |  |
| `title` | `string` | No |  |
| `updated_at` | `string` | No |  |
| `url` | `string` | No |  |
| `user` | `array` | No |  |

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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Issue()->create([
  "owner" => null, // string
  "repo" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Issue()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Issue()->load(["id" => 1, "owner" => "owner", "repo" => "repo"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->Issue()->update([
  "id" => 1,
  "owner" => "owner",
  "repo" => "repo",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): IssueEntity`

Create a new `IssueEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## NotificationEntity

```php
$notification = $client->Notification();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `last_read_at` | `string` | No |  |
| `reason` | `string` | No |  |
| `repository` | `array` | No |  |
| `subject` | `array` | No |  |
| `unread` | `bool` | No |  |
| `updated_at` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Notification()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): NotificationEntity`

Create a new `NotificationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## OrgEntity

```php
$org = $client->Org();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `avatar_url` | `string` | No |  |
| `blog` | `string` | No |  |
| `created_at` | `string` | No |  |
| `description` | `string` | No |  |
| `email` | `string` | No |  |
| `follower` | `int` | No |  |
| `following` | `int` | No |  |
| `html_url` | `string` | No |  |
| `id` | `int` | No |  |
| `location` | `string` | No |  |
| `login` | `string` | No |  |
| `name` | `string` | No |  |
| `node_id` | `string` | No |  |
| `public_gist` | `int` | No |  |
| `public_repo` | `int` | No |  |
| `updated_at` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Org()->load(["id" => "org_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): OrgEntity`

Create a new `OrgEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PullEntity

```php
$pull = $client->Pull();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base` | `array` | No |  |
| `body` | `string` | No |  |
| `closed_at` | `string` | No |  |
| `created_at` | `string` | No |  |
| `draft` | `bool` | No |  |
| `head` | `array` | No |  |
| `html_url` | `string` | No |  |
| `id` | `int` | No |  |
| `merged_at` | `string` | No |  |
| `node_id` | `string` | No |  |
| `number` | `int` | No |  |
| `state` | `string` | No |  |
| `title` | `string` | No |  |
| `updated_at` | `string` | No |  |
| `url` | `string` | No |  |
| `user` | `array` | No |  |

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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Pull()->create([
  "owner" => null, // string
  "repo" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Pull()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Pull()->load(["id" => 1, "owner" => "owner", "repo" => "repo"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PullEntity`

Create a new `PullEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## RateLimitEntity

```php
$rate_limit = $client->RateLimit();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `rate` | `array` | No |  |
| `resource` | `array` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->RateLimit()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): RateLimitEntity`

Create a new `RateLimitEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## RepoEntity

```php
$repo = $client->Repo();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No |  |
| `default_branch` | `string` | No |  |
| `description` | `string` | No |  |
| `fork` | `bool` | No |  |
| `forks_count` | `int` | No |  |
| `full_name` | `string` | No |  |
| `html_url` | `string` | No |  |
| `id` | `int` | No |  |
| `language` | `string` | No |  |
| `name` | `string` | No |  |
| `node_id` | `string` | No |  |
| `open_issues_count` | `int` | No |  |
| `owner` | `array` | No |  |
| `private` | `bool` | No |  |
| `pushed_at` | `string` | No |  |
| `size` | `int` | No |  |
| `stargazers_count` | `int` | No |  |
| `updated_at` | `string` | No |  |
| `url` | `string` | No |  |
| `visibility` | `string` | No |  |
| `watchers_count` | `int` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Repo()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Repo()->load(["owner" => "owner", "repo" => "repo"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): RepoEntity`

Create a new `RepoEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SearchEntity

```php
$search = $client->Search();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `assignee` | `mixed` | No |  |
| `body` | `string` | No |  |
| `closed_at` | `string` | No |  |
| `comment` | `int` | No |  |
| `created_at` | `string` | No |  |
| `default_branch` | `string` | No |  |
| `description` | `string` | No |  |
| `fork` | `bool` | No |  |
| `forks_count` | `int` | No |  |
| `full_name` | `string` | No |  |
| `html_url` | `string` | No |  |
| `id` | `int` | No |  |
| `label` | `array` | No |  |
| `language` | `string` | No |  |
| `milestone` | `array` | No |  |
| `name` | `string` | No |  |
| `node_id` | `string` | No |  |
| `number` | `int` | No |  |
| `open_issues_count` | `int` | No |  |
| `owner` | `array` | No |  |
| `private` | `bool` | No |  |
| `pushed_at` | `string` | No |  |
| `size` | `int` | No |  |
| `stargazers_count` | `int` | No |  |
| `state` | `string` | No |  |
| `title` | `string` | No |  |
| `updated_at` | `string` | No |  |
| `url` | `string` | No |  |
| `user` | `array` | No |  |
| `visibility` | `string` | No |  |
| `watchers_count` | `int` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Search()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SearchEntity`

Create a new `SearchEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## UserEntity

```php
$user = $client->User();
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
| `follower` | `int` | No |  |
| `following` | `int` | No |  |
| `html_url` | `string` | No |  |
| `id` | `int` | No |  |
| `location` | `string` | No |  |
| `login` | `string` | No |  |
| `name` | `string` | No |  |
| `node_id` | `string` | No |  |
| `public_gist` | `int` | No |  |
| `public_repo` | `int` | No |  |
| `type` | `string` | No |  |
| `updated_at` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->User()->load(["id" => "user_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): UserEntity`

Create a new `UserEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new GithubRestSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

