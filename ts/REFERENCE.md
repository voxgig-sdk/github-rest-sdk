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
| `commit` | `Record<string, any>` | No |  |
| `name` | `string` | No |  |
| `protected` | `boolean` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Branch().list({ owner: "example", repo: "example" })
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
| `author` | `Record<string, any>` | No |  |
| `commit` | `Record<string, any>` | No |  |
| `committer` | `Record<string, any>` | No |  |
| `html_url` | `string` | No |  |
| `node_id` | `string` | No |  |
| `sha` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Commit().list({ owner: "example", repo: "example" })
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
| `created_at` | `string` | No |  |
| `description` | `string` | No | Description of the gist |
| `files` | `Record<string, any>` | Yes | Names and content for the files that make up the gist |
| `html_url` | `string` | No |  |
| `id` | `string` | No |  |
| `node_id` | `string` | No |  |
| `owner` | `Record<string, any>` | No |  |
| `public` | `boolean` | No | Whether the gist is public |
| `updated_at` | `string` | No |  |
| `url` | `string` | No |  |

### Field Usage by Operation

| Field | list | create |
| --- | --- | --- |
| `created_at` | - | - |
| `description` | - | - |
| `files` | Yes | - |
| `html_url` | - | - |
| `id` | - | - |
| `node_id` | - | - |
| `owner` | - | - |
| `public` | - | - |
| `updated_at` | - | - |
| `url` | - | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Gist().create({
  files: {},
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
| `assignee` | `any` | No |  |
| `assignees` | `any[]` | No | Logins for Users to assign to this issue |
| `body` | `string` | No | The contents of the issue |
| `closed_at` | `string` | No |  |
| `comments` | `number` | No |  |
| `created_at` | `string` | No |  |
| `html_url` | `string` | No |  |
| `id` | `number` | No |  |
| `labels` | `any[]` | No | Labels to associate with this issue |
| `milestone` | `Record<string, any>` | No | The number of the milestone to associate this issue with |
| `node_id` | `string` | No |  |
| `number` | `number` | No | The issue number |
| `state` | `string` | No | State of the issue |
| `title` | `string` | No | The issue title |
| `updated_at` | `string` | No |  |
| `url` | `string` | No |  |
| `user` | `Record<string, any>` | No |  |

### Field Usage by Operation

| Field | load | list | create | update |
| --- | --- | --- | --- | --- |
| `assignee` | - | - | - | - |
| `assignees` | - | - | - | - |
| `body` | - | - | - | - |
| `closed_at` | - | - | - | - |
| `comments` | - | - | - | - |
| `created_at` | - | - | - | - |
| `html_url` | - | - | - | - |
| `id` | - | - | - | - |
| `labels` | - | - | - | - |
| `milestone` | - | - | - | - |
| `node_id` | - | - | - | - |
| `number` | - | - | - | - |
| `state` | - | - | - | - |
| `title` | - | - | Yes | - |
| `updated_at` | - | - | - | - |
| `url` | - | - | - | - |
| `user` | - | - | - | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Issue().create({
  owner: 'example_owner',
  repo: 'example_repo',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Issue().list({ owner: "example", repo: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Issue().load({ id: 1, owner: 'owner', repo: 'repo' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Issue().update({
  id: 1,
  owner: 'owner',
  repo: 'repo',
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
| `id` | `string` | No |  |
| `last_read_at` | `string` | No |  |
| `reason` | `string` | No |  |
| `repository` | `Record<string, any>` | No |  |
| `subject` | `Record<string, any>` | No |  |
| `unread` | `boolean` | No |  |
| `updated_at` | `string` | No |  |
| `url` | `string` | No |  |

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
| `avatar_url` | `string` | No |  |
| `blog` | `string` | No |  |
| `created_at` | `string` | No |  |
| `description` | `string` | No |  |
| `email` | `string` | No |  |
| `followers` | `number` | No |  |
| `following` | `number` | No |  |
| `html_url` | `string` | No |  |
| `id` | `number` | No |  |
| `location` | `string` | No |  |
| `login` | `string` | No |  |
| `name` | `string` | No |  |
| `node_id` | `string` | No |  |
| `public_gists` | `number` | No |  |
| `public_repos` | `number` | No |  |
| `updated_at` | `string` | No |  |
| `url` | `string` | No |  |

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
| `base` | `Record<string, any>` | No | The name of the branch you want the changes pulled into |
| `body` | `string` | No | The contents of the pull request |
| `closed_at` | `string` | No |  |
| `created_at` | `string` | No |  |
| `draft` | `boolean` | No | Indicates whether the pull request is a draft |
| `head` | `Record<string, any>` | No | The name of the branch where your changes are implemented |
| `html_url` | `string` | No |  |
| `id` | `number` | No |  |
| `merged_at` | `string` | No |  |
| `node_id` | `string` | No |  |
| `number` | `number` | No |  |
| `state` | `string` | No |  |
| `title` | `string` | No | The title of the pull request |
| `updated_at` | `string` | No |  |
| `url` | `string` | No |  |
| `user` | `Record<string, any>` | No |  |

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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Pull().create({
  owner: 'example_owner',
  repo: 'example_repo',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Pull().list({ owner: "example", repo: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Pull().load({ id: 1, owner: 'owner', repo: 'repo' })
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
| `rate` | `Record<string, any>` | No |  |
| `resources` | `Record<string, any>` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.RateLimit().load()
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
| `avatar_url` | `string` | No | URL to the user's avatar image |
| `bio` | `string` | No |  |
| `blog` | `string` | No |  |
| `company` | `string` | No |  |
| `created_at` | `string` | No |  |
| `default_branch` | `string` | No |  |
| `description` | `string` | No |  |
| `email` | `string` | No |  |
| `followers` | `number` | No |  |
| `following` | `number` | No |  |
| `fork` | `boolean` | No |  |
| `forks_count` | `number` | No |  |
| `full_name` | `string` | No | The full name including owner |
| `html_url` | `string` | No |  |
| `id` | `number` | No | The user's unique identifier |
| `language` | `string` | No |  |
| `location` | `string` | No |  |
| `login` | `string` | No | The user's GitHub username |
| `name` | `string` | No | The name of the repository |
| `node_id` | `string` | No |  |
| `open_issues_count` | `number` | No |  |
| `owner` | `Record<string, any>` | No |  |
| `private` | `boolean` | No | Whether the repository is private |
| `public_gists` | `number` | No |  |
| `public_repos` | `number` | No |  |
| `pushed_at` | `string` | No |  |
| `size` | `number` | No |  |
| `stargazers_count` | `number` | No |  |
| `type` | `string` | No |  |
| `updated_at` | `string` | No |  |
| `url` | `string` | No |  |
| `visibility` | `string` | No |  |
| `watchers_count` | `number` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Repo().list({ username: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Repo().load({ owner: 'owner', repo: 'repo' })
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
| `assignee` | `any` | No |  |
| `assignees` | `any[]` | No |  |
| `body` | `string` | No |  |
| `closed_at` | `string` | No |  |
| `comments` | `number` | No |  |
| `created_at` | `string` | No |  |
| `default_branch` | `string` | No |  |
| `description` | `string` | No |  |
| `fork` | `boolean` | No |  |
| `forks_count` | `number` | No |  |
| `full_name` | `string` | No | The full name including owner |
| `html_url` | `string` | No |  |
| `id` | `number` | No |  |
| `labels` | `any[]` | No |  |
| `language` | `string` | No |  |
| `milestone` | `Record<string, any>` | No |  |
| `name` | `string` | No | The name of the repository |
| `node_id` | `string` | No |  |
| `number` | `number` | No | The issue number |
| `open_issues_count` | `number` | No |  |
| `owner` | `Record<string, any>` | No |  |
| `private` | `boolean` | No | Whether the repository is private |
| `pushed_at` | `string` | No |  |
| `size` | `number` | No |  |
| `stargazers_count` | `number` | No |  |
| `state` | `string` | No |  |
| `title` | `string` | No | The issue title |
| `updated_at` | `string` | No |  |
| `url` | `string` | No |  |
| `user` | `Record<string, any>` | No |  |
| `visibility` | `string` | No |  |
| `watchers_count` | `number` | No |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `issue` | `/search/issues` | `client.Search().list({ $action: 'issue', ... })` |
| `repository` | `/search/repositories` | `client.Search().list({ $action: 'repository', ... })` |

An action returns that action's OWN response, which is not necessarily a
Search record — check the API definition for its shape.

```ts
const result = await client.Search().list({
  $action: 'issue',
  /* ...the action's own arguments */
})
```

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
| `avatar_url` | `string` | No | URL to the user's avatar image |
| `bio` | `string` | No |  |
| `blog` | `string` | No |  |
| `company` | `string` | No |  |
| `created_at` | `string` | No |  |
| `email` | `string` | No |  |
| `followers` | `number` | No |  |
| `following` | `number` | No |  |
| `html_url` | `string` | No |  |
| `id` | `number` | No | The user's unique identifier |
| `location` | `string` | No |  |
| `login` | `string` | No | The user's GitHub username |
| `name` | `string` | No |  |
| `node_id` | `string` | No |  |
| `public_gists` | `number` | No |  |
| `public_repos` | `number` | No |  |
| `type` | `string` | No |  |
| `updated_at` | `string` | No |  |
| `url` | `string` | No |  |

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

