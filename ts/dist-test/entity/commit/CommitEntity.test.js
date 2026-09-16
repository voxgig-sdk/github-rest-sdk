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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "author", "req": false, "type": "`$OBJECT`", "index$": 0 }, { "active": true, "name": "commit", "req": false, "type": "`$OBJECT`", "index$": 1 }, { "active": true, "name": "committer", "req": false, "type": "`$OBJECT`", "index$": 2 }, { "active": true, "format": "uri", "name": "html_url", "req": false, "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "node_id", "req": false, "type": "`$STRING`", "index$": 4 }, { "active": true, "name": "sha", "req": false, "type": "`$STRING`", "index$": 5 }, { "active": true, "format": "uri", "name": "url", "req": false, "type": "`$STRING`", "index$": 6 }], "name": "commit", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "owner", "orig": "owner", "reqd": true, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "param", "name": "repo", "orig": "repo", "reqd": true, "type": "`$STRING`", "index$": 1 }], "query": [{ "active": true, "example": 1, "kind": "query", "name": "page", "orig": "page", "reqd": false, "type": "`$INTEGER`", "index$": 0 }, { "active": true, "kind": "query", "name": "path", "orig": "path", "reqd": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "example": 30, "kind": "query", "name": "per_page", "orig": "per_page", "reqd": false, "type": "`$INTEGER`", "index$": 2 }, { "active": true, "kind": "query", "name": "sha", "orig": "sha", "reqd": false, "type": "`$STRING`", "index$": 3 }] }, "contract": { "id": "GET /repos/{owner}/{repo}/commits", "json": "{\"operationId\":\"listCommits\",\"parameters\":[{\"description\":\"The account owner of the repository. The name is not case sensitive.\",\"in\":\"path\",\"name\":\"owner\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"The name of the repository. The name is not case sensitive.\",\"in\":\"path\",\"name\":\"repo\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"SHA or branch to start listing commits from\",\"in\":\"query\",\"name\":\"sha\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Only commits containing this file path will be returned\",\"in\":\"query\",\"name\":\"path\",\"schema\":{\"type\":\"string\"}},{\"description\":\"The number of results per page\",\"in\":\"query\",\"name\":\"per_page\",\"schema\":{\"default\":30,\"maximum\":100,\"type\":\"integer\"}},{\"description\":\"Page number of the results to fetch\",\"in\":\"query\",\"name\":\"page\",\"schema\":{\"default\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"author\":{\"properties\":{\"avatar_url\":{\"description\":\"URL to the user's avatar image\",\"format\":\"uri\",\"type\":\"string\"},\"bio\":{\"nullable\":true,\"type\":\"string\"},\"blog\":{\"nullable\":true,\"type\":\"string\"},\"company\":{\"nullable\":true,\"type\":\"string\"},\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"email\":{\"format\":\"email\",\"nullable\":true,\"type\":\"string\"},\"followers\":{\"type\":\"integer\"},\"following\":{\"type\":\"integer\"},\"html_url\":{\"format\":\"uri\",\"type\":\"string\"},\"id\":{\"description\":\"The user's unique identifier\",\"type\":\"integer\"},\"location\":{\"nullable\":true,\"type\":\"string\"},\"login\":{\"description\":\"The user's GitHub username\",\"type\":\"string\"},\"name\":{\"nullable\":true,\"type\":\"string\"},\"node_id\":{\"type\":\"string\"},\"public_gists\":{\"type\":\"integer\"},\"public_repos\":{\"type\":\"integer\"},\"type\":{\"enum\":[\"User\",\"Organization\"],\"type\":\"string\"},\"updated_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"url\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"commit\":{\"properties\":{\"author\":{\"properties\":{\"date\":{\"format\":\"date-time\",\"type\":\"string\"},\"email\":{\"format\":\"email\",\"type\":\"string\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"},\"committer\":{\"properties\":{\"avatar_url\":{\"description\":\"URL to the user's avatar image\",\"format\":\"uri\",\"type\":\"string\"},\"bio\":{\"nullable\":true,\"type\":\"string\"},\"blog\":{\"nullable\":true,\"type\":\"string\"},\"company\":{\"nullable\":true,\"type\":\"string\"},\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"email\":{\"format\":\"email\",\"nullable\":true,\"type\":\"string\"},\"followers\":{\"type\":\"integer\"},\"following\":{\"type\":\"integer\"},\"html_url\":{\"format\":\"uri\",\"type\":\"string\"},\"id\":{\"description\":\"The user's unique identifier\",\"type\":\"integer\"},\"location\":{\"nullable\":true,\"type\":\"string\"},\"login\":{\"description\":\"The user's GitHub username\",\"type\":\"string\"},\"name\":{\"nullable\":true,\"type\":\"string\"},\"node_id\":{\"type\":\"string\"},\"public_gists\":{\"type\":\"integer\"},\"public_repos\":{\"type\":\"integer\"},\"type\":{\"enum\":[\"User\",\"Organization\"],\"type\":\"string\"},\"updated_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"url\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"html_url\":{\"format\":\"uri\",\"type\":\"string\"},\"node_id\":{\"type\":\"string\"},\"sha\":{\"type\":\"string\"},\"url\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"documentation_url\":{\"description\":\"URL to documentation about this error\",\"format\":\"uri\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Resource not found\"}},\"security\":[{\"BearerAuth\":[]},{\"BasicAuth\":[]},{\"OAuth2\":[]}],\"securitySchemes\":{\"BasicAuth\":{\"description\":\"Username and password authentication\",\"scheme\":\"basic\",\"type\":\"http\"},\"BearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"Personal access token or OAuth token\",\"scheme\":\"bearer\",\"type\":\"http\"},\"OAuth2\":{\"flows\":{\"authorizationCode\":{\"authorizationUrl\":\"https://github.com/login/oauth/authorize\",\"scopes\":{\"gist\":\"Create gists\",\"notifications\":\"Access notifications\",\"public_repo\":\"Access public repositories\",\"read:org\":\"Read org and team membership\",\"read:user\":\"Read all user profile data\",\"repo\":\"Full control of private repositories\",\"user\":\"Update all user data\",\"user:email\":\"Access user email addresses\",\"workflow\":\"Update GitHub Action workflows\"},\"tokenUrl\":\"https://github.com/login/oauth/access_token\"}},\"type\":\"oauth2\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/repos/{owner}/{repo}/commits", "segments": [{ "lit": "repos" }, { "var": "owner" }, { "var": "repo" }, { "lit": "commits" }], "select": { "exist": ["owner", "page", "path", "per_page", "repo", "sha"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [["repo"]] }, "key$": "commit", "name__orig": "commit", "Name": "Commit", "name_": "commit", "name-": "commit", "NAME": "COMMIT", "index$": 1 }, { "active": true, "entity": "commit", "key$": "BasicCommitFlow", "kind": "basic", "name": "BasicCommitFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": { "owner": "owner01", "repo": "repo01" }, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "commit_ref01" } }], "index$": 0 }] }, 'Commit');
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
    let idmap = transform(['commit01', 'commit02', 'commit03', 'repo01', 'repo02', 'repo03'], {
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