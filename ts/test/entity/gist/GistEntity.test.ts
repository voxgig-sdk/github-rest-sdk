

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { GithubRestSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('GistEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GITHUB_REST_TEST_LIVE=TRUE.
  afterEach(liveDelay('GITHUB_REST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GithubRestSDK.test()
    const ent = testsdk.Gist()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GITHUB_REST_TEST_LIVE
    for (const op of ['create', 'list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'gist.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"date-time","name":"created_at","req":false,"type":"`$STRING`","index$":0},{"active":true,"name":"description","req":false,"short":"Description of the gist","type":"`$STRING`","index$":1},{"active":true,"name":"files","op":{"list":{"req":false,"type":"`$OBJECT`"}},"req":true,"short":"Names and content for the files that make up the gist","type":"`$OBJECT`","index$":2},{"active":true,"format":"uri","name":"html_url","req":false,"type":"`$STRING`","index$":3},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":4},{"active":true,"name":"node_id","req":false,"type":"`$STRING`","index$":5},{"active":true,"name":"owner","req":false,"type":"`$OBJECT`","index$":6},{"active":true,"name":"public","req":false,"short":"Whether the gist is public","type":"`$BOOLEAN`","index$":7},{"active":true,"format":"date-time","name":"updated_at","req":false,"type":"`$STRING`","index$":8},{"active":true,"format":"uri","name":"url","req":false,"type":"`$STRING`","index$":9}],"id":{"field":"id","name":"id"},"name":"gist","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /gists","json":"{\"operationId\":\"createGist\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"description\":{\"description\":\"Description of the gist\",\"type\":\"string\"},\"files\":{\"additionalProperties\":{\"properties\":{\"content\":{\"type\":\"string\"}},\"type\":\"object\"},\"description\":\"Names and content for the files that make up the gist\",\"type\":\"object\"},\"public\":{\"description\":\"Whether the gist is public\",\"type\":\"boolean\"}},\"required\":[\"files\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"description\":{\"nullable\":true,\"type\":\"string\"},\"files\":{\"additionalProperties\":{\"properties\":{\"filename\":{\"type\":\"string\"},\"language\":{\"nullable\":true,\"type\":\"string\"},\"raw_url\":{\"format\":\"uri\",\"type\":\"string\"},\"size\":{\"type\":\"integer\"},\"type\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"object\"},\"html_url\":{\"format\":\"uri\",\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"node_id\":{\"type\":\"string\"},\"owner\":{\"properties\":{\"avatar_url\":{\"description\":\"URL to the user's avatar image\",\"format\":\"uri\",\"type\":\"string\"},\"bio\":{\"nullable\":true,\"type\":\"string\"},\"blog\":{\"nullable\":true,\"type\":\"string\"},\"company\":{\"nullable\":true,\"type\":\"string\"},\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"email\":{\"format\":\"email\",\"nullable\":true,\"type\":\"string\"},\"followers\":{\"type\":\"integer\"},\"following\":{\"type\":\"integer\"},\"html_url\":{\"format\":\"uri\",\"type\":\"string\"},\"id\":{\"description\":\"The user's unique identifier\",\"type\":\"integer\"},\"location\":{\"nullable\":true,\"type\":\"string\"},\"login\":{\"description\":\"The user's GitHub username\",\"type\":\"string\"},\"name\":{\"nullable\":true,\"type\":\"string\"},\"node_id\":{\"type\":\"string\"},\"public_gists\":{\"type\":\"integer\"},\"public_repos\":{\"type\":\"integer\"},\"type\":{\"enum\":[\"User\",\"Organization\"],\"type\":\"string\"},\"updated_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"url\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"public\":{\"type\":\"boolean\"},\"updated_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"url\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Gist created\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"documentation_url\":{\"description\":\"URL to documentation about this error\",\"format\":\"uri\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Requires authentication\"}},\"security\":[{\"BearerAuth\":[]}],\"securitySchemes\":{\"BasicAuth\":{\"description\":\"Username and password authentication\",\"scheme\":\"basic\",\"type\":\"http\"},\"BearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"Personal access token or OAuth token\",\"scheme\":\"bearer\",\"type\":\"http\"},\"OAuth2\":{\"flows\":{\"authorizationCode\":{\"authorizationUrl\":\"https://github.com/login/oauth/authorize\",\"scopes\":{\"gist\":\"Create gists\",\"notifications\":\"Access notifications\",\"public_repo\":\"Access public repositories\",\"read:org\":\"Read org and team membership\",\"read:user\":\"Read all user profile data\",\"repo\":\"Full control of private repositories\",\"user\":\"Update all user data\",\"user:email\":\"Access user email addresses\",\"workflow\":\"Update GitHub Action workflows\"},\"tokenUrl\":\"https://github.com/login/oauth/access_token\"}},\"type\":\"oauth2\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/gists","segments":[{"lit":"gists"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":1,"kind":"query","name":"page","orig":"page","reqd":false,"type":"`$INTEGER`","index$":0},{"active":true,"example":30,"kind":"query","name":"per_page","orig":"per_page","reqd":false,"type":"`$INTEGER`","index$":1}]},"contract":{"id":"GET /gists","json":"{\"operationId\":\"listGists\",\"parameters\":[{\"description\":\"The number of results per page\",\"in\":\"query\",\"name\":\"per_page\",\"schema\":{\"default\":30,\"maximum\":100,\"type\":\"integer\"}},{\"description\":\"Page number of the results to fetch\",\"in\":\"query\",\"name\":\"page\",\"schema\":{\"default\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"description\":{\"nullable\":true,\"type\":\"string\"},\"files\":{\"additionalProperties\":{\"properties\":{\"filename\":{\"type\":\"string\"},\"language\":{\"nullable\":true,\"type\":\"string\"},\"raw_url\":{\"format\":\"uri\",\"type\":\"string\"},\"size\":{\"type\":\"integer\"},\"type\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"object\"},\"html_url\":{\"format\":\"uri\",\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"node_id\":{\"type\":\"string\"},\"owner\":{\"properties\":{\"avatar_url\":{\"description\":\"URL to the user's avatar image\",\"format\":\"uri\",\"type\":\"string\"},\"bio\":{\"nullable\":true,\"type\":\"string\"},\"blog\":{\"nullable\":true,\"type\":\"string\"},\"company\":{\"nullable\":true,\"type\":\"string\"},\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"email\":{\"format\":\"email\",\"nullable\":true,\"type\":\"string\"},\"followers\":{\"type\":\"integer\"},\"following\":{\"type\":\"integer\"},\"html_url\":{\"format\":\"uri\",\"type\":\"string\"},\"id\":{\"description\":\"The user's unique identifier\",\"type\":\"integer\"},\"location\":{\"nullable\":true,\"type\":\"string\"},\"login\":{\"description\":\"The user's GitHub username\",\"type\":\"string\"},\"name\":{\"nullable\":true,\"type\":\"string\"},\"node_id\":{\"type\":\"string\"},\"public_gists\":{\"type\":\"integer\"},\"public_repos\":{\"type\":\"integer\"},\"type\":{\"enum\":[\"User\",\"Organization\"],\"type\":\"string\"},\"updated_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"url\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"public\":{\"type\":\"boolean\"},\"updated_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"url\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response\"}},\"security\":[{\"BearerAuth\":[]},{}],\"securitySchemes\":{\"BasicAuth\":{\"description\":\"Username and password authentication\",\"scheme\":\"basic\",\"type\":\"http\"},\"BearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"Personal access token or OAuth token\",\"scheme\":\"bearer\",\"type\":\"http\"},\"OAuth2\":{\"flows\":{\"authorizationCode\":{\"authorizationUrl\":\"https://github.com/login/oauth/authorize\",\"scopes\":{\"gist\":\"Create gists\",\"notifications\":\"Access notifications\",\"public_repo\":\"Access public repositories\",\"read:org\":\"Read org and team membership\",\"read:user\":\"Read all user profile data\",\"repo\":\"Full control of private repositories\",\"user\":\"Update all user data\",\"user:email\":\"Access user email addresses\",\"workflow\":\"Update GitHub Action workflows\"},\"tokenUrl\":\"https://github.com/login/oauth/access_token\"}},\"type\":\"oauth2\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/gists","segments":[{"lit":"gists"}],"select":{"exist":["page","per_page"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"gist","name__orig":"gist","Name":"Gist","name_":"gist","name-":"gist","NAME":"GIST","index$":2}, {"active":true,"entity":"gist","key$":"BasicGistFlow","kind":"basic","name":"BasicGistFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"gist_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"gist_ref01"}}],"index$":1}]}, 'Gist')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const gist_ref01_ent = client.Gist()
    let gist_ref01_data = setup.data.new.gist['gist_ref01']

    gist_ref01_data = (await gist_ref01_ent.create(gist_ref01_data)).data()
    assert(null != gist_ref01_data.id)


    // LIST
    const gist_ref01_match: any = {}

    const gist_ref01_list = (await gist_ref01_ent.list(gist_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(gist_ref01_list, { id: gist_ref01_data.id })))


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/gist/GistTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = GithubRestSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['gist01','gist02','gist03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GITHUB_REST_TEST_GIST_ENTID': idmap,
    'GITHUB_REST_TEST_LIVE': 'FALSE',
    'GITHUB_REST_TEST_EXPLAIN': 'FALSE',
    'GITHUB_REST_APIKEY': '',
  })

  idmap = env['GITHUB_REST_TEST_GIST_ENTID']

  const live = 'TRUE' === env.GITHUB_REST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GITHUB_REST_TEST_GIST_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new GithubRestSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
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
    ]))
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
  }

  return setup
}
  
