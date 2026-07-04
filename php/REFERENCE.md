# GithubRest PHP SDK Reference

Complete API reference for the GithubRest PHP SDK.


## GithubRestSDK

### Constructor

```php
require_once __DIR__ . '/github-rest_sdk.php';

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

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

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
| `commit` | ``$OBJECT`` | No |  |
| `name` | ``$STRING`` | No |  |
| `protected` | ``$BOOLEAN`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->Branch()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): BranchEntity`

Create a new `BranchEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## CommitEntity

```php
$commit = $client->Commit();
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

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->Commit()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): CommitEntity`

Create a new `CommitEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## GistEntity

```php
$gist = $client->Gist();
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Gist()->create([
  "file" => /* `$OBJECT` */,
]);
```

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->Gist()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): GistEntity`

Create a new `GistEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## IssueEntity

```php
$issue = $client->Issue();
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Issue()->create([
]);
```

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->Issue()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Issue()->load(["id" => "issue_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->Issue()->update([
  "id" => "issue_id",
  // Fields to update
]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): IssueEntity`

Create a new `IssueEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## NotificationEntity

```php
$notification = $client->Notification();
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

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->Notification()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): NotificationEntity`

Create a new `NotificationEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## OrgEntity

```php
$org = $client->Org();
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

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Org()->load(["id" => "org_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): OrgEntity`

Create a new `OrgEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## PullEntity

```php
$pull = $client->Pull();
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Pull()->create([
]);
```

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->Pull()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Pull()->load(["id" => "pull_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): PullEntity`

Create a new `PullEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## RateLimitEntity

```php
$rate_limit = $client->RateLimit();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `rate` | ``$OBJECT`` | No |  |
| `resource` | ``$OBJECT`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->RateLimit()->load(["id" => "rate_limit_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): RateLimitEntity`

Create a new `RateLimitEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## RepoEntity

```php
$repo = $client->Repo();
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

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->Repo()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Repo()->load(["id" => "repo_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): RepoEntity`

Create a new `RepoEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## SearchEntity

```php
$search = $client->Search();
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

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->Search()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): SearchEntity`

Create a new `SearchEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## UserEntity

```php
$user = $client->User();
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

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->User()->load(["id" => "user_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): UserEntity`

Create a new `UserEntity` instance with the same client and
options.

#### `getName(): string`

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

