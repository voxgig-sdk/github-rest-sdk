

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


describe('BranchEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GITHUB_REST_TEST_LIVE=TRUE.
  afterEach(liveDelay('GITHUB_REST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GithubRestSDK.test()
    const ent = testsdk.Branch()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GITHUB_REST_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'branch.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"commit":{"a":true,"h":"Commit","n":"commit","r":false,"t":"`$OBJECT`","key$":"commit","index$":0},"name":{"a":true,"h":"Name","n":"name","r":false,"t":"`$STRING`","key$":"name","index$":1},"protected":{"a":true,"h":"Protected","n":"protected","r":false,"t":"`$BOOLEAN`","key$":"protected","index$":2}},"name":"branch","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /repos/{owner}/{repo}/branches","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"owner","or":"owner","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"repo","or":"repo","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":30,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/repos/{owner}/{repo}/branches","q":{"exist":["owner","page","per_page","repo"]},"r":{},"s":[{"lit":"repos"},{"var":"owner"},{"var":"repo"},{"lit":"branches"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.repo"]]},"key$":"branch","name__orig":"branch","Name":"Branch","name_":"branch","name-":"branch","NAME":"BRANCH","index$":0}, {"active":true,"entity":"branch","key$":"BasicBranchFlow","kind":"basic","name":"BasicBranchFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"owner":"owner01","repo":"repo01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"branch_ref01"}}],"index$":0}]}, 'Branch', {"GET /repos/{owner}/{repo}/branches":{"protocol":"http","operationId":"listBranches","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"name":{"type":"string","key$":"name"},"commit":{"type":"object","properties":{"sha":{"type":"string"},"url":{"type":"string","format":"uri"}},"key$":"commit"},"protected":{"type":"boolean","key$":"protected"}},"x-ref":"#/components/schemas/Branch","index$":0}}}}},"404":{"description":"Resource not found","content":{"application/json":{"schema":{"type":"object","properties":{"message":{"type":"string","description":"Error message"},"documentation_url":{"type":"string","format":"uri","description":"URL to documentation about this error"}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/NotFound"}},"parameters":[{"name":"owner","in":"path","required":true,"description":"The account owner of the repository. The name is not case sensitive.","schema":{"type":"string"},"x-ref":"#/components/parameters/owner","index$":0},{"name":"repo","in":"path","required":true,"description":"The name of the repository. The name is not case sensitive.","schema":{"type":"string"},"x-ref":"#/components/parameters/repo","index$":1},{"name":"per_page","in":"query","description":"The number of results per page","schema":{"type":"integer","default":30,"maximum":100},"index$":2},{"name":"page","in":"query","description":"Page number of the results to fetch","schema":{"type":"integer","default":1},"index$":3}],"security":[{"BearerAuth":[]},{"BasicAuth":[]},{"OAuth2":[]}],"securitySource":"definition","securitySchemes":{"BearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"JWT","description":"Personal access token or OAuth token"},"BasicAuth":{"type":"http","scheme":"basic","description":"Username and password authentication"},"OAuth2":{"type":"oauth2","flows":{"authorizationCode":{"authorizationUrl":"https://github.com/login/oauth/authorize","tokenUrl":"https://github.com/login/oauth/access_token","scopes":{"repo":"Full control of private repositories","public_repo":"Access public repositories","user":"Update all user data","read:user":"Read all user profile data","user:email":"Access user email addresses","gist":"Create gists","notifications":"Access notifications","read:org":"Read org and team membership","workflow":"Update GitHub Action workflows"}}}}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let branch_ref01_data = Object.values(setup.data.existing.branch)[0] as any

    // LIST
    const branch_ref01_ent = client.Branch()
    const branch_ref01_match: any = {}
    branch_ref01_match['owner'] = setup.idmap['owner01']
    branch_ref01_match['repo'] = setup.idmap['repo01']

    const branch_ref01_list = (await branch_ref01_ent.list(branch_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/branch/BranchTestData.json')

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
    ['branch01','branch02','branch03','repo01','repo02','repo03','owner01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GITHUB_REST_TEST_BRANCH_ENTID': idmap,
    'GITHUB_REST_TEST_LIVE': 'FALSE',
    'GITHUB_REST_TEST_EXPLAIN': 'FALSE',
    'GITHUB_REST_APIKEY': '',
  })

  idmap = env['GITHUB_REST_TEST_BRANCH_ENTID']

  const live = 'TRUE' === env.GITHUB_REST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GITHUB_REST_TEST_BRANCH_ENTID']
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
  
