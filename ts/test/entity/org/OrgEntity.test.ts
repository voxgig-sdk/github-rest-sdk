

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


describe('OrgEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GITHUB_REST_TEST_LIVE=TRUE.
  afterEach(liveDelay('GITHUB_REST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GithubRestSDK.test()
    const ent = testsdk.Org()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GITHUB_REST_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'org.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"uri","name":"avatar_url","req":false,"type":"`$STRING`","index$":0},{"active":true,"name":"blog","req":false,"type":"`$STRING`","index$":1},{"active":true,"format":"date-time","name":"created_at","req":false,"type":"`$STRING`","index$":2},{"active":true,"name":"description","req":false,"type":"`$STRING`","index$":3},{"active":true,"format":"email","name":"email","req":false,"type":"`$STRING`","index$":4},{"active":true,"name":"followers","req":false,"type":"`$INTEGER`","index$":5},{"active":true,"name":"following","req":false,"type":"`$INTEGER`","index$":6},{"active":true,"format":"uri","name":"html_url","req":false,"type":"`$STRING`","index$":7},{"active":true,"name":"id","req":false,"type":"`$INTEGER`","index$":8},{"active":true,"name":"location","req":false,"type":"`$STRING`","index$":9},{"active":true,"name":"login","req":false,"type":"`$STRING`","index$":10},{"active":true,"name":"name","req":false,"type":"`$STRING`","index$":11},{"active":true,"name":"node_id","req":false,"type":"`$STRING`","index$":12},{"active":true,"name":"public_gists","req":false,"type":"`$INTEGER`","index$":13},{"active":true,"name":"public_repos","req":false,"type":"`$INTEGER`","index$":14},{"active":true,"format":"date-time","name":"updated_at","req":false,"type":"`$STRING`","index$":15},{"active":true,"format":"uri","name":"url","req":false,"type":"`$STRING`","index$":16}],"id":{"field":"id","name":"id"},"name":"org","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"org","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /orgs/{org}","json":"{\"operationId\":\"getOrganization\",\"parameters\":[{\"description\":\"The organization name\",\"in\":\"path\",\"name\":\"org\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"avatar_url\":{\"format\":\"uri\",\"type\":\"string\"},\"blog\":{\"nullable\":true,\"type\":\"string\"},\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"description\":{\"nullable\":true,\"type\":\"string\"},\"email\":{\"format\":\"email\",\"nullable\":true,\"type\":\"string\"},\"followers\":{\"type\":\"integer\"},\"following\":{\"type\":\"integer\"},\"html_url\":{\"format\":\"uri\",\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"location\":{\"nullable\":true,\"type\":\"string\"},\"login\":{\"type\":\"string\"},\"name\":{\"nullable\":true,\"type\":\"string\"},\"node_id\":{\"type\":\"string\"},\"public_gists\":{\"type\":\"integer\"},\"public_repos\":{\"type\":\"integer\"},\"updated_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"url\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"documentation_url\":{\"description\":\"URL to documentation about this error\",\"format\":\"uri\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Resource not found\"}},\"security\":[{\"BearerAuth\":[]},{\"BasicAuth\":[]},{\"OAuth2\":[]}],\"securitySchemes\":{\"BasicAuth\":{\"description\":\"Username and password authentication\",\"scheme\":\"basic\",\"type\":\"http\"},\"BearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"Personal access token or OAuth token\",\"scheme\":\"bearer\",\"type\":\"http\"},\"OAuth2\":{\"flows\":{\"authorizationCode\":{\"authorizationUrl\":\"https://github.com/login/oauth/authorize\",\"scopes\":{\"gist\":\"Create gists\",\"notifications\":\"Access notifications\",\"public_repo\":\"Access public repositories\",\"read:org\":\"Read org and team membership\",\"read:user\":\"Read all user profile data\",\"repo\":\"Full control of private repositories\",\"user\":\"Update all user data\",\"user:email\":\"Access user email addresses\",\"workflow\":\"Update GitHub Action workflows\"},\"tokenUrl\":\"https://github.com/login/oauth/access_token\"}},\"type\":\"oauth2\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/orgs/{org}","rename":{"param":{"org":"id"}},"segments":[{"lit":"orgs"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"org","name__orig":"org","Name":"Org","name_":"org","name-":"org","NAME":"ORG","index$":5}, {"active":true,"entity":"org","key$":"BasicOrgFlow","kind":"basic","name":"BasicOrgFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"org_ref01","srcdatavar":"org_ref01_data","suffix":"_dt0"},"match":{"id":"org01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-org_ref01"}}],"index$":0}]}, 'Org')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let org_ref01_data = Object.values(setup.data.existing.org)[0] as any

    // LOAD
    const org_ref01_ent = client.Org()
    const org_ref01_match_dt0: any = {}
    org_ref01_match_dt0.id = org_ref01_data.id
    const org_ref01_data_dt0 = (await org_ref01_ent.load(org_ref01_match_dt0)).data()
    assert(org_ref01_data_dt0.id === org_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/org/OrgTestData.json')

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
    ['org01','org02','org03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GITHUB_REST_TEST_ORG_ENTID': idmap,
    'GITHUB_REST_TEST_LIVE': 'FALSE',
    'GITHUB_REST_TEST_EXPLAIN': 'FALSE',
    'GITHUB_REST_APIKEY': '',
  })

  idmap = env['GITHUB_REST_TEST_ORG_ENTID']

  const live = 'TRUE' === env.GITHUB_REST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GITHUB_REST_TEST_ORG_ENTID']
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
  
