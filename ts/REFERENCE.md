# GithubRest TypeScript SDK Reference

Complete API reference for the GithubRest TypeScript SDK.


## GithubRestSDK

### Constructor

```ts
new GithubRestSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `GithubRestSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = GithubRestSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `GithubRestSDK` instance in test mode.


### Instance Methods

#### `Branch(data?: object)`

Create a new `Branch` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BranchEntity` instance.

#### `Commit(data?: object)`

Create a new `Commit` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CommitEntity` instance.

#### `Gist(data?: object)`

Create a new `Gist` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GistEntity` instance.

#### `Issue(data?: object)`

Create a new `Issue` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `IssueEntity` instance.

#### `Notification(data?: object)`

Create a new `Notification` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `NotificationEntity` instance.

#### `Org(data?: object)`

Create a new `Org` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `OrgEntity` instance.

#### `Pull(data?: object)`

Create a new `Pull` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PullEntity` instance.

#### `RateLimit(data?: object)`

Create a new `RateLimit` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RateLimitEntity` instance.

#### `Repo(data?: object)`

Create a new `Repo` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RepoEntity` instance.

#### `Search(data?: object)`

Create a new `Search` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SearchEntity` instance.

#### `User(data?: object)`

Create a new `User` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `UserEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `GithubRestSDK.test()`.

**Returns:** `GithubRestSDK` instance in test mode.


---

## BranchEntity

```ts
const branch = client.Branch()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `commit` | ``$OBJECT`` | No |  |
| `name` | ``$STRING`` | No |  |
| `protected` | ``$BOOLEAN`` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Branch().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BranchEntity` instance with the same client and
options.

#### `client()`

Return the parent `GithubRestSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CommitEntity

```ts
const commit = client.Commit()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Commit().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CommitEntity` instance with the same client and
options.

#### `client()`

Return the parent `GithubRestSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GistEntity

```ts
const gist = client.Gist()
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Gist().create({
  file: /* `$OBJECT` */,
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Gist().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GistEntity` instance with the same client and
options.

#### `client()`

Return the parent `GithubRestSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## IssueEntity

```ts
const issue = client.Issue()
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Issue().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Issue().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Issue().load({ id: 'issue_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Issue().update({
  id: 'issue_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `IssueEntity` instance with the same client and
options.

#### `client()`

Return the parent `GithubRestSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## NotificationEntity

```ts
const notification = client.Notification()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Notification().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `NotificationEntity` instance with the same client and
options.

#### `client()`

Return the parent `GithubRestSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## OrgEntity

```ts
const org = client.Org()
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

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Org().load({ id: 'org_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `OrgEntity` instance with the same client and
options.

#### `client()`

Return the parent `GithubRestSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PullEntity

```ts
const pull = client.Pull()
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Pull().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Pull().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Pull().load({ id: 'pull_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PullEntity` instance with the same client and
options.

#### `client()`

Return the parent `GithubRestSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RateLimitEntity

```ts
const rate_limit = client.RateLimit()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `rate` | ``$OBJECT`` | No |  |
| `resource` | ``$OBJECT`` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.RateLimit().load({ id: 'rate_limit_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RateLimitEntity` instance with the same client and
options.

#### `client()`

Return the parent `GithubRestSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RepoEntity

```ts
const repo = client.Repo()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Repo().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Repo().load({ id: 'repo_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RepoEntity` instance with the same client and
options.

#### `client()`

Return the parent `GithubRestSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SearchEntity

```ts
const search = client.Search()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Search().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SearchEntity` instance with the same client and
options.

#### `client()`

Return the parent `GithubRestSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## UserEntity

```ts
const user = client.User()
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

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.User().load({ id: 'user_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `UserEntity` instance with the same client and
options.

#### `client()`

Return the parent `GithubRestSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new GithubRestSDK({
  feature: {
    test: { active: true },
  }
})
```

