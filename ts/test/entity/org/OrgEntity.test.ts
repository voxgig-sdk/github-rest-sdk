

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"avatar_url":{"a":true,"fo":"uri","h":"Avatar Url","n":"avatar_url","r":false,"t":"`$STRING`","key$":"avatar_url","index$":0},"blog":{"a":true,"h":"Blog","n":"blog","r":false,"t":"`$STRING`","key$":"blog","index$":1},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":false,"t":"`$STRING`","key$":"created_at","index$":2},"description":{"a":true,"h":"Description","n":"description","r":false,"t":"`$STRING`","key$":"description","index$":3},"email":{"a":true,"fo":"email","h":"Email","n":"email","r":false,"t":"`$STRING`","key$":"email","index$":4},"followers":{"a":true,"h":"Followers","n":"followers","r":false,"t":"`$INTEGER`","key$":"followers","index$":5},"following":{"a":true,"h":"Following","n":"following","r":false,"t":"`$INTEGER`","key$":"following","index$":6},"html_url":{"a":true,"fo":"uri","h":"Html Url","n":"html_url","r":false,"t":"`$STRING`","key$":"html_url","index$":7},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$INTEGER`","key$":"id","index$":8},"location":{"a":true,"h":"Location","n":"location","r":false,"t":"`$STRING`","key$":"location","index$":9},"login":{"a":true,"h":"Login","n":"login","r":false,"t":"`$STRING`","key$":"login","index$":10},"name":{"a":true,"h":"Name","n":"name","r":false,"t":"`$STRING`","key$":"name","index$":11},"node_id":{"a":true,"h":"Node Id","n":"node_id","r":false,"t":"`$STRING`","key$":"node_id","index$":12},"public_gists":{"a":true,"h":"Public Gists","n":"public_gists","r":false,"t":"`$INTEGER`","key$":"public_gists","index$":13},"public_repos":{"a":true,"h":"Public Repos","n":"public_repos","r":false,"t":"`$INTEGER`","key$":"public_repos","index$":14},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":false,"t":"`$STRING`","key$":"updated_at","index$":15},"url":{"a":true,"fo":"uri","h":"Url","n":"url","r":false,"t":"`$STRING`","key$":"url","index$":16}},"id":{"field":"id","name":"id"},"name":"org","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /orgs/{org}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"org","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/orgs/{org}","q":{"exist":["id"]},"r":{"param":{"org":"id"}},"s":[{"lit":"orgs"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"org","name__orig":"org","Name":"Org","name_":"org","name-":"org","NAME":"ORG","index$":5}, {"active":true,"entity":"org","key$":"BasicOrgFlow","kind":"basic","name":"BasicOrgFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"org_ref01","srcdatavar":"org_ref01_data","suffix":"_dt0"},"m":{"id":"org01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-org_ref01"}}],"index$":0}]}, 'Org', {"GET /orgs/{org}":{"protocol":"http","operationId":"getOrganization","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"login":{"type":"string","key$":"login"},"id":{"type":"integer","key$":"id"},"node_id":{"type":"string","key$":"node_id"},"url":{"type":"string","format":"uri","key$":"url"},"html_url":{"type":"string","format":"uri","key$":"html_url"},"name":{"type":"string","nullable":true,"key$":"name"},"description":{"type":"string","nullable":true,"key$":"description"},"email":{"type":"string","format":"email","nullable":true,"key$":"email"},"blog":{"type":"string","nullable":true,"key$":"blog"},"location":{"type":"string","nullable":true,"key$":"location"},"avatar_url":{"type":"string","format":"uri","key$":"avatar_url"},"public_repos":{"type":"integer","key$":"public_repos"},"public_gists":{"type":"integer","key$":"public_gists"},"followers":{"type":"integer","key$":"followers"},"following":{"type":"integer","key$":"following"},"created_at":{"type":"string","format":"date-time","key$":"created_at"},"updated_at":{"type":"string","format":"date-time","key$":"updated_at"}},"x-ref":"#/components/schemas/Organization","index$":0}}}},"404":{"description":"Resource not found","content":{"application/json":{"schema":{"type":"object","properties":{"message":{"type":"string","description":"Error message"},"documentation_url":{"type":"string","format":"uri","description":"URL to documentation about this error"}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/NotFound"}},"parameters":[{"name":"org","in":"path","required":true,"description":"The organization name","schema":{"type":"string"},"index$":0}],"security":[{"BearerAuth":[]},{"BasicAuth":[]},{"OAuth2":[]}],"securitySource":"definition","securitySchemes":{"BearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"JWT","description":"Personal access token or OAuth token"},"BasicAuth":{"type":"http","scheme":"basic","description":"Username and password authentication"},"OAuth2":{"type":"oauth2","flows":{"authorizationCode":{"authorizationUrl":"https://github.com/login/oauth/authorize","tokenUrl":"https://github.com/login/oauth/access_token","scopes":{"repo":"Full control of private repositories","public_repo":"Access public repositories","user":"Update all user data","read:user":"Read all user profile data","user:email":"Access user email addresses","gist":"Create gists","notifications":"Access notifications","read:org":"Read org and team membership","workflow":"Update GitHub Action workflows"}}}}}}})
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
  
