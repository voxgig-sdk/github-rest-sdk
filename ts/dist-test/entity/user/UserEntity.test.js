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
(0, node_test_1.describe)('UserEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when GITHUB_REST_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('GITHUB_REST_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.GithubRestSDK.test();
        const ent = testsdk.User();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.GITHUB_REST_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'user.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "avatar_url": { "a": true, "fo": "uri", "h": "Avatar Url", "n": "avatar_url", "r": false, "sh": "URL to the user's avatar image", "t": "`$STRING`", "key$": "avatar_url", "index$": 0 }, "bio": { "a": true, "h": "Bio", "n": "bio", "r": false, "t": "`$STRING`", "key$": "bio", "index$": 1 }, "blog": { "a": true, "h": "Blog", "n": "blog", "r": false, "t": "`$STRING`", "key$": "blog", "index$": 2 }, "company": { "a": true, "h": "Company", "n": "company", "r": false, "t": "`$STRING`", "key$": "company", "index$": 3 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": false, "t": "`$STRING`", "key$": "created_at", "index$": 4 }, "email": { "a": true, "fo": "email", "h": "Email", "n": "email", "r": false, "t": "`$STRING`", "key$": "email", "index$": 5 }, "followers": { "a": true, "h": "Followers", "n": "followers", "r": false, "t": "`$INTEGER`", "key$": "followers", "index$": 6 }, "following": { "a": true, "h": "Following", "n": "following", "r": false, "t": "`$INTEGER`", "key$": "following", "index$": 7 }, "html_url": { "a": true, "fo": "uri", "h": "Html Url", "n": "html_url", "r": false, "t": "`$STRING`", "key$": "html_url", "index$": 8 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "The user's unique identifier", "t": "`$INTEGER`", "key$": "id", "index$": 9 }, "location": { "a": true, "h": "Location", "n": "location", "r": false, "t": "`$STRING`", "key$": "location", "index$": 10 }, "login": { "a": true, "h": "Login", "n": "login", "r": false, "sh": "The user's GitHub username", "t": "`$STRING`", "key$": "login", "index$": 11 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "t": "`$STRING`", "key$": "name", "index$": 12 }, "node_id": { "a": true, "h": "Node Id", "n": "node_id", "r": false, "t": "`$STRING`", "key$": "node_id", "index$": 13 }, "public_gists": { "a": true, "h": "Public Gists", "n": "public_gists", "r": false, "t": "`$INTEGER`", "key$": "public_gists", "index$": 14 }, "public_repos": { "a": true, "h": "Public Repos", "n": "public_repos", "r": false, "t": "`$INTEGER`", "key$": "public_repos", "index$": 15 }, "type": { "a": true, "h": "Type", "n": "type", "r": false, "t": "`$STRING`", "key$": "type", "index$": 16 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": false, "t": "`$STRING`", "key$": "updated_at", "index$": 17 }, "url": { "a": true, "fo": "uri", "h": "Url", "n": "url", "r": false, "t": "`$STRING`", "key$": "url", "index$": 18 } }, "id": { "field": "id", "name": "id" }, "name": "user", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /users/{username}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "username", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/users/{username}", "q": { "exist": ["id"] }, "r": { "param": { "username": "id" } }, "s": [{ "lit": "users" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /user", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/user", "q": {}, "r": {}, "s": [{ "lit": "user" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "user", "name__orig": "user", "Name": "User", "name_": "user", "name-": "user", "NAME": "USER", "index$": 10 }, { "active": true, "entity": "user", "key$": "BasicUserFlow", "kind": "basic", "name": "BasicUserFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "user_ref01", "srcdatavar": "user_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-user_ref01" } }], "index$": 0 }] }, 'User', { "GET /users/{username}": { "protocol": "http", "parameters": [{ "name": "username", "in": "path", "required": true, "description": "The handle for the GitHub user account", "schema": { "type": "string" }, "index$": 0 }] }, "GET /user": { "protocol": "http", "parameters": [] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let user_ref01_data = Object.values(setup.data.existing.user)[0];
        // LOAD
        const user_ref01_ent = client.User();
        const user_ref01_match_dt0 = {};
        user_ref01_match_dt0.id = user_ref01_data.id;
        const user_ref01_data_dt0 = (await user_ref01_ent.load(user_ref01_match_dt0)).data();
        (0, node_assert_1.default)(user_ref01_data_dt0.id === user_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/user/UserTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.GithubRestSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['user01', 'user02', 'user03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'GITHUB_REST_TEST_USER_ENTID': idmap,
        'GITHUB_REST_TEST_LIVE': 'FALSE',
        'GITHUB_REST_TEST_EXPLAIN': 'FALSE',
        'GITHUB_REST_APIKEY': '',
    });
    idmap = env['GITHUB_REST_TEST_USER_ENTID'];
    const live = 'TRUE' === env.GITHUB_REST_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['GITHUB_REST_TEST_USER_ENTID'];
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
//# sourceMappingURL=UserEntity.test.js.map