

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"search","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":"desc","kind":"query","name":"order","orig":"order","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":1,"kind":"query","name":"page","orig":"page","reqd":false,"type":"`$INTEGER`","index$":1},{"active":true,"example":30,"kind":"query","name":"per_page","orig":"per_page","reqd":false,"type":"`$INTEGER`","index$":2},{"active":true,"kind":"query","name":"q","orig":"q","reqd":true,"type":"`$STRING`","index$":3},{"active":true,"kind":"query","name":"sort","orig":"sort","reqd":false,"type":"`$STRING`","index$":4}]},"contract":{"id":"GET /search/issues","json":"{\"operationId\":\"searchIssues\",\"parameters\":[{\"description\":\"The query contains one or more search keywords and qualifiers\",\"in\":\"query\",\"name\":\"q\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Sorts the results of your query\",\"in\":\"query\",\"name\":\"sort\",\"schema\":{\"enum\":[\"comments\",\"reactions\",\"interactions\",\"created\",\"updated\"],\"type\":\"string\"}},{\"description\":\"Determines whether the first search result returned is the highest or lowest number of matches\",\"in\":\"query\",\"name\":\"order\",\"schema\":{\"default\":\"desc\",\"enum\":[\"desc\",\"asc\"],\"type\":\"string\"}},{\"description\":\"The number of results per page\",\"in\":\"query\",\"name\":\"per_page\",\"schema\":{\"default\":30,\"maximum\":100,\"type\":\"integer\"}},{\"description\":\"Page number of the results to fetch\",\"in\":\"query\",\"name\":\"page\",\"schema\":{\"default\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"incomplete_results\":{\"type\":\"boolean\"},\"items\":{\"items\":{\"properties\":{\"assignee\":{\"allOf\":[{\"properties\":{\"avatar_url\":{\"description\":\"URL to the user's avatar image\",\"format\":\"uri\",\"type\":\"string\"},\"bio\":{\"nullable\":true,\"type\":\"string\"},\"blog\":{\"nullable\":true,\"type\":\"string\"},\"company\":{\"nullable\":true,\"type\":\"string\"},\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"email\":{\"format\":\"email\",\"nullable\":true,\"type\":\"string\"},\"followers\":{\"type\":\"integer\"},\"following\":{\"type\":\"integer\"},\"html_url\":{\"format\":\"uri\",\"type\":\"string\"},\"id\":{\"description\":\"The user's unique identifier\",\"type\":\"integer\"},\"location\":{\"nullable\":true,\"type\":\"string\"},\"login\":{\"description\":\"The user's GitHub username\",\"type\":\"string\"},\"name\":{\"nullable\":true,\"type\":\"string\"},\"node_id\":{\"type\":\"string\"},\"public_gists\":{\"type\":\"integer\"},\"public_repos\":{\"type\":\"integer\"},\"type\":{\"enum\":[\"User\",\"Organization\"],\"type\":\"string\"},\"updated_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"url\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"}],\"nullable\":true},\"assignees\":{\"items\":{\"properties\":{\"avatar_url\":{\"description\":\"URL to the user's avatar image\",\"format\":\"uri\",\"type\":\"string\"},\"bio\":{\"nullable\":true,\"type\":\"string\"},\"blog\":{\"nullable\":true,\"type\":\"string\"},\"company\":{\"nullable\":true,\"type\":\"string\"},\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"email\":{\"format\":\"email\",\"nullable\":true,\"type\":\"string\"},\"followers\":{\"type\":\"integer\"},\"following\":{\"type\":\"integer\"},\"html_url\":{\"format\":\"uri\",\"type\":\"string\"},\"id\":{\"description\":\"The user's unique identifier\",\"type\":\"integer\"},\"location\":{\"nullable\":true,\"type\":\"string\"},\"login\":{\"description\":\"The user's GitHub username\",\"type\":\"string\"},\"name\":{\"nullable\":true,\"type\":\"string\"},\"node_id\":{\"type\":\"string\"},\"public_gists\":{\"type\":\"integer\"},\"public_repos\":{\"type\":\"integer\"},\"type\":{\"enum\":[\"User\",\"Organization\"],\"type\":\"string\"},\"updated_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"url\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"body\":{\"nullable\":true,\"type\":\"string\"},\"closed_at\":{\"format\":\"date-time\",\"nullable\":true,\"type\":\"string\"},\"comments\":{\"type\":\"integer\"},\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"html_url\":{\"format\":\"uri\",\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"labels\":{\"items\":{\"properties\":{\"color\":{\"type\":\"string\"},\"default\":{\"type\":\"boolean\"},\"description\":{\"nullable\":true,\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"},\"node_id\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"milestone\":{\"nullable\":true,\"type\":\"object\"},\"node_id\":{\"type\":\"string\"},\"number\":{\"description\":\"The issue number\",\"type\":\"integer\"},\"state\":{\"enum\":[\"open\",\"closed\"],\"type\":\"string\"},\"title\":{\"description\":\"The issue title\",\"type\":\"string\"},\"updated_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"url\":{\"format\":\"uri\",\"type\":\"string\"},\"user\":{\"properties\":{\"avatar_url\":{\"description\":\"URL to the user's avatar image\",\"format\":\"uri\",\"type\":\"string\"},\"bio\":{\"nullable\":true,\"type\":\"string\"},\"blog\":{\"nullable\":true,\"type\":\"string\"},\"company\":{\"nullable\":true,\"type\":\"string\"},\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"email\":{\"format\":\"email\",\"nullable\":true,\"type\":\"string\"},\"followers\":{\"type\":\"integer\"},\"following\":{\"type\":\"integer\"},\"html_url\":{\"format\":\"uri\",\"type\":\"string\"},\"id\":{\"description\":\"The user's unique identifier\",\"type\":\"integer\"},\"location\":{\"nullable\":true,\"type\":\"string\"},\"login\":{\"description\":\"The user's GitHub username\",\"type\":\"string\"},\"name\":{\"nullable\":true,\"type\":\"string\"},\"node_id\":{\"type\":\"string\"},\"public_gists\":{\"type\":\"integer\"},\"public_repos\":{\"type\":\"integer\"},\"type\":{\"enum\":[\"User\",\"Organization\"],\"type\":\"string\"},\"updated_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"url\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"},\"type\":\"array\"},\"total_count\":{\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"security\":[{\"BearerAuth\":[]},{\"BasicAuth\":[]},{\"OAuth2\":[]}],\"securitySchemes\":{\"BasicAuth\":{\"description\":\"Username and password authentication\",\"scheme\":\"basic\",\"type\":\"http\"},\"BearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"Personal access token or OAuth token\",\"scheme\":\"bearer\",\"type\":\"http\"},\"OAuth2\":{\"flows\":{\"authorizationCode\":{\"authorizationUrl\":\"https://github.com/login/oauth/authorize\",\"scopes\":{\"gist\":\"Create gists\",\"notifications\":\"Access notifications\",\"public_repo\":\"Access public repositories\",\"read:org\":\"Read org and team membership\",\"read:user\":\"Read all user profile data\",\"repo\":\"Full control of private repositories\",\"user\":\"Update all user data\",\"user:email\":\"Access user email addresses\",\"workflow\":\"Update GitHub Action workflows\"},\"tokenUrl\":\"https://github.com/login/oauth/access_token\"}},\"type\":\"oauth2\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/search/issues","segments":[{"lit":"search"},{"lit":"issues"}],"select":{"$action":"issue","exist":["order","page","per_page","q","sort"]},"transform":{"req":"`reqdata`","res":"`body.items`"},"index$":0},{"active":true,"args":{"query":[{"active":true,"example":"desc","kind":"query","name":"order","orig":"order","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":1,"kind":"query","name":"page","orig":"page","reqd":false,"type":"`$INTEGER`","index$":1},{"active":true,"example":30,"kind":"query","name":"per_page","orig":"per_page","reqd":false,"type":"`$INTEGER`","index$":2},{"active":true,"kind":"query","name":"q","orig":"q","reqd":true,"type":"`$STRING`","index$":3},{"active":true,"kind":"query","name":"sort","orig":"sort","reqd":false,"type":"`$STRING`","index$":4}]},"contract":{"id":"GET /search/repositories","json":"{\"operationId\":\"searchRepositories\",\"parameters\":[{\"description\":\"The query contains one or more search keywords and qualifiers\",\"in\":\"query\",\"name\":\"q\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Sorts the results of your query\",\"in\":\"query\",\"name\":\"sort\",\"schema\":{\"enum\":[\"stars\",\"forks\",\"help-wanted-issues\",\"updated\"],\"type\":\"string\"}},{\"description\":\"Determines whether the first search result returned is the highest or lowest number of matches\",\"in\":\"query\",\"name\":\"order\",\"schema\":{\"default\":\"desc\",\"enum\":[\"desc\",\"asc\"],\"type\":\"string\"}},{\"description\":\"The number of results per page\",\"in\":\"query\",\"name\":\"per_page\",\"schema\":{\"default\":30,\"maximum\":100,\"type\":\"integer\"}},{\"description\":\"Page number of the results to fetch\",\"in\":\"query\",\"name\":\"page\",\"schema\":{\"default\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"incomplete_results\":{\"type\":\"boolean\"},\"items\":{\"items\":{\"properties\":{\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"default_branch\":{\"type\":\"string\"},\"description\":{\"nullable\":true,\"type\":\"string\"},\"fork\":{\"type\":\"boolean\"},\"forks_count\":{\"type\":\"integer\"},\"full_name\":{\"description\":\"The full name including owner\",\"type\":\"string\"},\"html_url\":{\"format\":\"uri\",\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"language\":{\"nullable\":true,\"type\":\"string\"},\"name\":{\"description\":\"The name of the repository\",\"type\":\"string\"},\"node_id\":{\"type\":\"string\"},\"open_issues_count\":{\"type\":\"integer\"},\"owner\":{\"properties\":{\"avatar_url\":{\"description\":\"URL to the user's avatar image\",\"format\":\"uri\",\"type\":\"string\"},\"bio\":{\"nullable\":true,\"type\":\"string\"},\"blog\":{\"nullable\":true,\"type\":\"string\"},\"company\":{\"nullable\":true,\"type\":\"string\"},\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"email\":{\"format\":\"email\",\"nullable\":true,\"type\":\"string\"},\"followers\":{\"type\":\"integer\"},\"following\":{\"type\":\"integer\"},\"html_url\":{\"format\":\"uri\",\"type\":\"string\"},\"id\":{\"description\":\"The user's unique identifier\",\"type\":\"integer\"},\"location\":{\"nullable\":true,\"type\":\"string\"},\"login\":{\"description\":\"The user's GitHub username\",\"type\":\"string\"},\"name\":{\"nullable\":true,\"type\":\"string\"},\"node_id\":{\"type\":\"string\"},\"public_gists\":{\"type\":\"integer\"},\"public_repos\":{\"type\":\"integer\"},\"type\":{\"enum\":[\"User\",\"Organization\"],\"type\":\"string\"},\"updated_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"url\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"private\":{\"description\":\"Whether the repository is private\",\"type\":\"boolean\"},\"pushed_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"size\":{\"type\":\"integer\"},\"stargazers_count\":{\"type\":\"integer\"},\"updated_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"url\":{\"format\":\"uri\",\"type\":\"string\"},\"visibility\":{\"enum\":[\"public\",\"private\",\"internal\"],\"type\":\"string\"},\"watchers_count\":{\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"},\"total_count\":{\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"security\":[{\"BearerAuth\":[]},{\"BasicAuth\":[]},{\"OAuth2\":[]}],\"securitySchemes\":{\"BasicAuth\":{\"description\":\"Username and password authentication\",\"scheme\":\"basic\",\"type\":\"http\"},\"BearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"Personal access token or OAuth token\",\"scheme\":\"bearer\",\"type\":\"http\"},\"OAuth2\":{\"flows\":{\"authorizationCode\":{\"authorizationUrl\":\"https://github.com/login/oauth/authorize\",\"scopes\":{\"gist\":\"Create gists\",\"notifications\":\"Access notifications\",\"public_repo\":\"Access public repositories\",\"read:org\":\"Read org and team membership\",\"read:user\":\"Read all user profile data\",\"repo\":\"Full control of private repositories\",\"user\":\"Update all user data\",\"user:email\":\"Access user email addresses\",\"workflow\":\"Update GitHub Action workflows\"},\"tokenUrl\":\"https://github.com/login/oauth/access_token\"}},\"type\":\"oauth2\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/search/repositories","segments":[{"lit":"search"},{"lit":"repositories"}],"select":{"$action":"repository","exist":["order","page","per_page","q","sort"]},"transform":{"req":"`reqdata`","res":"`body.items`"},"index$":1}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"search","name__orig":"search","Name":"Search","name_":"search","name-":"search","NAME":"SEARCH","index$":9}, {"active":true,"entity":"search","key$":"BasicSearchFlow","kind":"basic","name":"BasicSearchFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"search_ref01"}}],"index$":0}]}, 'Search')
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
  
