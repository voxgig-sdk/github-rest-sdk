# GithubRest TypeScript SDK



The TypeScript SDK for the GithubRest API — a type-safe, entity-oriented client with full async/await support.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/github-rest-sdk/releases](https://github.com/voxgig-sdk/github-rest-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { GithubRestSDK } from '@voxgig-sdk/github-rest'

const client = new GithubRestSDK({
  apikey: process.env.GITHUB_REST_APIKEY,
})
```

### 2. List branch records

`list()` resolves to an array of Branch objects — iterate it directly:

```ts
const branchs = await client.Branch().list()

for (const branch of branchs) {
  console.log(branch)
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = GithubRestSDK.test()

const branch = await client.Branch().load({ id: 'test01' })
// branch is a bare entity populated with mock response data
console.log(branch)
```

You can also use the instance method:

```ts
const client = new GithubRestSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Branch()

// First call sets internal match
await entity.load({ id: 'example' })

// Subsequent calls reuse the stored match
const data = entity.data()
console.log(data.id) // 'example'
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new GithubRestSDK({
  apikey: '...',
  extend: [logger],
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
cd ts && npm test
```


## Reference

### GithubRestSDK

#### Constructor

```ts
new GithubRestSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Branch(data?)` | `BranchEntity` | Create a Branch entity instance. |
| `Commit(data?)` | `CommitEntity` | Create a Commit entity instance. |
| `Gist(data?)` | `GistEntity` | Create a Gist entity instance. |
| `Issue(data?)` | `IssueEntity` | Create an Issue entity instance. |
| `Notification(data?)` | `NotificationEntity` | Create a Notification entity instance. |
| `Org(data?)` | `OrgEntity` | Create an Org entity instance. |
| `Pull(data?)` | `PullEntity` | Create a Pull entity instance. |
| `RateLimit(data?)` | `RateLimitEntity` | Create a RateLimit entity instance. |
| `Repo(data?)` | `RepoEntity` | Create a Repo entity instance. |
| `Search(data?)` | `SearchEntity` | Create a Search entity instance. |
| `User(data?)` | `UserEntity` | Create an User entity instance. |
| `tester(testopts?, sdkopts?)` | `GithubRestSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `GithubRestSDK.test(testopts?, sdkopts?)` | `GithubRestSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Entity>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<void>` | Remove an entity. |
| `data` | `data(data?): any` | Get or set entity data. |
| `match` | `match(match?): any` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): GithubRestSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load`, `create` and `update` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).
- `remove` resolves to `void`.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Branch

| Field | Description |
| --- | --- |
| `commit` |  |
| `name` |  |
| `protected` |  |

Operations: list.

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

Operations: list.

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

Operations: create, list.

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

Operations: create, list, load, update.

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

Operations: list.

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

Operations: load.

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

Operations: create, list, load.

API path: `/repos/{owner}/{repo}/pulls`

#### RateLimit

| Field | Description |
| --- | --- |
| `rate` |  |
| `resource` |  |

Operations: load.

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

Operations: list, load.

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

Operations: list.

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

Operations: load.

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
error is returned to the caller.

An unexpected exception triggers the `PreUnexpected` hook before
propagating.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
github-rest/
├── src/
│   ├── GithubRestSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { GithubRestSDK } from '@voxgig-sdk/github-rest'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const branch = client.Branch()
await branch.load({ id: "example_id" })

// branch.data() now returns the loaded branch data
// branch.match() returns { id: "example_id" }
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
