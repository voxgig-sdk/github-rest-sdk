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
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('CommitEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when GITHUB_REST_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('GITHUB_REST_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.GithubRestSDK.test();
        const ent = testsdk.Commit();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.GITHUB_REST_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'commit.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "author": { "a": true, "h": "Author", "n": "author", "r": false, "t": "`$OBJECT`", "key$": "author", "index$": 0 }, "commit": { "a": true, "h": "Commit", "n": "commit", "r": false, "t": "`$OBJECT`", "key$": "commit", "index$": 1 }, "committer": { "a": true, "h": "Committer", "n": "committer", "r": false, "t": "`$OBJECT`", "key$": "committer", "index$": 2 }, "html_url": { "a": true, "fo": "uri", "h": "Html Url", "n": "html_url", "r": false, "t": "`$STRING`", "key$": "html_url", "index$": 3 }, "node_id": { "a": true, "h": "Node Id", "n": "node_id", "r": false, "t": "`$STRING`", "key$": "node_id", "index$": 4 }, "sha": { "a": true, "h": "Sha", "n": "sha", "r": false, "t": "`$STRING`", "key$": "sha", "index$": 5 }, "url": { "a": true, "fo": "uri", "h": "Url", "n": "url", "r": false, "t": "`$STRING`", "key$": "url", "index$": 6 } }, "name": "commit", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /repos/{owner}/{repo}/commits", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "owner", "or": "owner", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "repo", "or": "repo", "r": true, "t": "`$STRING`", "index$": 1 }], "query": [{ "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "k": "query", "n": "path", "or": "path", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": 30, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 2 }, { "a": true, "k": "query", "n": "sha", "or": "sha", "r": false, "t": "`$STRING`", "index$": 3 }] }, "k": "http", "m": "GET", "o": "/repos/{owner}/{repo}/commits", "q": { "exist": ["owner", "page", "path", "per_page", "repo", "sha"] }, "r": {}, "s": [{ "lit": "repos" }, { "var": "owner" }, { "var": "repo" }, { "lit": "commits" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [["$.main.kit.entity.repo"]] }, "key$": "commit", "name__orig": "commit", "Name": "Commit", "name_": "commit", "name-": "commit", "NAME": "COMMIT", "index$": 1 }, { "active": true, "entity": "commit", "key$": "BasicCommitFlow", "kind": "basic", "name": "BasicCommitFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "owner": "owner01", "repo": "repo01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "commit_ref01" } }], "index$": 0 }] }, 'Commit', { "GET /repos/{owner}/{repo}/commits": { "protocol": "http", "operationId": "listCommits", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "array", "items": { "type": "object", "properties": { "sha": { "type": "string", "key$": "sha" }, "node_id": { "type": "string", "key$": "node_id" }, "commit": { "type": "object", "properties": { "author": { "type": "object", "properties": { "name": { "type": "string" }, "email": { "type": "string", "format": "email" }, "date": { "type": "string", "format": "date-time" } } }, "message": { "type": "string" } }, "key$": "commit" }, "author": { "type": "object", "properties": { "login": { "description": "The user's GitHub username", "key$": "login", "type": "string" }, "id": { "description": "The user's unique identifier", "key$": "id", "type": "integer" }, "node_id": { "key$": "node_id", "type": "string" }, "avatar_url": { "description": "URL to the user's avatar image", "format": "uri", "key$": "avatar_url", "type": "string" }, "url": { "format": "uri", "key$": "url", "type": "string" }, "html_url": { "format": "uri", "key$": "html_url", "type": "string" }, "type": { "enum": ["User", "Organization"], "key$": "type", "type": "string" }, "name": { "key$": "name", "nullable": true, "type": "string" }, "company": { "key$": "company", "nullable": true, "type": "string" }, "blog": { "key$": "blog", "nullable": true, "type": "string" }, "location": { "key$": "location", "nullable": true, "type": "string" }, "email": { "format": "email", "key$": "email", "nullable": true, "type": "string" }, "bio": { "key$": "bio", "nullable": true, "type": "string" }, "public_repos": { "key$": "public_repos", "type": "integer" }, "public_gists": { "key$": "public_gists", "type": "integer" }, "followers": { "key$": "followers", "type": "integer" }, "following": { "key$": "following", "type": "integer" }, "created_at": { "format": "date-time", "key$": "created_at", "type": "string" }, "updated_at": { "format": "date-time", "key$": "updated_at", "type": "string" } }, "x-ref": "#/components/schemas/User", "key$": "author" }, "committer": { "type": "object", "properties": { "login": { "description": "The user's GitHub username", "key$": "login", "type": "string" }, "id": { "description": "The user's unique identifier", "key$": "id", "type": "integer" }, "node_id": { "key$": "node_id", "type": "string" }, "avatar_url": { "description": "URL to the user's avatar image", "format": "uri", "key$": "avatar_url", "type": "string" }, "url": { "format": "uri", "key$": "url", "type": "string" }, "html_url": { "format": "uri", "key$": "html_url", "type": "string" }, "type": { "enum": ["User", "Organization"], "key$": "type", "type": "string" }, "name": { "key$": "name", "nullable": true, "type": "string" }, "company": { "key$": "company", "nullable": true, "type": "string" }, "blog": { "key$": "blog", "nullable": true, "type": "string" }, "location": { "key$": "location", "nullable": true, "type": "string" }, "email": { "format": "email", "key$": "email", "nullable": true, "type": "string" }, "bio": { "key$": "bio", "nullable": true, "type": "string" }, "public_repos": { "key$": "public_repos", "type": "integer" }, "public_gists": { "key$": "public_gists", "type": "integer" }, "followers": { "key$": "followers", "type": "integer" }, "following": { "key$": "following", "type": "integer" }, "created_at": { "format": "date-time", "key$": "created_at", "type": "string" }, "updated_at": { "format": "date-time", "key$": "updated_at", "type": "string" } }, "x-ref": "#/components/schemas/User", "key$": "committer" }, "html_url": { "type": "string", "format": "uri", "key$": "html_url" }, "url": { "type": "string", "format": "uri", "key$": "url" } }, "x-ref": "#/components/schemas/Commit", "index$": 0 } } } } }, "404": { "description": "Resource not found", "content": { "application/json": { "schema": { "type": "object", "properties": { "message": { "type": "string", "description": "Error message" }, "documentation_url": { "type": "string", "format": "uri", "description": "URL to documentation about this error" } }, "x-ref": "#/components/schemas/Error" } } }, "x-ref": "#/components/responses/NotFound" } }, "parameters": [{ "name": "owner", "in": "path", "required": true, "description": "The account owner of the repository. The name is not case sensitive.", "schema": { "type": "string" }, "x-ref": "#/components/parameters/owner", "index$": 0 }, { "name": "repo", "in": "path", "required": true, "description": "The name of the repository. The name is not case sensitive.", "schema": { "type": "string" }, "x-ref": "#/components/parameters/repo", "index$": 1 }, { "name": "sha", "in": "query", "description": "SHA or branch to start listing commits from", "schema": { "type": "string" }, "index$": 2 }, { "name": "path", "in": "query", "description": "Only commits containing this file path will be returned", "schema": { "type": "string" }, "index$": 3 }, { "name": "per_page", "in": "query", "description": "The number of results per page", "schema": { "type": "integer", "default": 30, "maximum": 100 }, "index$": 4 }, { "name": "page", "in": "query", "description": "Page number of the results to fetch", "schema": { "type": "integer", "default": 1 }, "index$": 5 }], "security": [{ "BearerAuth": [] }, { "BasicAuth": [] }, { "OAuth2": [] }], "securitySource": "definition", "securitySchemes": { "BearerAuth": { "type": "http", "scheme": "bearer", "bearerFormat": "JWT", "description": "Personal access token or OAuth token" }, "BasicAuth": { "type": "http", "scheme": "basic", "description": "Username and password authentication" }, "OAuth2": { "type": "oauth2", "flows": { "authorizationCode": { "authorizationUrl": "https://github.com/login/oauth/authorize", "tokenUrl": "https://github.com/login/oauth/access_token", "scopes": { "repo": "Full control of private repositories", "public_repo": "Access public repositories", "user": "Update all user data", "read:user": "Read all user profile data", "user:email": "Access user email addresses", "gist": "Create gists", "notifications": "Access notifications", "read:org": "Read org and team membership", "workflow": "Update GitHub Action workflows" } } } } } } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let commit_ref01_data = Object.values(setup.data.existing.commit)[0];
        // LIST
        const commit_ref01_ent = client.Commit();
        const commit_ref01_match = {};
        commit_ref01_match['owner'] = setup.idmap['owner01'];
        commit_ref01_match['repo'] = setup.idmap['repo01'];
        const commit_ref01_list = (await commit_ref01_ent.list(commit_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/commit/CommitTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.GithubRestSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['commit01', 'commit02', 'commit03', 'repo01', 'repo02', 'repo03', 'owner01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'GITHUB_REST_TEST_COMMIT_ENTID': idmap,
        'GITHUB_REST_TEST_LIVE': 'FALSE',
        'GITHUB_REST_TEST_EXPLAIN': 'FALSE',
        'GITHUB_REST_APIKEY': '',
    });
    idmap = env['GITHUB_REST_TEST_COMMIT_ENTID'];
    const live = 'TRUE' === env.GITHUB_REST_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['GITHUB_REST_TEST_COMMIT_ENTID'];
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
//# sourceMappingURL=CommitEntity.test.js.map