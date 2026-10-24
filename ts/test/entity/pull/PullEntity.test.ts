

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


describe('PullEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GITHUB_REST_TEST_LIVE=TRUE.
  afterEach(liveDelay('GITHUB_REST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GithubRestSDK.test()
    const ent = testsdk.Pull()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = GithubRestSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Pull().list({"owner":1,"repo":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GITHUB_REST_TEST_LIVE
    for (const op of ['create', 'list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'pull.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"base":{"a":true,"h":"Base","n":"base","op":{"create":{"req":true,"type":"`$STRING`"}},"r":false,"sh":"The name of the branch you want the changes pulled into","t":"`$OBJECT`","key$":"base","index$":0},"body":{"a":true,"h":"Body","n":"body","r":false,"sh":"The contents of the pull request","t":"`$STRING`","key$":"body","index$":1},"closed_at":{"a":true,"fo":"date-time","h":"Closed At","n":"closed_at","r":false,"t":"`$STRING`","key$":"closed_at","index$":2},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":false,"t":"`$STRING`","key$":"created_at","index$":3},"draft":{"a":true,"h":"Draft","n":"draft","r":false,"sh":"Indicates whether the pull request is a draft","t":"`$BOOLEAN`","key$":"draft","index$":4},"head":{"a":true,"h":"Head","n":"head","op":{"create":{"req":true,"type":"`$STRING`"}},"r":false,"sh":"The name of the branch where your changes are implemented","t":"`$OBJECT`","key$":"head","index$":5},"html_url":{"a":true,"fo":"uri","h":"Html Url","n":"html_url","r":false,"t":"`$STRING`","key$":"html_url","index$":6},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$INTEGER`","key$":"id","index$":7},"merged_at":{"a":true,"fo":"date-time","h":"Merged At","n":"merged_at","r":false,"t":"`$STRING`","key$":"merged_at","index$":8},"node_id":{"a":true,"h":"Node Id","n":"node_id","r":false,"t":"`$STRING`","key$":"node_id","index$":9},"number":{"a":true,"h":"Number","n":"number","r":false,"t":"`$INTEGER`","key$":"number","index$":10},"state":{"a":true,"h":"State","n":"state","r":false,"t":"`$STRING`","key$":"state","index$":11},"title":{"a":true,"h":"Title","n":"title","op":{"create":{"req":true,"type":"`$STRING`"}},"r":false,"sh":"The title of the pull request","t":"`$STRING`","key$":"title","index$":12},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":false,"t":"`$STRING`","key$":"updated_at","index$":13},"url":{"a":true,"fo":"uri","h":"Url","n":"url","r":false,"t":"`$STRING`","key$":"url","index$":14},"user":{"a":true,"h":"User","n":"user","r":false,"t":"`$OBJECT`","key$":"user","index$":15}},"id":{"field":"id","name":"id"},"name":"pull","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["base","body","draft","head","title"],"co":{"id":"POST /repos/{owner}/{repo}/pulls","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"owner","or":"owner","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"repo","or":"repo","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/repos/{owner}/{repo}/pulls","q":{"exist":["owner","repo"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"repos"},{"var":"owner"},{"var":"repo"},{"lit":"pulls"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /repos/{owner}/{repo}/pulls","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"owner","or":"owner","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"repo","or":"repo","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"ex":"desc","k":"query","n":"direction","or":"direction","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":30,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"ex":"created","k":"query","n":"sort","or":"sort","r":false,"t":"`$STRING`","index$":3},{"a":true,"ex":"open","k":"query","n":"state","or":"state","r":false,"t":"`$STRING`","index$":4}]},"k":"http","m":"GET","o":"/repos/{owner}/{repo}/pulls","q":{"exist":["owner","repo"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"repos"},{"var":"owner"},{"var":"repo"},{"lit":"pulls"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /repos/{owner}/{repo}/pulls/{pull_number}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"pull_number","r":true,"t":"`$INTEGER`","index$":0},{"a":true,"k":"param","n":"owner","or":"owner","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"repo","or":"repo","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/repos/{owner}/{repo}/pulls/{pull_number}","q":{"exist":["id","owner","repo"]},"r":{"param":{"pull_number":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"repos"},{"var":"owner"},{"var":"repo"},{"lit":"pulls"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.repo"]]},"key$":"pull","name__orig":"pull","Name":"Pull","name_":"pull","name-":"pull","NAME":"PULL","index$":6}, {"active":true,"entity":"pull","key$":"BasicPullFlow","kind":"basic","name":"BasicPullFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"pull_ref01"},"m":{"owner":"owner01","repo":"repo01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"owner":"owner01","repo":"repo01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"pull_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"pull_ref01","srcdatavar":"pull_ref01_data","suffix":"_dt0"},"m":{"id":"pull01","owner":"owner01","repo":"repo01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-pull_ref01"}}],"index$":2}]}, 'Pull', {"POST /repos/{owner}/{repo}/pulls":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["title","head","base"],"properties":{"title":{"type":"string","description":"The title of the pull request","key$":"title"},"body":{"type":"string","description":"The contents of the pull request","key$":"body"},"head":{"type":"string","description":"The name of the branch where your changes are implemented","key$":"head"},"base":{"type":"string","description":"The name of the branch you want the changes pulled into","key$":"base"},"draft":{"type":"boolean","description":"Indicates whether the pull request is a draft","key$":"draft"}},"index$":1}}}},"parameters":[{"name":"owner","in":"path","required":true,"description":"The account owner of the repository. The name is not case sensitive.","schema":{"type":"string"},"x-ref":"#/components/parameters/owner","index$":0},{"name":"repo","in":"path","required":true,"description":"The name of the repository. The name is not case sensitive.","schema":{"type":"string"},"x-ref":"#/components/parameters/repo","index$":1}]},"GET /repos/{owner}/{repo}/pulls":{"protocol":"http","parameters":[{"name":"owner","in":"path","required":true,"description":"The account owner of the repository. The name is not case sensitive.","schema":{"type":"string"},"x-ref":"#/components/parameters/owner","index$":0},{"name":"repo","in":"path","required":true,"description":"The name of the repository. The name is not case sensitive.","schema":{"type":"string"},"x-ref":"#/components/parameters/repo","index$":1},{"name":"state","in":"query","description":"Either open, closed, or all to filter by state","schema":{"type":"string","enum":["open","closed","all"],"default":"open"},"index$":2},{"name":"sort","in":"query","description":"What to sort results by","schema":{"type":"string","enum":["created","updated","popularity","long-running"],"default":"created"},"index$":3},{"name":"direction","in":"query","description":"The direction of the sort","schema":{"type":"string","enum":["asc","desc"],"default":"desc"},"index$":4},{"name":"per_page","in":"query","description":"The number of results per page","schema":{"type":"integer","default":30,"maximum":100},"index$":5},{"name":"page","in":"query","description":"Page number of the results to fetch","schema":{"type":"integer","default":1},"index$":6}]},"GET /repos/{owner}/{repo}/pulls/{pull_number}":{"protocol":"http","parameters":[{"name":"owner","in":"path","required":true,"description":"The account owner of the repository. The name is not case sensitive.","schema":{"type":"string"},"x-ref":"#/components/parameters/owner","index$":0},{"name":"repo","in":"path","required":true,"description":"The name of the repository. The name is not case sensitive.","schema":{"type":"string"},"x-ref":"#/components/parameters/repo","index$":1},{"name":"pull_number","in":"path","required":true,"description":"The number that identifies the pull request","schema":{"type":"integer"},"index$":2}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const pull_ref01_ent = client.Pull()
    let pull_ref01_data = setup.data.new.pull['pull_ref01']
    pull_ref01_data['owner'] = setup.idmap['owner01']
    pull_ref01_data['repo'] = setup.idmap['repo01']

    pull_ref01_data = (await pull_ref01_ent.create(pull_ref01_data)).data()
    assert(null != pull_ref01_data.id)


    // LIST
    const pull_ref01_match: any = {}
    pull_ref01_match['owner'] = setup.idmap['owner01']
    pull_ref01_match['repo'] = setup.idmap['repo01']

    const pull_ref01_list = (await pull_ref01_ent.list(pull_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(pull_ref01_list, { id: pull_ref01_data.id })))


    // LOAD
    const pull_ref01_match_dt0: any = {}
    pull_ref01_match_dt0.id = pull_ref01_data.id
    pull_ref01_match_dt0['owner'] = setup.idmap['owner'] ?? setup.idmap['owner01']
    pull_ref01_match_dt0['repo'] = setup.idmap['repo'] ?? setup.idmap['repo01']
    const pull_ref01_data_dt0 = (await pull_ref01_ent.load(pull_ref01_match_dt0)).data()
    assert(pull_ref01_data_dt0.id === pull_ref01_data.id)


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
      '../../../../.sdk/test/entity/pull/PullTestData.json')

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
    ['pull01','pull02','pull03','repo01','repo02','repo03','owner01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GITHUB_REST_TEST_PULL_ENTID': idmap,
    'GITHUB_REST_TEST_LIVE': 'FALSE',
    'GITHUB_REST_TEST_EXPLAIN': 'FALSE',
    'GITHUB_REST_APIKEY': '',
  })

  idmap = env['GITHUB_REST_TEST_PULL_ENTID']

  const live = 'TRUE' === env.GITHUB_REST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GITHUB_REST_TEST_PULL_ENTID']
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
  
