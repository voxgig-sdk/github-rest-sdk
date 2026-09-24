

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


describe('NotificationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GITHUB_REST_TEST_LIVE=TRUE.
  afterEach(liveDelay('GITHUB_REST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GithubRestSDK.test()
    const ent = testsdk.Notification()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GITHUB_REST_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'notification.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":0},"last_read_at":{"a":true,"fo":"date-time","h":"Last Read At","n":"last_read_at","r":false,"t":"`$STRING`","key$":"last_read_at","index$":1},"reason":{"a":true,"h":"Reason","n":"reason","r":false,"t":"`$STRING`","key$":"reason","index$":2},"repository":{"a":true,"h":"Repository","n":"repository","r":false,"t":"`$OBJECT`","key$":"repository","index$":3},"subject":{"a":true,"h":"Subject","n":"subject","r":false,"t":"`$OBJECT`","key$":"subject","index$":4},"unread":{"a":true,"h":"Unread","n":"unread","r":false,"t":"`$BOOLEAN`","key$":"unread","index$":5},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":false,"t":"`$STRING`","key$":"updated_at","index$":6},"url":{"a":true,"fo":"uri","h":"Url","n":"url","r":false,"t":"`$STRING`","key$":"url","index$":7}},"id":{"field":"id","name":"id"},"name":"notification","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /notifications","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":false,"k":"query","n":"all","or":"all","r":false,"t":"`$BOOLEAN`","index$":0},{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":false,"k":"query","n":"participating","or":"participating","r":false,"t":"`$BOOLEAN`","index$":2},{"a":true,"ex":30,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":3}]},"k":"http","m":"GET","o":"/notifications","q":{"exist":["all","page","participating","per_page"]},"r":{},"s":[{"lit":"notifications"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"notification","name__orig":"notification","Name":"Notification","name_":"notification","name-":"notification","NAME":"NOTIFICATION","index$":4}, {"active":true,"entity":"notification","key$":"BasicNotificationFlow","kind":"basic","name":"BasicNotificationFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"notification_ref01"}}],"index$":0}]}, 'Notification', {"GET /notifications":{"protocol":"http","operationId":"listNotifications","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"id":{"type":"string","key$":"id"},"unread":{"type":"boolean","key$":"unread"},"reason":{"type":"string","key$":"reason"},"updated_at":{"type":"string","format":"date-time","key$":"updated_at"},"last_read_at":{"type":"string","format":"date-time","nullable":true,"key$":"last_read_at"},"subject":{"type":"object","properties":{"title":{"type":"string"},"url":{"type":"string","format":"uri"},"type":{"type":"string"}},"key$":"subject"},"repository":{"type":"object","properties":{"id":{"type":"integer","key$":"id"},"node_id":{"type":"string","key$":"node_id"},"name":{"description":"The name of the repository","type":"string","key$":"name"},"full_name":{"description":"The full name including owner","type":"string","key$":"full_name"},"owner":{"properties":{"avatar_url":{"description":"URL to the user's avatar image","format":"uri","type":"string","key$":"avatar_url"},"bio":{"nullable":true,"type":"string","key$":"bio"},"blog":{"nullable":true,"type":"string","key$":"blog"},"company":{"nullable":true,"type":"string","key$":"company"},"created_at":{"format":"date-time","type":"string","key$":"created_at"},"email":{"format":"email","nullable":true,"type":"string","key$":"email"},"followers":{"type":"integer","key$":"followers"},"following":{"type":"integer","key$":"following"},"html_url":{"format":"uri","type":"string","key$":"html_url"},"id":{"description":"The user's unique identifier","type":"integer","key$":"id"},"location":{"nullable":true,"type":"string","key$":"location"},"login":{"description":"The user's GitHub username","type":"string","key$":"login"},"name":{"nullable":true,"type":"string","key$":"name"},"node_id":{"type":"string","key$":"node_id"},"public_gists":{"type":"integer","key$":"public_gists"},"public_repos":{"type":"integer","key$":"public_repos"},"type":{"enum":["User","Organization"],"type":"string","key$":"type"},"updated_at":{"format":"date-time","type":"string","key$":"updated_at"},"url":{"format":"uri","type":"string","key$":"url"}},"type":"object","x-ref":"#/components/schemas/User","index$":0,"key$":"owner"},"private":{"description":"Whether the repository is private","type":"boolean","key$":"private"},"html_url":{"format":"uri","type":"string","key$":"html_url"},"description":{"nullable":true,"type":"string","key$":"description"},"fork":{"type":"boolean","key$":"fork"},"url":{"format":"uri","type":"string","key$":"url"},"created_at":{"format":"date-time","type":"string","key$":"created_at"},"updated_at":{"format":"date-time","type":"string","key$":"updated_at"},"pushed_at":{"format":"date-time","type":"string","key$":"pushed_at"},"size":{"type":"integer","key$":"size"},"stargazers_count":{"type":"integer","key$":"stargazers_count"},"watchers_count":{"type":"integer","key$":"watchers_count"},"language":{"nullable":true,"type":"string","key$":"language"},"forks_count":{"type":"integer","key$":"forks_count"},"open_issues_count":{"type":"integer","key$":"open_issues_count"},"default_branch":{"type":"string","key$":"default_branch"},"visibility":{"enum":["public","private","internal"],"type":"string","key$":"visibility"}},"x-ref":"#/components/schemas/Repository","key$":"repository"},"url":{"type":"string","format":"uri","key$":"url"}},"x-ref":"#/components/schemas/Notification","index$":0}}}}},"401":{"description":"Requires authentication","content":{"application/json":{"schema":{"type":"object","properties":{"message":{"type":"string","description":"Error message"},"documentation_url":{"type":"string","format":"uri","description":"URL to documentation about this error"}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/Unauthorized"}},"parameters":[{"name":"all","in":"query","description":"If true, show notifications marked as read","schema":{"type":"boolean","default":false},"index$":0},{"name":"participating","in":"query","description":"If true, only shows notifications in which the user is directly participating or mentioned","schema":{"type":"boolean","default":false},"index$":1},{"name":"per_page","in":"query","description":"The number of results per page","schema":{"type":"integer","default":30,"maximum":100},"index$":2},{"name":"page","in":"query","description":"Page number of the results to fetch","schema":{"type":"integer","default":1},"index$":3}],"security":[{"BearerAuth":[]}],"securitySource":"operation","securitySchemes":{"BearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"JWT","description":"Personal access token or OAuth token"},"BasicAuth":{"type":"http","scheme":"basic","description":"Username and password authentication"},"OAuth2":{"type":"oauth2","flows":{"authorizationCode":{"authorizationUrl":"https://github.com/login/oauth/authorize","tokenUrl":"https://github.com/login/oauth/access_token","scopes":{"repo":"Full control of private repositories","public_repo":"Access public repositories","user":"Update all user data","read:user":"Read all user profile data","user:email":"Access user email addresses","gist":"Create gists","notifications":"Access notifications","read:org":"Read org and team membership","workflow":"Update GitHub Action workflows"}}}}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let notification_ref01_data = Object.values(setup.data.existing.notification)[0] as any

    // LIST
    const notification_ref01_ent = client.Notification()
    const notification_ref01_match: any = {}

    const notification_ref01_list = (await notification_ref01_ent.list(notification_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/notification/NotificationTestData.json')

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
    ['notification01','notification02','notification03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GITHUB_REST_TEST_NOTIFICATION_ENTID': idmap,
    'GITHUB_REST_TEST_LIVE': 'FALSE',
    'GITHUB_REST_TEST_EXPLAIN': 'FALSE',
    'GITHUB_REST_APIKEY': '',
  })

  idmap = env['GITHUB_REST_TEST_NOTIFICATION_ENTID']

  const live = 'TRUE' === env.GITHUB_REST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GITHUB_REST_TEST_NOTIFICATION_ENTID']
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
  
