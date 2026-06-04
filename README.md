# GithubRest SDK

Programmatic access to GitHub repositories, issues, pull requests, users, and organizations

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About GitHub REST API

The [GitHub REST API](https://docs.github.com/en/rest) is the official HTTP interface to [GitHub](https://github.com), operated by GitHub, Inc. (a subsidiary of Microsoft). It lets applications create integrations, retrieve data, and automate workflows across repositories, issues, pull requests, users, and organizations.

What you get from the API:

- Repository data: metadata, contents, branches, commits, tags, and releases.
- Collaboration: issues, pull requests, reviews, comments, and notifications.
- Identity: user profiles, organizations, teams, and membership.
- Discovery: full-text search across code, issues, repositories, and users.
- Service info: rate-limit status and gist storage.

Requests are made against `https://api.github.com`. Authentication is via personal access tokens (classic or fine-grained), GitHub App installation tokens, or OAuth app tokens; many endpoints also work unauthenticated at a lower rate-limit tier. Clients should handle pagination via `Link` headers and back off when rate-limit headers indicate the quota is exhausted.

## Try it

**TypeScript**
```bash
npm install github-rest
```

**Python**
```bash
pip install github-rest-sdk
```

**PHP**
```bash
composer require voxgig/github-rest-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/github-rest-sdk/go
```

**Ruby**
```bash
gem install github-rest-sdk
```

**Lua**
```bash
luarocks install github-rest-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { GithubRestSDK } from 'github-rest'

const client = new GithubRestSDK({})

// List all branchs
const branchs = await client.Branch().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o github-rest-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "github-rest": {
      "command": "/abs/path/to/github-rest-mcp"
    }
  }
}
```

## Entities

The API exposes 11 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Branch** | A named line of development in a repository, exposed under `/repos/{owner}/{repo}/branches`. | `/repos/{owner}/{repo}/branches` |
| **Commit** | A single commit in a repository's history, exposed under `/repos/{owner}/{repo}/commits`. | `/repos/{owner}/{repo}/commits` |
| **Gist** | A standalone snippet or set of files hosted on GitHub, exposed under `/gists`. | `/gists` |
| **Issue** | A bug report, task, or discussion thread on a repository, exposed under `/repos/{owner}/{repo}/issues` and `/issues`. | `/repos/{owner}/{repo}/issues` |
| **Notification** | An inbox item summarising activity the authenticated user is subscribed to, exposed under `/notifications`. | `/notifications` |
| **Org** | A GitHub organization that groups members, teams, and repositories, exposed under `/orgs/{org}`. | `/orgs/{org}` |
| **Pull** | A pull request proposing changes from one branch into another, exposed under `/repos/{owner}/{repo}/pulls`. | `/repos/{owner}/{repo}/pulls` |
| **RateLimit** | The authenticated client's current rate-limit usage across REST, search, and GraphQL, exposed at `/rate_limit`. | `/rate_limit` |
| **Repo** | A Git repository hosted on GitHub, including its metadata and contents, exposed under `/repos/{owner}/{repo}`. | `/users/{username}/repos` |
| **Search** | Full-text search across repositories, code, issues, users, and topics, exposed under `/search/{kind}`. | `/search/issues` |
| **User** | A GitHub user account and its public profile, exposed under `/users/{username}` and `/user`. | `/users/{username}` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from githubrest_sdk import GithubRestSDK

client = GithubRestSDK({})

# List all branchs
branchs, err = client.Branch(None).list(None, None)
```

### PHP

```php
<?php
require_once 'githubrest_sdk.php';

$client = new GithubRestSDK([]);

// List all branchs
[$branchs, $err] = $client->Branch(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/github-rest-sdk/go"

client := sdk.NewGithubRestSDK(map[string]any{})

// List all branchs
branchs, err := client.Branch(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "GithubRest_sdk"

client = GithubRestSDK.new({})

# List all branchs
branchs, err = client.Branch(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("github-rest_sdk")

local client = sdk.new({})

-- List all branchs
local branchs, err = client:Branch(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = GithubRestSDK.test()
const result = await client.Branch().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = GithubRestSDK.test(None, None)
result, err = client.Branch(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = GithubRestSDK::test(null, null);
[$result, $err] = $client->Branch(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Branch(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = GithubRestSDK.test(nil, nil)
result, err = client.Branch(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Branch(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the GitHub REST API

- Upstream: [https://github.com](https://github.com)
- API docs: [https://docs.github.com/en/rest](https://docs.github.com/en/rest)

- API access is governed by the [GitHub Terms of Service](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service) and the [Acceptable Use Policies](https://docs.github.com/en/site-policy/acceptable-use-policies).
- This SDK wrapper is distributed under the MIT license; the underlying API and content belong to GitHub, Inc. and the respective repository owners.
- Respect per-resource visibility: private repositories, issues, and user data require appropriate authorization scopes.

---

Generated from the GitHub REST API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
