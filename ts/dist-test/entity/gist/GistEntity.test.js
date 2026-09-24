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
(0, node_test_1.describe)('GistEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when GITHUB_REST_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('GITHUB_REST_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.GithubRestSDK.test();
        const ent = testsdk.Gist();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.GITHUB_REST_TEST_LIVE;
        for (const op of ['create', 'list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'gist.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": false, "t": "`$STRING`", "key$": "created_at", "index$": 0 }, "description": { "a": true, "h": "Description", "n": "description", "r": false, "sh": "Description of the gist", "t": "`$STRING`", "key$": "description", "index$": 1 }, "files": { "a": true, "h": "Files", "n": "files", "op": { "list": { "req": false, "type": "`$OBJECT`" } }, "r": true, "sh": "Names and content for the files that make up the gist", "t": "`$OBJECT`", "key$": "files", "index$": 2 }, "html_url": { "a": true, "fo": "uri", "h": "Html Url", "n": "html_url", "r": false, "t": "`$STRING`", "key$": "html_url", "index$": 3 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 4 }, "node_id": { "a": true, "h": "Node Id", "n": "node_id", "r": false, "t": "`$STRING`", "key$": "node_id", "index$": 5 }, "owner": { "a": true, "h": "Owner", "n": "owner", "r": false, "t": "`$OBJECT`", "key$": "owner", "index$": 6 }, "public": { "a": true, "h": "Public", "n": "public", "r": false, "sh": "Whether the gist is public", "t": "`$BOOLEAN`", "key$": "public", "index$": 7 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": false, "t": "`$STRING`", "key$": "updated_at", "index$": 8 }, "url": { "a": true, "fo": "uri", "h": "Url", "n": "url", "r": false, "t": "`$STRING`", "key$": "url", "index$": 9 } }, "id": { "field": "id", "name": "id" }, "name": "gist", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /gists", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/gists", "q": {}, "r": {}, "s": [{ "lit": "gists" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /gists", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 30, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/gists", "q": { "exist": ["page", "per_page"] }, "r": {}, "s": [{ "lit": "gists" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "gist", "name__orig": "gist", "Name": "Gist", "name_": "gist", "name-": "gist", "NAME": "GIST", "index$": 2 }, { "active": true, "entity": "gist", "key$": "BasicGistFlow", "kind": "basic", "name": "BasicGistFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "gist_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "gist_ref01" } }], "index$": 1 }] }, 'Gist', { "POST /gists": { "protocol": "http", "operationId": "createGist", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["files"], "properties": { "description": { "type": "string", "description": "Description of the gist", "key$": "description" }, "files": { "type": "object", "description": "Names and content for the files that make up the gist", "additionalProperties": { "type": "object", "properties": { "content": { "type": "string" } } }, "key$": "files" }, "public": { "type": "boolean", "description": "Whether the gist is public", "key$": "public" } }, "index$": 1 } } } }, "responses": { "201": { "description": "Gist created", "content": { "application/json": { "schema": { "type": "object", "properties": { "id": { "type": "string", "key$": "id" }, "node_id": { "type": "string", "key$": "node_id" }, "url": { "type": "string", "format": "uri", "key$": "url" }, "html_url": { "type": "string", "format": "uri", "key$": "html_url" }, "description": { "type": "string", "nullable": true, "key$": "description" }, "public": { "type": "boolean", "key$": "public" }, "owner": { "type": "object", "properties": { "login": { "description": "The user's GitHub username", "key$": "login", "type": "string" }, "id": { "description": "The user's unique identifier", "key$": "id", "type": "integer" }, "node_id": { "key$": "node_id", "type": "string" }, "avatar_url": { "description": "URL to the user's avatar image", "format": "uri", "key$": "avatar_url", "type": "string" }, "url": { "format": "uri", "key$": "url", "type": "string" }, "html_url": { "format": "uri", "key$": "html_url", "type": "string" }, "type": { "enum": ["User", "Organization"], "key$": "type", "type": "string" }, "name": { "key$": "name", "nullable": true, "type": "string" }, "company": { "key$": "company", "nullable": true, "type": "string" }, "blog": { "key$": "blog", "nullable": true, "type": "string" }, "location": { "key$": "location", "nullable": true, "type": "string" }, "email": { "format": "email", "key$": "email", "nullable": true, "type": "string" }, "bio": { "key$": "bio", "nullable": true, "type": "string" }, "public_repos": { "key$": "public_repos", "type": "integer" }, "public_gists": { "key$": "public_gists", "type": "integer" }, "followers": { "key$": "followers", "type": "integer" }, "following": { "key$": "following", "type": "integer" }, "created_at": { "format": "date-time", "key$": "created_at", "type": "string" }, "updated_at": { "format": "date-time", "key$": "updated_at", "type": "string" } }, "x-ref": "#/components/schemas/User", "key$": "owner" }, "files": { "type": "object", "additionalProperties": { "type": "object", "properties": { "filename": { "type": "string" }, "type": { "type": "string" }, "language": { "type": "string", "nullable": true }, "raw_url": { "type": "string", "format": "uri" }, "size": { "type": "integer" } } }, "key$": "files" }, "created_at": { "type": "string", "format": "date-time", "key$": "created_at" }, "updated_at": { "type": "string", "format": "date-time", "key$": "updated_at" } }, "x-ref": "#/components/schemas/Gist" } } } }, "401": { "description": "Requires authentication", "content": { "application/json": { "schema": { "type": "object", "properties": { "message": { "type": "string", "description": "Error message" }, "documentation_url": { "type": "string", "format": "uri", "description": "URL to documentation about this error" } }, "x-ref": "#/components/schemas/Error" } } }, "x-ref": "#/components/responses/Unauthorized" } }, "parameters": [], "security": [{ "BearerAuth": [] }], "securitySource": "operation", "securitySchemes": { "BearerAuth": { "type": "http", "scheme": "bearer", "bearerFormat": "JWT", "description": "Personal access token or OAuth token" }, "BasicAuth": { "type": "http", "scheme": "basic", "description": "Username and password authentication" }, "OAuth2": { "type": "oauth2", "flows": { "authorizationCode": { "authorizationUrl": "https://github.com/login/oauth/authorize", "tokenUrl": "https://github.com/login/oauth/access_token", "scopes": { "repo": "Full control of private repositories", "public_repo": "Access public repositories", "user": "Update all user data", "read:user": "Read all user profile data", "user:email": "Access user email addresses", "gist": "Create gists", "notifications": "Access notifications", "read:org": "Read org and team membership", "workflow": "Update GitHub Action workflows" } } } } } }, "GET /gists": { "protocol": "http", "operationId": "listGists", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "array", "items": { "type": "object", "properties": { "id": { "type": "string", "key$": "id" }, "node_id": { "type": "string", "key$": "node_id" }, "url": { "type": "string", "format": "uri", "key$": "url" }, "html_url": { "type": "string", "format": "uri", "key$": "html_url" }, "description": { "type": "string", "nullable": true, "key$": "description" }, "public": { "type": "boolean", "key$": "public" }, "owner": { "type": "object", "properties": { "login": { "description": "The user's GitHub username", "key$": "login", "type": "string" }, "id": { "description": "The user's unique identifier", "key$": "id", "type": "integer" }, "node_id": { "key$": "node_id", "type": "string" }, "avatar_url": { "description": "URL to the user's avatar image", "format": "uri", "key$": "avatar_url", "type": "string" }, "url": { "format": "uri", "key$": "url", "type": "string" }, "html_url": { "format": "uri", "key$": "html_url", "type": "string" }, "type": { "enum": ["User", "Organization"], "key$": "type", "type": "string" }, "name": { "key$": "name", "nullable": true, "type": "string" }, "company": { "key$": "company", "nullable": true, "type": "string" }, "blog": { "key$": "blog", "nullable": true, "type": "string" }, "location": { "key$": "location", "nullable": true, "type": "string" }, "email": { "format": "email", "key$": "email", "nullable": true, "type": "string" }, "bio": { "key$": "bio", "nullable": true, "type": "string" }, "public_repos": { "key$": "public_repos", "type": "integer" }, "public_gists": { "key$": "public_gists", "type": "integer" }, "followers": { "key$": "followers", "type": "integer" }, "following": { "key$": "following", "type": "integer" }, "created_at": { "format": "date-time", "key$": "created_at", "type": "string" }, "updated_at": { "format": "date-time", "key$": "updated_at", "type": "string" } }, "x-ref": "#/components/schemas/User", "key$": "owner" }, "files": { "type": "object", "additionalProperties": { "type": "object", "properties": { "filename": { "type": "string" }, "type": { "type": "string" }, "language": { "type": "string", "nullable": true }, "raw_url": { "type": "string", "format": "uri" }, "size": { "type": "integer" } } }, "key$": "files" }, "created_at": { "type": "string", "format": "date-time", "key$": "created_at" }, "updated_at": { "type": "string", "format": "date-time", "key$": "updated_at" } }, "x-ref": "#/components/schemas/Gist", "index$": 0 } } } } } }, "parameters": [{ "name": "per_page", "in": "query", "description": "The number of results per page", "schema": { "type": "integer", "default": 30, "maximum": 100 }, "index$": 0 }, { "name": "page", "in": "query", "description": "Page number of the results to fetch", "schema": { "type": "integer", "default": 1 }, "index$": 1 }], "security": [{ "BearerAuth": [] }, {}], "securitySource": "operation", "securitySchemes": { "BearerAuth": { "type": "http", "scheme": "bearer", "bearerFormat": "JWT", "description": "Personal access token or OAuth token" }, "BasicAuth": { "type": "http", "scheme": "basic", "description": "Username and password authentication" }, "OAuth2": { "type": "oauth2", "flows": { "authorizationCode": { "authorizationUrl": "https://github.com/login/oauth/authorize", "tokenUrl": "https://github.com/login/oauth/access_token", "scopes": { "repo": "Full control of private repositories", "public_repo": "Access public repositories", "user": "Update all user data", "read:user": "Read all user profile data", "user:email": "Access user email addresses", "gist": "Create gists", "notifications": "Access notifications", "read:org": "Read org and team membership", "workflow": "Update GitHub Action workflows" } } } } } } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const gist_ref01_ent = client.Gist();
        let gist_ref01_data = setup.data.new.gist['gist_ref01'];
        gist_ref01_data = (await gist_ref01_ent.create(gist_ref01_data)).data();
        (0, node_assert_1.default)(null != gist_ref01_data.id);
        // LIST
        const gist_ref01_match = {};
        const gist_ref01_list = (await gist_ref01_ent.list(gist_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(gist_ref01_list, { id: gist_ref01_data.id })));
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/gist/GistTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.GithubRestSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['gist01', 'gist02', 'gist03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'GITHUB_REST_TEST_GIST_ENTID': idmap,
        'GITHUB_REST_TEST_LIVE': 'FALSE',
        'GITHUB_REST_TEST_EXPLAIN': 'FALSE',
        'GITHUB_REST_APIKEY': '',
    });
    idmap = env['GITHUB_REST_TEST_GIST_ENTID'];
    const live = 'TRUE' === env.GITHUB_REST_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['GITHUB_REST_TEST_GIST_ENTID'];
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
//# sourceMappingURL=GistEntity.test.js.map