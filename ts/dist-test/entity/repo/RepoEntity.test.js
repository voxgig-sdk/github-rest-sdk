"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('RepoEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when GITHUB_REST_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('GITHUB_REST_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.GithubRestSDK.test();
        const ent = testsdk.Repo();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.GITHUB_REST_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'repo.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": { "github-rest_id": "id" } }, "fields": [{ "active": true, "format": "uri", "name": "avatar_url", "req": false, "short": "URL to the user's avatar image", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "bio", "req": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "blog", "req": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "company", "req": false, "type": "`$STRING`", "index$": 3 }, { "active": true, "format": "date-time", "name": "created_at", "req": false, "type": "`$STRING`", "index$": 4 }, { "active": true, "name": "default_branch", "req": false, "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "description", "req": false, "type": "`$STRING`", "index$": 6 }, { "active": true, "format": "email", "name": "email", "req": false, "type": "`$STRING`", "index$": 7 }, { "active": true, "name": "followers", "req": false, "type": "`$INTEGER`", "index$": 8 }, { "active": true, "name": "following", "req": false, "type": "`$INTEGER`", "index$": 9 }, { "active": true, "name": "fork", "req": false, "type": "`$BOOLEAN`", "index$": 10 }, { "active": true, "name": "forks_count", "req": false, "type": "`$INTEGER`", "index$": 11 }, { "active": true, "name": "full_name", "req": false, "short": "The full name including owner", "type": "`$STRING`", "index$": 12 }, { "active": true, "name": "github-rest_id", "req": false, "short": "The user's unique identifier", "type": "`$INTEGER`", "index$": 13 }, { "active": true, "format": "uri", "name": "html_url", "req": false, "type": "`$STRING`", "index$": 14 }, { "active": true, "name": "id", "req": false, "short": "The user's unique identifier", "type": "`$STRING`", "index$": 15 }, { "active": true, "name": "language", "req": false, "type": "`$STRING`", "index$": 16 }, { "active": true, "name": "location", "req": false, "type": "`$STRING`", "index$": 17 }, { "active": true, "name": "login", "req": false, "short": "The user's GitHub username", "type": "`$STRING`", "index$": 18 }, { "active": true, "name": "name", "req": false, "short": "The name of the repository", "type": "`$STRING`", "index$": 19 }, { "active": true, "name": "node_id", "req": false, "type": "`$STRING`", "index$": 20 }, { "active": true, "name": "open_issues_count", "req": false, "type": "`$INTEGER`", "index$": 21 }, { "active": true, "name": "owner", "req": false, "type": "`$OBJECT`", "index$": 22 }, { "active": true, "name": "private", "req": false, "short": "Whether the repository is private", "type": "`$BOOLEAN`", "index$": 23 }, { "active": true, "name": "public_gists", "req": false, "type": "`$INTEGER`", "index$": 24 }, { "active": true, "name": "public_repos", "req": false, "type": "`$INTEGER`", "index$": 25 }, { "active": true, "format": "date-time", "name": "pushed_at", "req": false, "type": "`$STRING`", "index$": 26 }, { "active": true, "name": "size", "req": false, "type": "`$INTEGER`", "index$": 27 }, { "active": true, "name": "stargazers_count", "req": false, "type": "`$INTEGER`", "index$": 28 }, { "active": true, "name": "type", "req": false, "type": "`$STRING`", "index$": 29 }, { "active": true, "format": "date-time", "name": "updated_at", "req": false, "type": "`$STRING`", "index$": 30 }, { "active": true, "format": "uri", "name": "url", "req": false, "type": "`$STRING`", "index$": 31 }, { "active": true, "name": "visibility", "req": false, "type": "`$STRING`", "index$": 32 }, { "active": true, "name": "watchers_count", "req": false, "type": "`$INTEGER`", "index$": 33 }], "id": { "field": "id", "from": { "owner": "owner.login", "repo": "name" }, "name": "id", "parts": ["owner", "repo"], "sep": "/" }, "name": "repo", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "username", "orig": "username", "reqd": true, "type": "`$STRING`", "index$": 0 }], "query": [{ "active": true, "example": "asc", "kind": "query", "name": "direction", "orig": "direction", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "example": 1, "kind": "query", "name": "page", "orig": "page", "reqd": false, "type": "`$INTEGER`", "index$": 1 }, { "active": true, "example": 30, "kind": "query", "name": "per_page", "orig": "per_page", "reqd": false, "type": "`$INTEGER`", "index$": 2 }, { "active": true, "example": "full_name", "kind": "query", "name": "sort", "orig": "sort", "reqd": false, "type": "`$STRING`", "index$": 3 }, { "active": true, "example": "owner", "kind": "query", "name": "type", "orig": "type", "reqd": false, "type": "`$STRING`", "index$": 4 }] }, "contract": { "id": "GET /users/{username}/repos", "json": "{\"operationId\":\"listUserRepos\",\"parameters\":[{\"description\":\"The handle for the GitHub user account\",\"in\":\"path\",\"name\":\"username\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Limit results to repositories of the specified type\",\"in\":\"query\",\"name\":\"type\",\"schema\":{\"default\":\"owner\",\"enum\":[\"all\",\"owner\",\"member\"],\"type\":\"string\"}},{\"description\":\"The property to sort the results by\",\"in\":\"query\",\"name\":\"sort\",\"schema\":{\"default\":\"full_name\",\"enum\":[\"created\",\"updated\",\"pushed\",\"full_name\"],\"type\":\"string\"}},{\"description\":\"The order to sort by\",\"in\":\"query\",\"name\":\"direction\",\"schema\":{\"default\":\"asc\",\"enum\":[\"asc\",\"desc\"],\"type\":\"string\"}},{\"description\":\"The number of results per page\",\"in\":\"query\",\"name\":\"per_page\",\"schema\":{\"default\":30,\"maximum\":100,\"type\":\"integer\"}},{\"description\":\"Page number of the results to fetch\",\"in\":\"query\",\"name\":\"page\",\"schema\":{\"default\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"default_branch\":{\"type\":\"string\"},\"description\":{\"nullable\":true,\"type\":\"string\"},\"fork\":{\"type\":\"boolean\"},\"forks_count\":{\"type\":\"integer\"},\"full_name\":{\"description\":\"The full name including owner\",\"type\":\"string\"},\"html_url\":{\"format\":\"uri\",\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"language\":{\"nullable\":true,\"type\":\"string\"},\"name\":{\"description\":\"The name of the repository\",\"type\":\"string\"},\"node_id\":{\"type\":\"string\"},\"open_issues_count\":{\"type\":\"integer\"},\"owner\":{\"properties\":{\"avatar_url\":{\"description\":\"URL to the user's avatar image\",\"format\":\"uri\",\"type\":\"string\"},\"bio\":{\"nullable\":true,\"type\":\"string\"},\"blog\":{\"nullable\":true,\"type\":\"string\"},\"company\":{\"nullable\":true,\"type\":\"string\"},\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"email\":{\"format\":\"email\",\"nullable\":true,\"type\":\"string\"},\"followers\":{\"type\":\"integer\"},\"following\":{\"type\":\"integer\"},\"html_url\":{\"format\":\"uri\",\"type\":\"string\"},\"id\":{\"description\":\"The user's unique identifier\",\"type\":\"integer\"},\"location\":{\"nullable\":true,\"type\":\"string\"},\"login\":{\"description\":\"The user's GitHub username\",\"type\":\"string\"},\"name\":{\"nullable\":true,\"type\":\"string\"},\"node_id\":{\"type\":\"string\"},\"public_gists\":{\"type\":\"integer\"},\"public_repos\":{\"type\":\"integer\"},\"type\":{\"enum\":[\"User\",\"Organization\"],\"type\":\"string\"},\"updated_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"url\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"private\":{\"description\":\"Whether the repository is private\",\"type\":\"boolean\"},\"pushed_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"size\":{\"type\":\"integer\"},\"stargazers_count\":{\"type\":\"integer\"},\"updated_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"url\":{\"format\":\"uri\",\"type\":\"string\"},\"visibility\":{\"enum\":[\"public\",\"private\",\"internal\"],\"type\":\"string\"},\"watchers_count\":{\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"documentation_url\":{\"description\":\"URL to documentation about this error\",\"format\":\"uri\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Resource not found\"}},\"security\":[{\"BearerAuth\":[]},{\"BasicAuth\":[]},{\"OAuth2\":[]}],\"securitySchemes\":{\"BasicAuth\":{\"description\":\"Username and password authentication\",\"scheme\":\"basic\",\"type\":\"http\"},\"BearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"Personal access token or OAuth token\",\"scheme\":\"bearer\",\"type\":\"http\"},\"OAuth2\":{\"flows\":{\"authorizationCode\":{\"authorizationUrl\":\"https://github.com/login/oauth/authorize\",\"scopes\":{\"gist\":\"Create gists\",\"notifications\":\"Access notifications\",\"public_repo\":\"Access public repositories\",\"read:org\":\"Read org and team membership\",\"read:user\":\"Read all user profile data\",\"repo\":\"Full control of private repositories\",\"user\":\"Update all user data\",\"user:email\":\"Access user email addresses\",\"workflow\":\"Update GitHub Action workflows\"},\"tokenUrl\":\"https://github.com/login/oauth/access_token\"}},\"type\":\"oauth2\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/users/{username}/repos", "segments": [{ "lit": "users" }, { "var": "username" }, { "lit": "repos" }], "select": { "exist": ["direction", "page", "per_page", "sort", "type", "username"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "org_id", "orig": "org", "reqd": true, "type": "`$STRING`", "index$": 0 }], "query": [{ "active": true, "example": 1, "kind": "query", "name": "page", "orig": "page", "reqd": false, "type": "`$INTEGER`", "index$": 0 }, { "active": true, "example": 30, "kind": "query", "name": "per_page", "orig": "per_page", "reqd": false, "type": "`$INTEGER`", "index$": 1 }, { "active": true, "example": "all", "kind": "query", "name": "type", "orig": "type", "reqd": false, "type": "`$STRING`", "index$": 2 }] }, "contract": { "id": "GET /orgs/{org}/repos", "json": "{\"operationId\":\"listOrgRepos\",\"parameters\":[{\"description\":\"The organization name\",\"in\":\"path\",\"name\":\"org\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Specifies the types of repositories you want returned\",\"in\":\"query\",\"name\":\"type\",\"schema\":{\"default\":\"all\",\"enum\":[\"all\",\"public\",\"private\",\"forks\",\"sources\",\"member\"],\"type\":\"string\"}},{\"description\":\"The number of results per page\",\"in\":\"query\",\"name\":\"per_page\",\"schema\":{\"default\":30,\"maximum\":100,\"type\":\"integer\"}},{\"description\":\"Page number of the results to fetch\",\"in\":\"query\",\"name\":\"page\",\"schema\":{\"default\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"default_branch\":{\"type\":\"string\"},\"description\":{\"nullable\":true,\"type\":\"string\"},\"fork\":{\"type\":\"boolean\"},\"forks_count\":{\"type\":\"integer\"},\"full_name\":{\"description\":\"The full name including owner\",\"type\":\"string\"},\"html_url\":{\"format\":\"uri\",\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"language\":{\"nullable\":true,\"type\":\"string\"},\"name\":{\"description\":\"The name of the repository\",\"type\":\"string\"},\"node_id\":{\"type\":\"string\"},\"open_issues_count\":{\"type\":\"integer\"},\"owner\":{\"properties\":{\"avatar_url\":{\"description\":\"URL to the user's avatar image\",\"format\":\"uri\",\"type\":\"string\"},\"bio\":{\"nullable\":true,\"type\":\"string\"},\"blog\":{\"nullable\":true,\"type\":\"string\"},\"company\":{\"nullable\":true,\"type\":\"string\"},\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"email\":{\"format\":\"email\",\"nullable\":true,\"type\":\"string\"},\"followers\":{\"type\":\"integer\"},\"following\":{\"type\":\"integer\"},\"html_url\":{\"format\":\"uri\",\"type\":\"string\"},\"id\":{\"description\":\"The user's unique identifier\",\"type\":\"integer\"},\"location\":{\"nullable\":true,\"type\":\"string\"},\"login\":{\"description\":\"The user's GitHub username\",\"type\":\"string\"},\"name\":{\"nullable\":true,\"type\":\"string\"},\"node_id\":{\"type\":\"string\"},\"public_gists\":{\"type\":\"integer\"},\"public_repos\":{\"type\":\"integer\"},\"type\":{\"enum\":[\"User\",\"Organization\"],\"type\":\"string\"},\"updated_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"url\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"private\":{\"description\":\"Whether the repository is private\",\"type\":\"boolean\"},\"pushed_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"size\":{\"type\":\"integer\"},\"stargazers_count\":{\"type\":\"integer\"},\"updated_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"url\":{\"format\":\"uri\",\"type\":\"string\"},\"visibility\":{\"enum\":[\"public\",\"private\",\"internal\"],\"type\":\"string\"},\"watchers_count\":{\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"documentation_url\":{\"description\":\"URL to documentation about this error\",\"format\":\"uri\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Resource not found\"}},\"security\":[{\"BearerAuth\":[]},{\"BasicAuth\":[]},{\"OAuth2\":[]}],\"securitySchemes\":{\"BasicAuth\":{\"description\":\"Username and password authentication\",\"scheme\":\"basic\",\"type\":\"http\"},\"BearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"Personal access token or OAuth token\",\"scheme\":\"bearer\",\"type\":\"http\"},\"OAuth2\":{\"flows\":{\"authorizationCode\":{\"authorizationUrl\":\"https://github.com/login/oauth/authorize\",\"scopes\":{\"gist\":\"Create gists\",\"notifications\":\"Access notifications\",\"public_repo\":\"Access public repositories\",\"read:org\":\"Read org and team membership\",\"read:user\":\"Read all user profile data\",\"repo\":\"Full control of private repositories\",\"user\":\"Update all user data\",\"user:email\":\"Access user email addresses\",\"workflow\":\"Update GitHub Action workflows\"},\"tokenUrl\":\"https://github.com/login/oauth/access_token\"}},\"type\":\"oauth2\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/orgs/{org}/repos", "rename": { "param": { "org": "org_id" } }, "segments": [{ "lit": "orgs" }, { "var": "org_id" }, { "lit": "repos" }], "select": { "exist": ["org_id", "page", "per_page", "type"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "owner", "orig": "owner", "reqd": true, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "param", "name": "repo", "orig": "repo", "reqd": true, "type": "`$STRING`", "index$": 1 }] }, "contract": { "id": "GET /repos/{owner}/{repo}", "json": "{\"operationId\":\"getRepository\",\"parameters\":[{\"description\":\"The account owner of the repository. The name is not case sensitive.\",\"in\":\"path\",\"name\":\"owner\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"The name of the repository. The name is not case sensitive.\",\"in\":\"path\",\"name\":\"repo\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"default_branch\":{\"type\":\"string\"},\"description\":{\"nullable\":true,\"type\":\"string\"},\"fork\":{\"type\":\"boolean\"},\"forks_count\":{\"type\":\"integer\"},\"full_name\":{\"description\":\"The full name including owner\",\"type\":\"string\"},\"html_url\":{\"format\":\"uri\",\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"language\":{\"nullable\":true,\"type\":\"string\"},\"name\":{\"description\":\"The name of the repository\",\"type\":\"string\"},\"node_id\":{\"type\":\"string\"},\"open_issues_count\":{\"type\":\"integer\"},\"owner\":{\"properties\":{\"avatar_url\":{\"description\":\"URL to the user's avatar image\",\"format\":\"uri\",\"type\":\"string\"},\"bio\":{\"nullable\":true,\"type\":\"string\"},\"blog\":{\"nullable\":true,\"type\":\"string\"},\"company\":{\"nullable\":true,\"type\":\"string\"},\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"email\":{\"format\":\"email\",\"nullable\":true,\"type\":\"string\"},\"followers\":{\"type\":\"integer\"},\"following\":{\"type\":\"integer\"},\"html_url\":{\"format\":\"uri\",\"type\":\"string\"},\"id\":{\"description\":\"The user's unique identifier\",\"type\":\"integer\"},\"location\":{\"nullable\":true,\"type\":\"string\"},\"login\":{\"description\":\"The user's GitHub username\",\"type\":\"string\"},\"name\":{\"nullable\":true,\"type\":\"string\"},\"node_id\":{\"type\":\"string\"},\"public_gists\":{\"type\":\"integer\"},\"public_repos\":{\"type\":\"integer\"},\"type\":{\"enum\":[\"User\",\"Organization\"],\"type\":\"string\"},\"updated_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"url\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"private\":{\"description\":\"Whether the repository is private\",\"type\":\"boolean\"},\"pushed_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"size\":{\"type\":\"integer\"},\"stargazers_count\":{\"type\":\"integer\"},\"updated_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"url\":{\"format\":\"uri\",\"type\":\"string\"},\"visibility\":{\"enum\":[\"public\",\"private\",\"internal\"],\"type\":\"string\"},\"watchers_count\":{\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"documentation_url\":{\"description\":\"URL to documentation about this error\",\"format\":\"uri\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Resource not found\"}},\"security\":[{\"BearerAuth\":[]},{\"BasicAuth\":[]},{\"OAuth2\":[]}],\"securitySchemes\":{\"BasicAuth\":{\"description\":\"Username and password authentication\",\"scheme\":\"basic\",\"type\":\"http\"},\"BearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"Personal access token or OAuth token\",\"scheme\":\"bearer\",\"type\":\"http\"},\"OAuth2\":{\"flows\":{\"authorizationCode\":{\"authorizationUrl\":\"https://github.com/login/oauth/authorize\",\"scopes\":{\"gist\":\"Create gists\",\"notifications\":\"Access notifications\",\"public_repo\":\"Access public repositories\",\"read:org\":\"Read org and team membership\",\"read:user\":\"Read all user profile data\",\"repo\":\"Full control of private repositories\",\"user\":\"Update all user data\",\"user:email\":\"Access user email addresses\",\"workflow\":\"Update GitHub Action workflows\"},\"tokenUrl\":\"https://github.com/login/oauth/access_token\"}},\"type\":\"oauth2\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/repos/{owner}/{repo}", "segments": [{ "lit": "repos" }, { "var": "owner" }, { "var": "repo" }], "select": { "exist": ["owner", "repo"] }, "transform": { "req": "`reqdata`", "res": "`body.owner`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [["org"], ["repo"], ["user"]] }, "key$": "repo", "name__orig": "repo", "Name": "Repo", "name_": "repo", "name-": "repo", "NAME": "REPO", "index$": 8 }, { "active": true, "entity": "repo", "key$": "BasicRepoFlow", "kind": "basic", "name": "BasicRepoFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": { "org_id": "org01" }, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "repo_ref01" } }], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "repo_ref01", "srcdatavar": "repo_ref01_data", "suffix": "_dt0" }, "match": { "id": "repo01", "owner": "owner01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-repo_ref01" } }], "index$": 1 }] }, 'Repo');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let repo_ref01_data = Object.values(setup.data.existing.repo)[0];
        // LIST
        const repo_ref01_ent = client.Repo();
        const repo_ref01_match = {};
        repo_ref01_match['org_id'] = setup.idmap['org01'];
        const repo_ref01_list = (await repo_ref01_ent.list(repo_ref01_match)).map((e) => e.data());
        // LOAD
        const repo_ref01_match_dt0 = {};
        repo_ref01_match_dt0.id = repo_ref01_data.id;
        const repo_ref01_data_dt0 = (await repo_ref01_ent.load(repo_ref01_match_dt0)).data();
        (0, node_assert_1.default)(repo_ref01_data_dt0.id === repo_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/repo/RepoTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.GithubRestSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['repo01', 'repo02', 'repo03', 'org01', 'org02', 'org03', 'repo01', 'repo02', 'repo03', 'user01', 'user02', 'user03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'GITHUB_REST_TEST_REPO_ENTID': idmap,
        'GITHUB_REST_TEST_LIVE': 'FALSE',
        'GITHUB_REST_TEST_EXPLAIN': 'FALSE',
        'GITHUB_REST_APIKEY': '',
    });
    idmap = env['GITHUB_REST_TEST_REPO_ENTID'];
    const live = 'TRUE' === env.GITHUB_REST_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['GITHUB_REST_TEST_REPO_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.GithubRestSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.GITHUB_REST_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.GITHUB_REST_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=RepoEntity.test.js.map