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
(0, node_test_1.describe)('SearchEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when GITHUB_REST_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('GITHUB_REST_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.GithubRestSDK.test();
        const ent = testsdk.Search();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.GITHUB_REST_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'search.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": {}, "name": "search", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /search/issues", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "desc", "k": "query", "n": "order", "or": "order", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "ex": 30, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 2 }, { "a": true, "k": "query", "n": "q", "or": "q", "r": true, "t": "`$STRING`", "index$": 3 }, { "a": true, "k": "query", "n": "sort", "or": "sort", "r": false, "t": "`$STRING`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/search/issues", "q": { "$action": "issue", "exist": ["order", "page", "per_page", "q", "sort"] }, "r": {}, "s": [{ "lit": "search" }, { "lit": "issues" }], "t": { "req": "`reqdata`", "res": "`body.items`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /search/repositories", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "desc", "k": "query", "n": "order", "or": "order", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "ex": 30, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 2 }, { "a": true, "k": "query", "n": "q", "or": "q", "r": true, "t": "`$STRING`", "index$": 3 }, { "a": true, "k": "query", "n": "sort", "or": "sort", "r": false, "t": "`$STRING`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/search/repositories", "q": { "$action": "repository", "exist": ["order", "page", "per_page", "q", "sort"] }, "r": {}, "s": [{ "lit": "search" }, { "lit": "repositories" }], "t": { "req": "`reqdata`", "res": "`body.items`" }, "index$": 1 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "search", "name__orig": "search", "Name": "Search", "name_": "search", "name-": "search", "NAME": "SEARCH", "index$": 9 }, { "active": true, "entity": "search", "key$": "BasicSearchFlow", "kind": "basic", "name": "BasicSearchFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "search_ref01" } }], "index$": 0 }] }, 'Search', { "GET /search/issues": { "protocol": "http", "operationId": "searchIssues", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "properties": { "total_count": { "key$": "total_count", "type": "integer" }, "incomplete_results": { "key$": "incomplete_results", "type": "boolean" }, "items": { "items": { "properties": { "assignee": { "allOf": [{ "properties": { "avatar_url": { "description": "URL to the user's avatar image", "format": "uri", "type": "string" }, "bio": { "nullable": true, "type": "string" }, "blog": { "nullable": true, "type": "string" }, "company": { "nullable": true, "type": "string" }, "created_at": { "format": "date-time", "type": "string" }, "email": { "format": "email", "nullable": true, "type": "string" }, "followers": { "type": "integer" }, "following": { "type": "integer" }, "html_url": { "format": "uri", "type": "string" }, "id": { "description": "The user's unique identifier", "type": "integer" }, "location": { "nullable": true, "type": "string" }, "login": { "description": "The user's GitHub username", "type": "string" }, "name": { "nullable": true, "type": "string" }, "node_id": { "type": "string" }, "public_gists": { "type": "integer" }, "public_repos": { "type": "integer" }, "type": { "enum": ["User", "Organization"], "type": "string" }, "updated_at": { "format": "date-time", "type": "string" }, "url": { "format": "uri", "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/User" }], "nullable": true }, "assignees": { "items": { "properties": { "avatar_url": { "description": "URL to the user's avatar image", "format": "uri", "type": "string" }, "bio": { "nullable": true, "type": "string" }, "blog": { "nullable": true, "type": "string" }, "company": { "nullable": true, "type": "string" }, "created_at": { "format": "date-time", "type": "string" }, "email": { "format": "email", "nullable": true, "type": "string" }, "followers": { "type": "integer" }, "following": { "type": "integer" }, "html_url": { "format": "uri", "type": "string" }, "id": { "description": "The user's unique identifier", "type": "integer" }, "location": { "nullable": true, "type": "string" }, "login": { "description": "The user's GitHub username", "type": "string" }, "name": { "nullable": true, "type": "string" }, "node_id": { "type": "string" }, "public_gists": { "type": "integer" }, "public_repos": { "type": "integer" }, "type": { "enum": ["User", "Organization"], "type": "string" }, "updated_at": { "format": "date-time", "type": "string" }, "url": { "format": "uri", "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/User" }, "type": "array" }, "body": { "nullable": true, "type": "string" }, "closed_at": { "format": "date-time", "nullable": true, "type": "string" }, "comments": { "type": "integer" }, "created_at": { "format": "date-time", "type": "string" }, "html_url": { "format": "uri", "type": "string" }, "id": { "type": "integer" }, "labels": { "items": { "properties": { "color": { "type": "string" }, "default": { "type": "boolean" }, "description": { "nullable": true, "type": "string" }, "id": { "type": "integer" }, "name": { "type": "string" }, "node_id": { "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/Label" }, "type": "array" }, "milestone": { "nullable": true, "type": "object" }, "node_id": { "type": "string" }, "number": { "description": "The issue number", "type": "integer" }, "state": { "enum": ["open", "closed"], "type": "string" }, "title": { "description": "The issue title", "type": "string" }, "updated_at": { "format": "date-time", "type": "string" }, "url": { "format": "uri", "type": "string" }, "user": { "properties": { "avatar_url": { "description": "URL to the user's avatar image", "format": "uri", "type": "string" }, "bio": { "nullable": true, "type": "string" }, "blog": { "nullable": true, "type": "string" }, "company": { "nullable": true, "type": "string" }, "created_at": { "format": "date-time", "type": "string" }, "email": { "format": "email", "nullable": true, "type": "string" }, "followers": { "type": "integer" }, "following": { "type": "integer" }, "html_url": { "format": "uri", "type": "string" }, "id": { "description": "The user's unique identifier", "type": "integer" }, "location": { "nullable": true, "type": "string" }, "login": { "description": "The user's GitHub username", "type": "string" }, "name": { "nullable": true, "type": "string" }, "node_id": { "type": "string" }, "public_gists": { "type": "integer" }, "public_repos": { "type": "integer" }, "type": { "enum": ["User", "Organization"], "type": "string" }, "updated_at": { "format": "date-time", "type": "string" }, "url": { "format": "uri", "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/User" } }, "type": "object", "x-ref": "#/components/schemas/Issue" }, "key$": "items", "type": "array" } } } } } } }, "parameters": [{ "name": "q", "in": "query", "required": true, "description": "The query contains one or more search keywords and qualifiers", "schema": { "type": "string" }, "index$": 0 }, { "name": "sort", "in": "query", "description": "Sorts the results of your query", "schema": { "type": "string", "enum": ["comments", "reactions", "interactions", "created", "updated"] }, "index$": 1 }, { "name": "order", "in": "query", "description": "Determines whether the first search result returned is the highest or lowest number of matches", "schema": { "type": "string", "enum": ["desc", "asc"], "default": "desc" }, "index$": 2 }, { "name": "per_page", "in": "query", "description": "The number of results per page", "schema": { "type": "integer", "default": 30, "maximum": 100 }, "index$": 3 }, { "name": "page", "in": "query", "description": "Page number of the results to fetch", "schema": { "type": "integer", "default": 1 }, "index$": 4 }], "security": [{ "BearerAuth": [] }, { "BasicAuth": [] }, { "OAuth2": [] }], "securitySource": "definition", "securitySchemes": { "BearerAuth": { "type": "http", "scheme": "bearer", "bearerFormat": "JWT", "description": "Personal access token or OAuth token" }, "BasicAuth": { "type": "http", "scheme": "basic", "description": "Username and password authentication" }, "OAuth2": { "type": "oauth2", "flows": { "authorizationCode": { "authorizationUrl": "https://github.com/login/oauth/authorize", "tokenUrl": "https://github.com/login/oauth/access_token", "scopes": { "repo": "Full control of private repositories", "public_repo": "Access public repositories", "user": "Update all user data", "read:user": "Read all user profile data", "user:email": "Access user email addresses", "gist": "Create gists", "notifications": "Access notifications", "read:org": "Read org and team membership", "workflow": "Update GitHub Action workflows" } } } } } }, "GET /search/repositories": { "protocol": "http", "operationId": "searchRepositories", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "properties": { "total_count": { "key$": "total_count", "type": "integer" }, "incomplete_results": { "key$": "incomplete_results", "type": "boolean" }, "items": { "items": { "properties": { "created_at": { "format": "date-time", "type": "string" }, "default_branch": { "type": "string" }, "description": { "nullable": true, "type": "string" }, "fork": { "type": "boolean" }, "forks_count": { "type": "integer" }, "full_name": { "description": "The full name including owner", "type": "string" }, "html_url": { "format": "uri", "type": "string" }, "id": { "type": "integer" }, "language": { "nullable": true, "type": "string" }, "name": { "description": "The name of the repository", "type": "string" }, "node_id": { "type": "string" }, "open_issues_count": { "type": "integer" }, "owner": { "properties": { "avatar_url": { "description": "URL to the user's avatar image", "format": "uri", "type": "string", "key$": "avatar_url" }, "bio": { "nullable": true, "type": "string", "key$": "bio" }, "blog": { "nullable": true, "type": "string", "key$": "blog" }, "company": { "nullable": true, "type": "string", "key$": "company" }, "created_at": { "format": "date-time", "type": "string", "key$": "created_at" }, "email": { "format": "email", "nullable": true, "type": "string", "key$": "email" }, "followers": { "type": "integer", "key$": "followers" }, "following": { "type": "integer", "key$": "following" }, "html_url": { "format": "uri", "type": "string", "key$": "html_url" }, "id": { "description": "The user's unique identifier", "type": "integer", "key$": "id" }, "location": { "nullable": true, "type": "string", "key$": "location" }, "login": { "description": "The user's GitHub username", "type": "string", "key$": "login" }, "name": { "nullable": true, "type": "string", "key$": "name" }, "node_id": { "type": "string", "key$": "node_id" }, "public_gists": { "type": "integer", "key$": "public_gists" }, "public_repos": { "type": "integer", "key$": "public_repos" }, "type": { "enum": ["User", "Organization"], "type": "string", "key$": "type" }, "updated_at": { "format": "date-time", "type": "string", "key$": "updated_at" }, "url": { "format": "uri", "type": "string", "key$": "url" } }, "type": "object", "x-ref": "#/components/schemas/User" }, "private": { "description": "Whether the repository is private", "type": "boolean" }, "pushed_at": { "format": "date-time", "type": "string" }, "size": { "type": "integer" }, "stargazers_count": { "type": "integer" }, "updated_at": { "format": "date-time", "type": "string" }, "url": { "format": "uri", "type": "string" }, "visibility": { "enum": ["public", "private", "internal"], "type": "string" }, "watchers_count": { "type": "integer" } }, "type": "object", "x-ref": "#/components/schemas/Repository" }, "key$": "items", "type": "array" } } } } } } }, "parameters": [{ "name": "q", "in": "query", "required": true, "description": "The query contains one or more search keywords and qualifiers", "schema": { "type": "string" }, "index$": 0 }, { "name": "sort", "in": "query", "description": "Sorts the results of your query", "schema": { "type": "string", "enum": ["stars", "forks", "help-wanted-issues", "updated"] }, "index$": 1 }, { "name": "order", "in": "query", "description": "Determines whether the first search result returned is the highest or lowest number of matches", "schema": { "type": "string", "enum": ["desc", "asc"], "default": "desc" }, "index$": 2 }, { "name": "per_page", "in": "query", "description": "The number of results per page", "schema": { "type": "integer", "default": 30, "maximum": 100 }, "index$": 3 }, { "name": "page", "in": "query", "description": "Page number of the results to fetch", "schema": { "type": "integer", "default": 1 }, "index$": 4 }], "security": [{ "BearerAuth": [] }, { "BasicAuth": [] }, { "OAuth2": [] }], "securitySource": "definition", "securitySchemes": { "BearerAuth": { "type": "http", "scheme": "bearer", "bearerFormat": "JWT", "description": "Personal access token or OAuth token" }, "BasicAuth": { "type": "http", "scheme": "basic", "description": "Username and password authentication" }, "OAuth2": { "type": "oauth2", "flows": { "authorizationCode": { "authorizationUrl": "https://github.com/login/oauth/authorize", "tokenUrl": "https://github.com/login/oauth/access_token", "scopes": { "repo": "Full control of private repositories", "public_repo": "Access public repositories", "user": "Update all user data", "read:user": "Read all user profile data", "user:email": "Access user email addresses", "gist": "Create gists", "notifications": "Access notifications", "read:org": "Read org and team membership", "workflow": "Update GitHub Action workflows" } } } } } } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let search_ref01_data = Object.values(setup.data.existing.search)[0];
        // LIST
        const search_ref01_ent = client.Search();
        const search_ref01_match = {};
        const search_ref01_list = (await search_ref01_ent.list(search_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/search/SearchTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.GithubRestSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['search01', 'search02', 'search03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'GITHUB_REST_TEST_SEARCH_ENTID': idmap,
        'GITHUB_REST_TEST_LIVE': 'FALSE',
        'GITHUB_REST_TEST_EXPLAIN': 'FALSE',
        'GITHUB_REST_APIKEY': '',
    });
    idmap = env['GITHUB_REST_TEST_SEARCH_ENTID'];
    const live = 'TRUE' === env.GITHUB_REST_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['GITHUB_REST_TEST_SEARCH_ENTID'];
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
//# sourceMappingURL=SearchEntity.test.js.map