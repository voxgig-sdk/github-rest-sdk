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
(0, node_test_1.describe)('PullEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when GITHUB_REST_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('GITHUB_REST_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.GithubRestSDK.test();
        const ent = testsdk.Pull();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.GITHUB_REST_TEST_LIVE;
        for (const op of ['create', 'list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'pull.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "base", "op": { "create": { "req": true, "type": "`$STRING`" } }, "req": false, "short": "The name of the branch you want the changes pulled into", "type": "`$OBJECT`", "index$": 0 }, { "active": true, "name": "body", "req": false, "short": "The contents of the pull request", "type": "`$STRING`", "index$": 1 }, { "active": true, "format": "date-time", "name": "closed_at", "req": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "format": "date-time", "name": "created_at", "req": false, "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "draft", "req": false, "short": "Indicates whether the pull request is a draft", "type": "`$BOOLEAN`", "index$": 4 }, { "active": true, "name": "head", "op": { "create": { "req": true, "type": "`$STRING`" } }, "req": false, "short": "The name of the branch where your changes are implemented", "type": "`$OBJECT`", "index$": 5 }, { "active": true, "format": "uri", "name": "html_url", "req": false, "type": "`$STRING`", "index$": 6 }, { "active": true, "name": "id", "req": false, "type": "`$INTEGER`", "index$": 7 }, { "active": true, "format": "date-time", "name": "merged_at", "req": false, "type": "`$STRING`", "index$": 8 }, { "active": true, "name": "node_id", "req": false, "type": "`$STRING`", "index$": 9 }, { "active": true, "name": "number", "req": false, "type": "`$INTEGER`", "index$": 10 }, { "active": true, "name": "state", "req": false, "type": "`$STRING`", "index$": 11 }, { "active": true, "name": "title", "op": { "create": { "req": true, "type": "`$STRING`" } }, "req": false, "short": "The title of the pull request", "type": "`$STRING`", "index$": 12 }, { "active": true, "format": "date-time", "name": "updated_at", "req": false, "type": "`$STRING`", "index$": 13 }, { "active": true, "format": "uri", "name": "url", "req": false, "type": "`$STRING`", "index$": 14 }, { "active": true, "name": "user", "req": false, "type": "`$OBJECT`", "index$": 15 }], "id": { "field": "id", "name": "id" }, "name": "pull", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "owner", "orig": "owner", "reqd": true, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "param", "name": "repo", "orig": "repo", "reqd": true, "type": "`$STRING`", "index$": 1 }] }, "contract": { "id": "POST /repos/{owner}/{repo}/pulls", "json": "{\"operationId\":\"createPullRequest\",\"parameters\":[{\"description\":\"The account owner of the repository. The name is not case sensitive.\",\"in\":\"path\",\"name\":\"owner\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"The name of the repository. The name is not case sensitive.\",\"in\":\"path\",\"name\":\"repo\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"base\":{\"description\":\"The name of the branch you want the changes pulled into\",\"type\":\"string\"},\"body\":{\"description\":\"The contents of the pull request\",\"type\":\"string\"},\"draft\":{\"description\":\"Indicates whether the pull request is a draft\",\"type\":\"boolean\"},\"head\":{\"description\":\"The name of the branch where your changes are implemented\",\"type\":\"string\"},\"title\":{\"description\":\"The title of the pull request\",\"type\":\"string\"}},\"required\":[\"title\",\"head\",\"base\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"base\":{\"properties\":{\"ref\":{\"type\":\"string\"},\"sha\":{\"type\":\"string\"}},\"type\":\"object\"},\"body\":{\"nullable\":true,\"type\":\"string\"},\"closed_at\":{\"format\":\"date-time\",\"nullable\":true,\"type\":\"string\"},\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"draft\":{\"type\":\"boolean\"},\"head\":{\"properties\":{\"ref\":{\"type\":\"string\"},\"sha\":{\"type\":\"string\"}},\"type\":\"object\"},\"html_url\":{\"format\":\"uri\",\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"merged_at\":{\"format\":\"date-time\",\"nullable\":true,\"type\":\"string\"},\"node_id\":{\"type\":\"string\"},\"number\":{\"type\":\"integer\"},\"state\":{\"enum\":[\"open\",\"closed\"],\"type\":\"string\"},\"title\":{\"type\":\"string\"},\"updated_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"url\":{\"format\":\"uri\",\"type\":\"string\"},\"user\":{\"properties\":{\"avatar_url\":{\"description\":\"URL to the user's avatar image\",\"format\":\"uri\",\"type\":\"string\"},\"bio\":{\"nullable\":true,\"type\":\"string\"},\"blog\":{\"nullable\":true,\"type\":\"string\"},\"company\":{\"nullable\":true,\"type\":\"string\"},\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"email\":{\"format\":\"email\",\"nullable\":true,\"type\":\"string\"},\"followers\":{\"type\":\"integer\"},\"following\":{\"type\":\"integer\"},\"html_url\":{\"format\":\"uri\",\"type\":\"string\"},\"id\":{\"description\":\"The user's unique identifier\",\"type\":\"integer\"},\"location\":{\"nullable\":true,\"type\":\"string\"},\"login\":{\"description\":\"The user's GitHub username\",\"type\":\"string\"},\"name\":{\"nullable\":true,\"type\":\"string\"},\"node_id\":{\"type\":\"string\"},\"public_gists\":{\"type\":\"integer\"},\"public_repos\":{\"type\":\"integer\"},\"type\":{\"enum\":[\"User\",\"Organization\"],\"type\":\"string\"},\"updated_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"url\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Pull request created\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"documentation_url\":{\"description\":\"URL to documentation about this error\",\"format\":\"uri\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Requires authentication\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"documentation_url\":{\"description\":\"URL to documentation about this error\",\"format\":\"uri\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Forbidden\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"documentation_url\":{\"description\":\"URL to documentation about this error\",\"format\":\"uri\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Resource not found\"}},\"security\":[{\"BearerAuth\":[]}],\"securitySchemes\":{\"BasicAuth\":{\"description\":\"Username and password authentication\",\"scheme\":\"basic\",\"type\":\"http\"},\"BearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"Personal access token or OAuth token\",\"scheme\":\"bearer\",\"type\":\"http\"},\"OAuth2\":{\"flows\":{\"authorizationCode\":{\"authorizationUrl\":\"https://github.com/login/oauth/authorize\",\"scopes\":{\"gist\":\"Create gists\",\"notifications\":\"Access notifications\",\"public_repo\":\"Access public repositories\",\"read:org\":\"Read org and team membership\",\"read:user\":\"Read all user profile data\",\"repo\":\"Full control of private repositories\",\"user\":\"Update all user data\",\"user:email\":\"Access user email addresses\",\"workflow\":\"Update GitHub Action workflows\"},\"tokenUrl\":\"https://github.com/login/oauth/access_token\"}},\"type\":\"oauth2\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/repos/{owner}/{repo}/pulls", "segments": [{ "lit": "repos" }, { "var": "owner" }, { "var": "repo" }, { "lit": "pulls" }], "select": { "exist": ["owner", "repo"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "owner", "orig": "owner", "reqd": true, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "param", "name": "repo", "orig": "repo", "reqd": true, "type": "`$STRING`", "index$": 1 }], "query": [{ "active": true, "example": "desc", "kind": "query", "name": "direction", "orig": "direction", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "example": 1, "kind": "query", "name": "page", "orig": "page", "reqd": false, "type": "`$INTEGER`", "index$": 1 }, { "active": true, "example": 30, "kind": "query", "name": "per_page", "orig": "per_page", "reqd": false, "type": "`$INTEGER`", "index$": 2 }, { "active": true, "example": "created", "kind": "query", "name": "sort", "orig": "sort", "reqd": false, "type": "`$STRING`", "index$": 3 }, { "active": true, "example": "open", "kind": "query", "name": "state", "orig": "state", "reqd": false, "type": "`$STRING`", "index$": 4 }] }, "contract": { "id": "GET /repos/{owner}/{repo}/pulls", "json": "{\"operationId\":\"listPullRequests\",\"parameters\":[{\"description\":\"The account owner of the repository. The name is not case sensitive.\",\"in\":\"path\",\"name\":\"owner\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"The name of the repository. The name is not case sensitive.\",\"in\":\"path\",\"name\":\"repo\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Either open, closed, or all to filter by state\",\"in\":\"query\",\"name\":\"state\",\"schema\":{\"default\":\"open\",\"enum\":[\"open\",\"closed\",\"all\"],\"type\":\"string\"}},{\"description\":\"What to sort results by\",\"in\":\"query\",\"name\":\"sort\",\"schema\":{\"default\":\"created\",\"enum\":[\"created\",\"updated\",\"popularity\",\"long-running\"],\"type\":\"string\"}},{\"description\":\"The direction of the sort\",\"in\":\"query\",\"name\":\"direction\",\"schema\":{\"default\":\"desc\",\"enum\":[\"asc\",\"desc\"],\"type\":\"string\"}},{\"description\":\"The number of results per page\",\"in\":\"query\",\"name\":\"per_page\",\"schema\":{\"default\":30,\"maximum\":100,\"type\":\"integer\"}},{\"description\":\"Page number of the results to fetch\",\"in\":\"query\",\"name\":\"page\",\"schema\":{\"default\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"base\":{\"properties\":{\"ref\":{\"type\":\"string\"},\"sha\":{\"type\":\"string\"}},\"type\":\"object\"},\"body\":{\"nullable\":true,\"type\":\"string\"},\"closed_at\":{\"format\":\"date-time\",\"nullable\":true,\"type\":\"string\"},\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"draft\":{\"type\":\"boolean\"},\"head\":{\"properties\":{\"ref\":{\"type\":\"string\"},\"sha\":{\"type\":\"string\"}},\"type\":\"object\"},\"html_url\":{\"format\":\"uri\",\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"merged_at\":{\"format\":\"date-time\",\"nullable\":true,\"type\":\"string\"},\"node_id\":{\"type\":\"string\"},\"number\":{\"type\":\"integer\"},\"state\":{\"enum\":[\"open\",\"closed\"],\"type\":\"string\"},\"title\":{\"type\":\"string\"},\"updated_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"url\":{\"format\":\"uri\",\"type\":\"string\"},\"user\":{\"properties\":{\"avatar_url\":{\"description\":\"URL to the user's avatar image\",\"format\":\"uri\",\"type\":\"string\"},\"bio\":{\"nullable\":true,\"type\":\"string\"},\"blog\":{\"nullable\":true,\"type\":\"string\"},\"company\":{\"nullable\":true,\"type\":\"string\"},\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"email\":{\"format\":\"email\",\"nullable\":true,\"type\":\"string\"},\"followers\":{\"type\":\"integer\"},\"following\":{\"type\":\"integer\"},\"html_url\":{\"format\":\"uri\",\"type\":\"string\"},\"id\":{\"description\":\"The user's unique identifier\",\"type\":\"integer\"},\"location\":{\"nullable\":true,\"type\":\"string\"},\"login\":{\"description\":\"The user's GitHub username\",\"type\":\"string\"},\"name\":{\"nullable\":true,\"type\":\"string\"},\"node_id\":{\"type\":\"string\"},\"public_gists\":{\"type\":\"integer\"},\"public_repos\":{\"type\":\"integer\"},\"type\":{\"enum\":[\"User\",\"Organization\"],\"type\":\"string\"},\"updated_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"url\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"documentation_url\":{\"description\":\"URL to documentation about this error\",\"format\":\"uri\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Resource not found\"}},\"security\":[{\"BearerAuth\":[]},{\"BasicAuth\":[]},{\"OAuth2\":[]}],\"securitySchemes\":{\"BasicAuth\":{\"description\":\"Username and password authentication\",\"scheme\":\"basic\",\"type\":\"http\"},\"BearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"Personal access token or OAuth token\",\"scheme\":\"bearer\",\"type\":\"http\"},\"OAuth2\":{\"flows\":{\"authorizationCode\":{\"authorizationUrl\":\"https://github.com/login/oauth/authorize\",\"scopes\":{\"gist\":\"Create gists\",\"notifications\":\"Access notifications\",\"public_repo\":\"Access public repositories\",\"read:org\":\"Read org and team membership\",\"read:user\":\"Read all user profile data\",\"repo\":\"Full control of private repositories\",\"user\":\"Update all user data\",\"user:email\":\"Access user email addresses\",\"workflow\":\"Update GitHub Action workflows\"},\"tokenUrl\":\"https://github.com/login/oauth/access_token\"}},\"type\":\"oauth2\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/repos/{owner}/{repo}/pulls", "segments": [{ "lit": "repos" }, { "var": "owner" }, { "var": "repo" }, { "lit": "pulls" }], "select": { "exist": ["direction", "owner", "page", "per_page", "repo", "sort", "state"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "pull_number", "reqd": true, "type": "`$INTEGER`", "index$": 0 }, { "active": true, "kind": "param", "name": "owner", "orig": "owner", "reqd": true, "type": "`$STRING`", "index$": 1 }, { "active": true, "kind": "param", "name": "repo", "orig": "repo", "reqd": true, "type": "`$STRING`", "index$": 2 }] }, "contract": { "id": "GET /repos/{owner}/{repo}/pulls/{pull_number}", "json": "{\"operationId\":\"getPullRequest\",\"parameters\":[{\"description\":\"The account owner of the repository. The name is not case sensitive.\",\"in\":\"path\",\"name\":\"owner\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"The name of the repository. The name is not case sensitive.\",\"in\":\"path\",\"name\":\"repo\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"The number that identifies the pull request\",\"in\":\"path\",\"name\":\"pull_number\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"base\":{\"properties\":{\"ref\":{\"type\":\"string\"},\"sha\":{\"type\":\"string\"}},\"type\":\"object\"},\"body\":{\"nullable\":true,\"type\":\"string\"},\"closed_at\":{\"format\":\"date-time\",\"nullable\":true,\"type\":\"string\"},\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"draft\":{\"type\":\"boolean\"},\"head\":{\"properties\":{\"ref\":{\"type\":\"string\"},\"sha\":{\"type\":\"string\"}},\"type\":\"object\"},\"html_url\":{\"format\":\"uri\",\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"merged_at\":{\"format\":\"date-time\",\"nullable\":true,\"type\":\"string\"},\"node_id\":{\"type\":\"string\"},\"number\":{\"type\":\"integer\"},\"state\":{\"enum\":[\"open\",\"closed\"],\"type\":\"string\"},\"title\":{\"type\":\"string\"},\"updated_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"url\":{\"format\":\"uri\",\"type\":\"string\"},\"user\":{\"properties\":{\"avatar_url\":{\"description\":\"URL to the user's avatar image\",\"format\":\"uri\",\"type\":\"string\"},\"bio\":{\"nullable\":true,\"type\":\"string\"},\"blog\":{\"nullable\":true,\"type\":\"string\"},\"company\":{\"nullable\":true,\"type\":\"string\"},\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"email\":{\"format\":\"email\",\"nullable\":true,\"type\":\"string\"},\"followers\":{\"type\":\"integer\"},\"following\":{\"type\":\"integer\"},\"html_url\":{\"format\":\"uri\",\"type\":\"string\"},\"id\":{\"description\":\"The user's unique identifier\",\"type\":\"integer\"},\"location\":{\"nullable\":true,\"type\":\"string\"},\"login\":{\"description\":\"The user's GitHub username\",\"type\":\"string\"},\"name\":{\"nullable\":true,\"type\":\"string\"},\"node_id\":{\"type\":\"string\"},\"public_gists\":{\"type\":\"integer\"},\"public_repos\":{\"type\":\"integer\"},\"type\":{\"enum\":[\"User\",\"Organization\"],\"type\":\"string\"},\"updated_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"url\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"documentation_url\":{\"description\":\"URL to documentation about this error\",\"format\":\"uri\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Resource not found\"}},\"security\":[{\"BearerAuth\":[]},{\"BasicAuth\":[]},{\"OAuth2\":[]}],\"securitySchemes\":{\"BasicAuth\":{\"description\":\"Username and password authentication\",\"scheme\":\"basic\",\"type\":\"http\"},\"BearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"Personal access token or OAuth token\",\"scheme\":\"bearer\",\"type\":\"http\"},\"OAuth2\":{\"flows\":{\"authorizationCode\":{\"authorizationUrl\":\"https://github.com/login/oauth/authorize\",\"scopes\":{\"gist\":\"Create gists\",\"notifications\":\"Access notifications\",\"public_repo\":\"Access public repositories\",\"read:org\":\"Read org and team membership\",\"read:user\":\"Read all user profile data\",\"repo\":\"Full control of private repositories\",\"user\":\"Update all user data\",\"user:email\":\"Access user email addresses\",\"workflow\":\"Update GitHub Action workflows\"},\"tokenUrl\":\"https://github.com/login/oauth/access_token\"}},\"type\":\"oauth2\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/repos/{owner}/{repo}/pulls/{pull_number}", "rename": { "param": { "pull_number": "id" } }, "segments": [{ "lit": "repos" }, { "var": "owner" }, { "var": "repo" }, { "lit": "pulls" }, { "var": "id" }], "select": { "exist": ["id", "owner", "repo"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [["repo"]] }, "key$": "pull", "name__orig": "pull", "Name": "Pull", "name_": "pull", "name-": "pull", "NAME": "PULL", "index$": 6 }, { "active": true, "entity": "pull", "key$": "BasicPullFlow", "kind": "basic", "name": "BasicPullFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "pull_ref01" }, "match": { "owner": "owner01", "repo": "repo01" }, "op": "create", "spec": [], "valid": [], "index$": 0 }, { "active": true, "data": {}, "input": {}, "match": { "owner": "owner01", "repo": "repo01" }, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "pull_ref01" } }], "index$": 1 }, { "active": true, "data": {}, "input": { "ref": "pull_ref01", "srcdatavar": "pull_ref01_data", "suffix": "_dt0" }, "match": { "id": "pull01", "owner": "owner01", "repo": "repo01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-pull_ref01" } }], "index$": 2 }] }, 'Pull');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const pull_ref01_ent = client.Pull();
        let pull_ref01_data = setup.data.new.pull['pull_ref01'];
        pull_ref01_data['owner'] = setup.idmap['owner01'];
        pull_ref01_data['repo'] = setup.idmap['repo01'];
        pull_ref01_data = (await pull_ref01_ent.create(pull_ref01_data)).data();
        (0, node_assert_1.default)(null != pull_ref01_data.id);
        // LIST
        const pull_ref01_match = {};
        pull_ref01_match['owner'] = setup.idmap['owner01'];
        pull_ref01_match['repo'] = setup.idmap['repo01'];
        const pull_ref01_list = (await pull_ref01_ent.list(pull_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(pull_ref01_list, { id: pull_ref01_data.id })));
        // LOAD
        const pull_ref01_match_dt0 = {};
        pull_ref01_match_dt0.id = pull_ref01_data.id;
        const pull_ref01_data_dt0 = (await pull_ref01_ent.load(pull_ref01_match_dt0)).data();
        (0, node_assert_1.default)(pull_ref01_data_dt0.id === pull_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/pull/PullTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.GithubRestSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['pull01', 'pull02', 'pull03', 'repo01', 'repo02', 'repo03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'GITHUB_REST_TEST_PULL_ENTID': idmap,
        'GITHUB_REST_TEST_LIVE': 'FALSE',
        'GITHUB_REST_TEST_EXPLAIN': 'FALSE',
        'GITHUB_REST_APIKEY': '',
    });
    idmap = env['GITHUB_REST_TEST_PULL_ENTID'];
    const live = 'TRUE' === env.GITHUB_REST_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['GITHUB_REST_TEST_PULL_ENTID'];
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
//# sourceMappingURL=PullEntity.test.js.map