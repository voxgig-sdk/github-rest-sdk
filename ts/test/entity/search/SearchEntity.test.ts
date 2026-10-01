

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


describe('SearchEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GITHUB_REST_TEST_LIVE=TRUE.
  afterEach(liveDelay('GITHUB_REST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GithubRestSDK.test()
    const ent = testsdk.Search()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GITHUB_REST_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'search.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"search","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /search/issues","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"desc","k":"query","n":"order","or":"order","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":30,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"k":"query","n":"q","or":"q","r":true,"t":"`$STRING`","index$":3},{"a":true,"k":"query","n":"sort","or":"sort","r":false,"t":"`$STRING`","index$":4}]},"k":"http","m":"GET","o":"/search/issues","q":{"$action":"issue","exist":["order","page","per_page","q","sort"]},"r":{},"s":[{"lit":"search"},{"lit":"issues"}],"t":{"req":"`reqdata`","res":"`body.items`"},"index$":0},{"a":true,"co":{"id":"GET /search/repositories","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"desc","k":"query","n":"order","or":"order","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":30,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"k":"query","n":"q","or":"q","r":true,"t":"`$STRING`","index$":3},{"a":true,"k":"query","n":"sort","or":"sort","r":false,"t":"`$STRING`","index$":4}]},"k":"http","m":"GET","o":"/search/repositories","q":{"$action":"repository","exist":["order","page","per_page","q","sort"]},"r":{},"s":[{"lit":"search"},{"lit":"repositories"}],"t":{"req":"`reqdata`","res":"`body.items`"},"index$":1}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"search","name__orig":"search","Name":"Search","name_":"search","name-":"search","NAME":"SEARCH","index$":9}, {"active":true,"entity":"search","key$":"BasicSearchFlow","kind":"basic","name":"BasicSearchFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"search_ref01"}}],"index$":0}]}, 'Search', {"GET /search/issues":{"protocol":"http","parameters":[{"name":"q","in":"query","required":true,"description":"The query contains one or more search keywords and qualifiers","schema":{"type":"string"},"index$":0},{"name":"sort","in":"query","description":"Sorts the results of your query","schema":{"type":"string","enum":["comments","reactions","interactions","created","updated"]},"index$":1},{"name":"order","in":"query","description":"Determines whether the first search result returned is the highest or lowest number of matches","schema":{"type":"string","enum":["desc","asc"],"default":"desc"},"index$":2},{"name":"per_page","in":"query","description":"The number of results per page","schema":{"type":"integer","default":30,"maximum":100},"index$":3},{"name":"page","in":"query","description":"Page number of the results to fetch","schema":{"type":"integer","default":1},"index$":4}]},"GET /search/repositories":{"protocol":"http","parameters":[{"name":"q","in":"query","required":true,"description":"The query contains one or more search keywords and qualifiers","schema":{"type":"string"},"index$":0},{"name":"sort","in":"query","description":"Sorts the results of your query","schema":{"type":"string","enum":["stars","forks","help-wanted-issues","updated"]},"index$":1},{"name":"order","in":"query","description":"Determines whether the first search result returned is the highest or lowest number of matches","schema":{"type":"string","enum":["desc","asc"],"default":"desc"},"index$":2},{"name":"per_page","in":"query","description":"The number of results per page","schema":{"type":"integer","default":30,"maximum":100},"index$":3},{"name":"page","in":"query","description":"Page number of the results to fetch","schema":{"type":"integer","default":1},"index$":4}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let search_ref01_data = Object.values(setup.data.existing.search)[0] as any

    // LIST
    const search_ref01_ent = client.Search()
    const search_ref01_match: any = {}

    const search_ref01_list = (await search_ref01_ent.list(search_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/search/SearchTestData.json')

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
    ['search01','search02','search03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GITHUB_REST_TEST_SEARCH_ENTID': idmap,
    'GITHUB_REST_TEST_LIVE': 'FALSE',
    'GITHUB_REST_TEST_EXPLAIN': 'FALSE',
    'GITHUB_REST_APIKEY': '',
  })

  idmap = env['GITHUB_REST_TEST_SEARCH_ENTID']

  const live = 'TRUE' === env.GITHUB_REST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GITHUB_REST_TEST_SEARCH_ENTID']
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
  
