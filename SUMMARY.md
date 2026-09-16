# GitHub REST API

The GitHub REST API allows developers to create integrations, retrieve data, and automate workflows on the GitHub platform. It provides access to various functionalities, enabling interaction with repositories, issues, pull requests, and user accounts among others.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 11 entities and 21 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Branch

Results: Successful response.

SDK operations: `list`.

### Commit

Results: Successful response.

SDK operations: `list`.

### Gist

Results: Gist created; Successful response.

SDK operations: `create`, `list`.

Key fields to recognise:

- `description`: Description of the gist
- `files`: Names and content for the files that make up the gist
- `public`: Whether the gist is public

### Issue

Results: Issue created; Successful response; Issue updated.

SDK operations: `create`, `list`, `load`, `update`.

Key fields to recognise:

- `assignees`: Logins for Users to assign to this issue
- `body`: The contents of the issue
- `labels`: Labels to associate with this issue
- `milestone`: The number of the milestone to associate this issue with
- `number`: The issue number

### Notification

Results: Successful response.

SDK operations: `list`.

### Org

Results: Successful response.

SDK operations: `load`.

### Pull

Results: Pull request created; Successful response.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `base`: The name of the branch you want the changes pulled into
- `body`: The contents of the pull request
- `draft`: Indicates whether the pull request is a draft
- `head`: The name of the branch where your changes are implemented
- `title`: The title of the pull request

### RateLimit

Results: Successful response.

SDK operations: `load`.

### Repo

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `avatar_url`: URL to the user&#39;s avatar image
- `full_name`: The full name including owner
- `github-rest_id`: The user&#39;s unique identifier
- `id`: The user&#39;s unique identifier
- `login`: The user&#39;s GitHub username

### Search

Results: Successful response.

SDK operations: `list`.

Key fields to recognise:

- `full_name`: The full name including owner
- `name`: The name of the repository
- `number`: The issue number
- `private`: Whether the repository is private
- `title`: The issue title

### User

Results: Successful response.

SDK operations: `load`.

Key fields to recognise:

- `avatar_url`: URL to the user&#39;s avatar image
- `id`: The user&#39;s unique identifier
- `login`: The user&#39;s GitHub username

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Branch | `list` | `GET /repos/{owner}/{repo}/branches` | Required |
| Commit | `list` | `GET /repos/{owner}/{repo}/commits` | Required |
| Gist | `create` | `POST /gists` | Required |
| Gist | `list` | `GET /gists` | Not required |
| Issue | `create` | `POST /repos/{owner}/{repo}/issues` | Required |
| Issue | `list` | `GET /repos/{owner}/{repo}/issues` | Required |
| Issue | `load` | `GET /repos/{owner}/{repo}/issues/{issue_number}` | Required |
| Issue | `update` | `PATCH /repos/{owner}/{repo}/issues/{issue_number}` | Required |
| Notification | `list` | `GET /notifications` | Required |
| Org | `load` | `GET /orgs/{org}` | Required |
| Pull | `create` | `POST /repos/{owner}/{repo}/pulls` | Required |
| Pull | `list` | `GET /repos/{owner}/{repo}/pulls` | Required |
| Pull | `load` | `GET /repos/{owner}/{repo}/pulls/{pull_number}` | Required |
| RateLimit | `load` | `GET /rate_limit` | Not required |
| Repo | `list` | `GET /users/{username}/repos` | Required |
| Repo | `list` | `GET /orgs/{org}/repos` | Required |
| Repo | `load` | `GET /repos/{owner}/{repo}` | Required |
| Search | `list` | `GET /search/issues` | Required |
| Search | `list` | `GET /search/repositories` | Required |
| User | `load` | `GET /users/{username}` | Required |
| User | `load` | `GET /user` | Required |

## Connect to the API

- GitHub REST API v3: `https://api.github.com`

The default credential is sent in the `Authorization` header with the `Bearer` prefix.

Username and password authentication

Personal access token or OAuth token

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

A read request without required parameters or authentication is `GET /gists`. For example:

```sh
curl --fail-with-body --silent --show-error 'https://api.github.com/gists'
```

Inspect the response using the Gist reference. This checks the public route; authenticated operations need their own credentials and request data.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `github-rest_list`: List records for an entity. Supported entities: `branch`, `commit`, `gist`, `issue`, `notification`, `pull`, `repo`, `search`.
- `github-rest_load`: Load one record for an entity. Supported entities: `issue`, `org`, `pull`, `rate_limit`, `repo`, `user`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

