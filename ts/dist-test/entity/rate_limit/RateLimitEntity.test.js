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
(0, node_test_1.describe)('RateLimitEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when GITHUB_REST_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('GITHUB_REST_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.GithubRestSDK.test();
        const ent = testsdk.RateLimit();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.GITHUB_REST_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'rate_limit.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "rate": { "a": true, "h": "Rate", "n": "rate", "r": false, "t": "`$OBJECT`", "key$": "rate", "index$": 0 }, "resources": { "a": true, "h": "Resources", "n": "resources", "r": false, "t": "`$OBJECT`", "key$": "resources", "index$": 1 } }, "name": "rate_limit", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /rate_limit", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/rate_limit", "q": {}, "r": {}, "s": [{ "lit": "rate_limit" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "rate_limit", "name__orig": "rate_limit", "Name": "RateLimit", "name_": "rate_limit", "name-": "rate-limit", "NAME": "RATE_LIMIT", "index$": 7 }, { "active": true, "entity": "rate_limit", "key$": "BasicRateLimitFlow", "kind": "basic", "name": "BasicRateLimitFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "rate_limit_ref01", "srcdatavar": "rate_limit_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-rate_limit_ref01" } }], "index$": 0 }] }, 'RateLimit', { "GET /rate_limit": { "protocol": "http", "operationId": "getRateLimit", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "properties": { "resources": { "key$": "resources", "properties": { "core": { "properties": { "limit": { "description": "The maximum number of requests you're permitted to make per hour", "type": "integer" }, "remaining": { "description": "The number of requests remaining in the current rate limit window", "type": "integer" }, "reset": { "description": "The time at which the current rate limit window resets in UTC epoch seconds", "type": "integer" }, "used": { "description": "The number of requests you've made in the current rate limit window", "type": "integer" } }, "type": "object", "x-ref": "#/components/schemas/RateLimitResource" }, "graphql": { "properties": { "limit": { "description": "The maximum number of requests you're permitted to make per hour", "type": "integer" }, "remaining": { "description": "The number of requests remaining in the current rate limit window", "type": "integer" }, "reset": { "description": "The time at which the current rate limit window resets in UTC epoch seconds", "type": "integer" }, "used": { "description": "The number of requests you've made in the current rate limit window", "type": "integer" } }, "type": "object", "x-ref": "#/components/schemas/RateLimitResource" }, "search": { "properties": { "limit": { "description": "The maximum number of requests you're permitted to make per hour", "type": "integer" }, "remaining": { "description": "The number of requests remaining in the current rate limit window", "type": "integer" }, "reset": { "description": "The time at which the current rate limit window resets in UTC epoch seconds", "type": "integer" }, "used": { "description": "The number of requests you've made in the current rate limit window", "type": "integer" } }, "type": "object", "x-ref": "#/components/schemas/RateLimitResource" } }, "type": "object" }, "rate": { "key$": "rate", "properties": { "limit": { "description": "The maximum number of requests you're permitted to make per hour", "type": "integer" }, "remaining": { "description": "The number of requests remaining in the current rate limit window", "type": "integer" }, "reset": { "description": "The time at which the current rate limit window resets in UTC epoch seconds", "type": "integer" }, "used": { "description": "The number of requests you've made in the current rate limit window", "type": "integer" } }, "type": "object", "x-ref": "#/components/schemas/RateLimitResource" } }, "x-ref": "#/components/schemas/RateLimit", "index$": 0 } } } } }, "parameters": [], "security": [{ "BearerAuth": [] }, {}], "securitySource": "operation", "securitySchemes": { "BearerAuth": { "type": "http", "scheme": "bearer", "bearerFormat": "JWT", "description": "Personal access token or OAuth token" }, "BasicAuth": { "type": "http", "scheme": "basic", "description": "Username and password authentication" }, "OAuth2": { "type": "oauth2", "flows": { "authorizationCode": { "authorizationUrl": "https://github.com/login/oauth/authorize", "tokenUrl": "https://github.com/login/oauth/access_token", "scopes": { "repo": "Full control of private repositories", "public_repo": "Access public repositories", "user": "Update all user data", "read:user": "Read all user profile data", "user:email": "Access user email addresses", "gist": "Create gists", "notifications": "Access notifications", "read:org": "Read org and team membership", "workflow": "Update GitHub Action workflows" } } } } } } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let rate_limit_ref01_data = Object.values(setup.data.existing.rate_limit)[0];
        // LOAD
        const rate_limit_ref01_ent = client.RateLimit();
        const rate_limit_ref01_match_dt0 = {};
        const rate_limit_ref01_data_dt0 = (await rate_limit_ref01_ent.load(rate_limit_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != rate_limit_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/rate_limit/RateLimitTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.GithubRestSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['rate_limit01', 'rate_limit02', 'rate_limit03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'GITHUB_REST_TEST_RATE_LIMIT_ENTID': idmap,
        'GITHUB_REST_TEST_LIVE': 'FALSE',
        'GITHUB_REST_TEST_EXPLAIN': 'FALSE',
        'GITHUB_REST_APIKEY': '',
    });
    idmap = env['GITHUB_REST_TEST_RATE_LIMIT_ENTID'];
    const live = 'TRUE' === env.GITHUB_REST_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['GITHUB_REST_TEST_RATE_LIMIT_ENTID'];
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
//# sourceMappingURL=RateLimitEntity.test.js.map