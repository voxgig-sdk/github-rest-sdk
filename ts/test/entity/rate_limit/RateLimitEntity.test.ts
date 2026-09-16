

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


describe('RateLimitEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GITHUB_REST_TEST_LIVE=TRUE.
  afterEach(liveDelay('GITHUB_REST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GithubRestSDK.test()
    const ent = testsdk.RateLimit()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GITHUB_REST_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'rate_limit.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"rate","req":false,"type":"`$OBJECT`","index$":0},{"active":true,"name":"resources","req":false,"type":"`$OBJECT`","index$":1}],"name":"rate_limit","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{},"contract":{"id":"GET /rate_limit","json":"{\"operationId\":\"getRateLimit\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"rate\":{\"properties\":{\"limit\":{\"description\":\"The maximum number of requests you're permitted to make per hour\",\"type\":\"integer\"},\"remaining\":{\"description\":\"The number of requests remaining in the current rate limit window\",\"type\":\"integer\"},\"reset\":{\"description\":\"The time at which the current rate limit window resets in UTC epoch seconds\",\"type\":\"integer\"},\"used\":{\"description\":\"The number of requests you've made in the current rate limit window\",\"type\":\"integer\"}},\"type\":\"object\"},\"resources\":{\"properties\":{\"core\":{\"properties\":{\"limit\":{\"description\":\"The maximum number of requests you're permitted to make per hour\",\"type\":\"integer\"},\"remaining\":{\"description\":\"The number of requests remaining in the current rate limit window\",\"type\":\"integer\"},\"reset\":{\"description\":\"The time at which the current rate limit window resets in UTC epoch seconds\",\"type\":\"integer\"},\"used\":{\"description\":\"The number of requests you've made in the current rate limit window\",\"type\":\"integer\"}},\"type\":\"object\"},\"graphql\":{\"properties\":{\"limit\":{\"description\":\"The maximum number of requests you're permitted to make per hour\",\"type\":\"integer\"},\"remaining\":{\"description\":\"The number of requests remaining in the current rate limit window\",\"type\":\"integer\"},\"reset\":{\"description\":\"The time at which the current rate limit window resets in UTC epoch seconds\",\"type\":\"integer\"},\"used\":{\"description\":\"The number of requests you've made in the current rate limit window\",\"type\":\"integer\"}},\"type\":\"object\"},\"search\":{\"properties\":{\"limit\":{\"description\":\"The maximum number of requests you're permitted to make per hour\",\"type\":\"integer\"},\"remaining\":{\"description\":\"The number of requests remaining in the current rate limit window\",\"type\":\"integer\"},\"reset\":{\"description\":\"The time at which the current rate limit window resets in UTC epoch seconds\",\"type\":\"integer\"},\"used\":{\"description\":\"The number of requests you've made in the current rate limit window\",\"type\":\"integer\"}},\"type\":\"object\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"security\":[{\"BearerAuth\":[]},{}],\"securitySchemes\":{\"BasicAuth\":{\"description\":\"Username and password authentication\",\"scheme\":\"basic\",\"type\":\"http\"},\"BearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"Personal access token or OAuth token\",\"scheme\":\"bearer\",\"type\":\"http\"},\"OAuth2\":{\"flows\":{\"authorizationCode\":{\"authorizationUrl\":\"https://github.com/login/oauth/authorize\",\"scopes\":{\"gist\":\"Create gists\",\"notifications\":\"Access notifications\",\"public_repo\":\"Access public repositories\",\"read:org\":\"Read org and team membership\",\"read:user\":\"Read all user profile data\",\"repo\":\"Full control of private repositories\",\"user\":\"Update all user data\",\"user:email\":\"Access user email addresses\",\"workflow\":\"Update GitHub Action workflows\"},\"tokenUrl\":\"https://github.com/login/oauth/access_token\"}},\"type\":\"oauth2\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/rate_limit","segments":[{"lit":"rate_limit"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"rate_limit","name__orig":"rate_limit","Name":"RateLimit","name_":"rate_limit","name-":"rate-limit","NAME":"RATE_LIMIT","index$":7}, {"active":true,"entity":"rate_limit","key$":"BasicRateLimitFlow","kind":"basic","name":"BasicRateLimitFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"rate_limit_ref01","srcdatavar":"rate_limit_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-rate_limit_ref01"}}],"index$":0}]}, 'RateLimit')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let rate_limit_ref01_data = Object.values(setup.data.existing.rate_limit)[0] as any

    // LOAD
    const rate_limit_ref01_ent = client.RateLimit()
    const rate_limit_ref01_match_dt0: any = {}
    const rate_limit_ref01_data_dt0 = (await rate_limit_ref01_ent.load(rate_limit_ref01_match_dt0)).data()
    assert(null != rate_limit_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/rate_limit/RateLimitTestData.json')

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
    ['rate_limit01','rate_limit02','rate_limit03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GITHUB_REST_TEST_RATE_LIMIT_ENTID': idmap,
    'GITHUB_REST_TEST_LIVE': 'FALSE',
    'GITHUB_REST_TEST_EXPLAIN': 'FALSE',
    'GITHUB_REST_APIKEY': '',
  })

  idmap = env['GITHUB_REST_TEST_RATE_LIMIT_ENTID']

  const live = 'TRUE' === env.GITHUB_REST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GITHUB_REST_TEST_RATE_LIMIT_ENTID']
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
  
