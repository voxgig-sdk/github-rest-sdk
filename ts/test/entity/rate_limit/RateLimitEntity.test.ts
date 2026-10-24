

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { GithubRestSDK, BaseFeature, config, stdutil } from '../../..'

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"rate":{"a":true,"h":"Rate","n":"rate","r":false,"t":"`$OBJECT`","key$":"rate","index$":0},"resources":{"a":true,"h":"Resources","n":"resources","r":false,"t":"`$OBJECT`","key$":"resources","index$":1}},"name":"rate_limit","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /rate_limit","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/rate_limit","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"rate_limit"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"rate_limit","name__orig":"rate_limit","Name":"RateLimit","name_":"rate_limit","name-":"rate-limit","NAME":"RATE_LIMIT","index$":7}, {"active":true,"entity":"rate_limit","key$":"BasicRateLimitFlow","kind":"basic","name":"BasicRateLimitFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"rate_limit_ref01","srcdatavar":"rate_limit_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-rate_limit_ref01"}}],"index$":0}]}, 'RateLimit', {"GET /rate_limit":{"protocol":"http","parameters":[]}}, { strict: LIVE_STRICT, t })
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



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

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
  
