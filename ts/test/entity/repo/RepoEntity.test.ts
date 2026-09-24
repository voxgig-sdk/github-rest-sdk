

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


describe('RepoEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GITHUB_REST_TEST_LIVE=TRUE.
  afterEach(liveDelay('GITHUB_REST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GithubRestSDK.test()
    const ent = testsdk.Repo()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GITHUB_REST_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'repo.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{"github-rest_id":"id"}},"fields":{"avatar_url":{"a":true,"fo":"uri","h":"Avatar Url","n":"avatar_url","r":false,"sh":"URL to the user's avatar image","t":"`$STRING`","key$":"avatar_url","index$":0},"bio":{"a":true,"h":"Bio","n":"bio","r":false,"t":"`$STRING`","key$":"bio","index$":1},"blog":{"a":true,"h":"Blog","n":"blog","r":false,"t":"`$STRING`","key$":"blog","index$":2},"company":{"a":true,"h":"Company","n":"company","r":false,"t":"`$STRING`","key$":"company","index$":3},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":false,"t":"`$STRING`","key$":"created_at","index$":4},"default_branch":{"a":true,"h":"Default Branch","n":"default_branch","r":false,"t":"`$STRING`","key$":"default_branch","index$":5},"description":{"a":true,"h":"Description","n":"description","r":false,"t":"`$STRING`","key$":"description","index$":6},"email":{"a":true,"fo":"email","h":"Email","n":"email","r":false,"t":"`$STRING`","key$":"email","index$":7},"followers":{"a":true,"h":"Followers","n":"followers","r":false,"t":"`$INTEGER`","key$":"followers","index$":8},"following":{"a":true,"h":"Following","n":"following","r":false,"t":"`$INTEGER`","key$":"following","index$":9},"fork":{"a":true,"h":"Fork","n":"fork","r":false,"t":"`$BOOLEAN`","key$":"fork","index$":10},"forks_count":{"a":true,"h":"Forks Count","n":"forks_count","r":false,"t":"`$INTEGER`","key$":"forks_count","index$":11},"full_name":{"a":true,"h":"Full Name","n":"full_name","r":false,"sh":"The full name including owner","t":"`$STRING`","key$":"full_name","index$":12},"github-rest_id":{"a":true,"h":"Github Rest Id","n":"github-rest_id","r":false,"sh":"The user's unique identifier","t":"`$INTEGER`","key$":"github-rest_id","index$":13},"html_url":{"a":true,"fo":"uri","h":"Html Url","n":"html_url","r":false,"t":"`$STRING`","key$":"html_url","index$":14},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"The user's unique identifier","t":"`$STRING`","key$":"id","index$":15},"language":{"a":true,"h":"Language","n":"language","r":false,"t":"`$STRING`","key$":"language","index$":16},"location":{"a":true,"h":"Location","n":"location","r":false,"t":"`$STRING`","key$":"location","index$":17},"login":{"a":true,"h":"Login","n":"login","r":false,"sh":"The user's GitHub username","t":"`$STRING`","key$":"login","index$":18},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"The name of the repository","t":"`$STRING`","key$":"name","index$":19},"node_id":{"a":true,"h":"Node Id","n":"node_id","r":false,"t":"`$STRING`","key$":"node_id","index$":20},"open_issues_count":{"a":true,"h":"Open Issues Count","n":"open_issues_count","r":false,"t":"`$INTEGER`","key$":"open_issues_count","index$":21},"owner":{"a":true,"h":"Owner","n":"owner","r":false,"t":"`$OBJECT`","key$":"owner","index$":22},"private":{"a":true,"h":"Private","n":"private","r":false,"sh":"Whether the repository is private","t":"`$BOOLEAN`","key$":"private","index$":23},"public_gists":{"a":true,"h":"Public Gists","n":"public_gists","r":false,"t":"`$INTEGER`","key$":"public_gists","index$":24},"public_repos":{"a":true,"h":"Public Repos","n":"public_repos","r":false,"t":"`$INTEGER`","key$":"public_repos","index$":25},"pushed_at":{"a":true,"fo":"date-time","h":"Pushed At","n":"pushed_at","r":false,"t":"`$STRING`","key$":"pushed_at","index$":26},"size":{"a":true,"h":"Size","n":"size","r":false,"t":"`$INTEGER`","key$":"size","index$":27},"stargazers_count":{"a":true,"h":"Stargazers Count","n":"stargazers_count","r":false,"t":"`$INTEGER`","key$":"stargazers_count","index$":28},"type":{"a":true,"h":"Type","n":"type","r":false,"t":"`$STRING`","key$":"type","index$":29},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":false,"t":"`$STRING`","key$":"updated_at","index$":30},"url":{"a":true,"fo":"uri","h":"Url","n":"url","r":false,"t":"`$STRING`","key$":"url","index$":31},"visibility":{"a":true,"h":"Visibility","n":"visibility","r":false,"t":"`$STRING`","key$":"visibility","index$":32},"watchers_count":{"a":true,"h":"Watchers Count","n":"watchers_count","r":false,"t":"`$INTEGER`","key$":"watchers_count","index$":33}},"id":{"field":"id","from":{"owner":"owner.login","repo":"name"},"name":"id","parts":["owner","repo"],"sep":"/"},"name":"repo","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /users/{username}/repos","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"username","or":"username","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":"asc","k":"query","n":"direction","or":"direction","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":30,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"ex":"full_name","k":"query","n":"sort","or":"sort","r":false,"t":"`$STRING`","index$":3},{"a":true,"ex":"owner","k":"query","n":"type","or":"type","r":false,"t":"`$STRING`","index$":4}]},"k":"http","m":"GET","o":"/users/{username}/repos","q":{"exist":["direction","page","per_page","sort","type","username"]},"r":{},"s":[{"lit":"users"},{"var":"username"},{"lit":"repos"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /orgs/{org}/repos","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"org_id","or":"org","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":30,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":"all","k":"query","n":"type","or":"type","r":false,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/orgs/{org}/repos","q":{"exist":["org_id","page","per_page","type"]},"r":{"param":{"org":"org_id"}},"s":[{"lit":"orgs"},{"var":"org_id"},{"lit":"repos"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /repos/{owner}/{repo}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"owner","or":"owner","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"repo","or":"repo","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/repos/{owner}/{repo}","q":{"exist":["owner","repo"]},"r":{},"s":[{"lit":"repos"},{"var":"owner"},{"var":"repo"}],"t":{"req":"`reqdata`","res":"`body.owner`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.org"],["$.main.kit.entity.user"]]},"key$":"repo","name__orig":"repo","Name":"Repo","name_":"repo","name-":"repo","NAME":"REPO","index$":8}, {"active":true,"entity":"repo","key$":"BasicRepoFlow","kind":"basic","name":"BasicRepoFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"org_id":"org01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"repo_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"repo_ref01","srcdatavar":"repo_ref01_data","suffix":"_dt0"},"m":{"id":"repo01","owner":"owner01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-repo_ref01"}}],"index$":1}]}, 'Repo', {"GET /users/{username}/repos":{"protocol":"http","operationId":"listUserRepos","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","key$":"id"},"node_id":{"type":"string","key$":"node_id"},"name":{"description":"The name of the repository","type":"string","key$":"name"},"full_name":{"description":"The full name including owner","type":"string","key$":"full_name"},"owner":{"properties":{"avatar_url":{"description":"URL to the user's avatar image","format":"uri","type":"string","key$":"avatar_url"},"bio":{"nullable":true,"type":"string","key$":"bio"},"blog":{"nullable":true,"type":"string","key$":"blog"},"company":{"nullable":true,"type":"string","key$":"company"},"created_at":{"format":"date-time","type":"string","key$":"created_at"},"email":{"format":"email","nullable":true,"type":"string","key$":"email"},"followers":{"type":"integer","key$":"followers"},"following":{"type":"integer","key$":"following"},"html_url":{"format":"uri","type":"string","key$":"html_url"},"id":{"description":"The user's unique identifier","type":"integer","key$":"id"},"location":{"nullable":true,"type":"string","key$":"location"},"login":{"description":"The user's GitHub username","type":"string","key$":"login"},"name":{"nullable":true,"type":"string","key$":"name"},"node_id":{"type":"string","key$":"node_id"},"public_gists":{"type":"integer","key$":"public_gists"},"public_repos":{"type":"integer","key$":"public_repos"},"type":{"enum":["User","Organization"],"type":"string","key$":"type"},"updated_at":{"format":"date-time","type":"string","key$":"updated_at"},"url":{"format":"uri","type":"string","key$":"url"}},"type":"object","x-ref":"#/components/schemas/User","index$":0,"key$":"owner"},"private":{"description":"Whether the repository is private","type":"boolean","key$":"private"},"html_url":{"format":"uri","type":"string","key$":"html_url"},"description":{"nullable":true,"type":"string","key$":"description"},"fork":{"type":"boolean","key$":"fork"},"url":{"format":"uri","type":"string","key$":"url"},"created_at":{"format":"date-time","type":"string","key$":"created_at"},"updated_at":{"format":"date-time","type":"string","key$":"updated_at"},"pushed_at":{"format":"date-time","type":"string","key$":"pushed_at"},"size":{"type":"integer","key$":"size"},"stargazers_count":{"type":"integer","key$":"stargazers_count"},"watchers_count":{"type":"integer","key$":"watchers_count"},"language":{"nullable":true,"type":"string","key$":"language"},"forks_count":{"type":"integer","key$":"forks_count"},"open_issues_count":{"type":"integer","key$":"open_issues_count"},"default_branch":{"type":"string","key$":"default_branch"},"visibility":{"enum":["public","private","internal"],"type":"string","key$":"visibility"}},"x-ref":"#/components/schemas/Repository","index$":0}}}}},"404":{"description":"Resource not found","content":{"application/json":{"schema":{"type":"object","properties":{"message":{"type":"string","description":"Error message"},"documentation_url":{"type":"string","format":"uri","description":"URL to documentation about this error"}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/NotFound"}},"parameters":[{"name":"username","in":"path","required":true,"description":"The handle for the GitHub user account","schema":{"type":"string"},"index$":0},{"name":"type","in":"query","description":"Limit results to repositories of the specified type","schema":{"type":"string","enum":["all","owner","member"],"default":"owner"},"index$":1},{"name":"sort","in":"query","description":"The property to sort the results by","schema":{"type":"string","enum":["created","updated","pushed","full_name"],"default":"full_name"},"index$":2},{"name":"direction","in":"query","description":"The order to sort by","schema":{"type":"string","enum":["asc","desc"],"default":"asc"},"index$":3},{"name":"per_page","in":"query","description":"The number of results per page","schema":{"type":"integer","default":30,"maximum":100},"index$":4},{"name":"page","in":"query","description":"Page number of the results to fetch","schema":{"type":"integer","default":1},"index$":5}],"security":[{"BearerAuth":[]},{"BasicAuth":[]},{"OAuth2":[]}],"securitySource":"definition","securitySchemes":{"BearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"JWT","description":"Personal access token or OAuth token"},"BasicAuth":{"type":"http","scheme":"basic","description":"Username and password authentication"},"OAuth2":{"type":"oauth2","flows":{"authorizationCode":{"authorizationUrl":"https://github.com/login/oauth/authorize","tokenUrl":"https://github.com/login/oauth/access_token","scopes":{"repo":"Full control of private repositories","public_repo":"Access public repositories","user":"Update all user data","read:user":"Read all user profile data","user:email":"Access user email addresses","gist":"Create gists","notifications":"Access notifications","read:org":"Read org and team membership","workflow":"Update GitHub Action workflows"}}}}}},"GET /orgs/{org}/repos":{"protocol":"http","operationId":"listOrgRepos","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","key$":"id"},"node_id":{"type":"string","key$":"node_id"},"name":{"description":"The name of the repository","type":"string","key$":"name"},"full_name":{"description":"The full name including owner","type":"string","key$":"full_name"},"owner":{"properties":{"avatar_url":{"description":"URL to the user's avatar image","format":"uri","type":"string","key$":"avatar_url"},"bio":{"nullable":true,"type":"string","key$":"bio"},"blog":{"nullable":true,"type":"string","key$":"blog"},"company":{"nullable":true,"type":"string","key$":"company"},"created_at":{"format":"date-time","type":"string","key$":"created_at"},"email":{"format":"email","nullable":true,"type":"string","key$":"email"},"followers":{"type":"integer","key$":"followers"},"following":{"type":"integer","key$":"following"},"html_url":{"format":"uri","type":"string","key$":"html_url"},"id":{"description":"The user's unique identifier","type":"integer","key$":"id"},"location":{"nullable":true,"type":"string","key$":"location"},"login":{"description":"The user's GitHub username","type":"string","key$":"login"},"name":{"nullable":true,"type":"string","key$":"name"},"node_id":{"type":"string","key$":"node_id"},"public_gists":{"type":"integer","key$":"public_gists"},"public_repos":{"type":"integer","key$":"public_repos"},"type":{"enum":["User","Organization"],"type":"string","key$":"type"},"updated_at":{"format":"date-time","type":"string","key$":"updated_at"},"url":{"format":"uri","type":"string","key$":"url"}},"type":"object","x-ref":"#/components/schemas/User","index$":0,"key$":"owner"},"private":{"description":"Whether the repository is private","type":"boolean","key$":"private"},"html_url":{"format":"uri","type":"string","key$":"html_url"},"description":{"nullable":true,"type":"string","key$":"description"},"fork":{"type":"boolean","key$":"fork"},"url":{"format":"uri","type":"string","key$":"url"},"created_at":{"format":"date-time","type":"string","key$":"created_at"},"updated_at":{"format":"date-time","type":"string","key$":"updated_at"},"pushed_at":{"format":"date-time","type":"string","key$":"pushed_at"},"size":{"type":"integer","key$":"size"},"stargazers_count":{"type":"integer","key$":"stargazers_count"},"watchers_count":{"type":"integer","key$":"watchers_count"},"language":{"nullable":true,"type":"string","key$":"language"},"forks_count":{"type":"integer","key$":"forks_count"},"open_issues_count":{"type":"integer","key$":"open_issues_count"},"default_branch":{"type":"string","key$":"default_branch"},"visibility":{"enum":["public","private","internal"],"type":"string","key$":"visibility"}},"x-ref":"#/components/schemas/Repository","index$":0}}}}},"404":{"description":"Resource not found","content":{"application/json":{"schema":{"type":"object","properties":{"message":{"type":"string","description":"Error message"},"documentation_url":{"type":"string","format":"uri","description":"URL to documentation about this error"}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/NotFound"}},"parameters":[{"name":"org","in":"path","required":true,"description":"The organization name","schema":{"type":"string"},"index$":0},{"name":"type","in":"query","description":"Specifies the types of repositories you want returned","schema":{"type":"string","enum":["all","public","private","forks","sources","member"],"default":"all"},"index$":1},{"name":"per_page","in":"query","description":"The number of results per page","schema":{"type":"integer","default":30,"maximum":100},"index$":2},{"name":"page","in":"query","description":"Page number of the results to fetch","schema":{"type":"integer","default":1},"index$":3}],"security":[{"BearerAuth":[]},{"BasicAuth":[]},{"OAuth2":[]}],"securitySource":"definition","securitySchemes":{"BearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"JWT","description":"Personal access token or OAuth token"},"BasicAuth":{"type":"http","scheme":"basic","description":"Username and password authentication"},"OAuth2":{"type":"oauth2","flows":{"authorizationCode":{"authorizationUrl":"https://github.com/login/oauth/authorize","tokenUrl":"https://github.com/login/oauth/access_token","scopes":{"repo":"Full control of private repositories","public_repo":"Access public repositories","user":"Update all user data","read:user":"Read all user profile data","user:email":"Access user email addresses","gist":"Create gists","notifications":"Access notifications","read:org":"Read org and team membership","workflow":"Update GitHub Action workflows"}}}}}},"GET /repos/{owner}/{repo}":{"protocol":"http","operationId":"getRepository","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"type":"integer","key$":"id"},"node_id":{"type":"string","key$":"node_id"},"name":{"description":"The name of the repository","type":"string","key$":"name"},"full_name":{"description":"The full name including owner","type":"string","key$":"full_name"},"owner":{"properties":{"avatar_url":{"description":"URL to the user's avatar image","format":"uri","type":"string","key$":"avatar_url"},"bio":{"nullable":true,"type":"string","key$":"bio"},"blog":{"nullable":true,"type":"string","key$":"blog"},"company":{"nullable":true,"type":"string","key$":"company"},"created_at":{"format":"date-time","type":"string","key$":"created_at"},"email":{"format":"email","nullable":true,"type":"string","key$":"email"},"followers":{"type":"integer","key$":"followers"},"following":{"type":"integer","key$":"following"},"html_url":{"format":"uri","type":"string","key$":"html_url"},"id":{"description":"The user's unique identifier","type":"integer","key$":"id"},"location":{"nullable":true,"type":"string","key$":"location"},"login":{"description":"The user's GitHub username","type":"string","key$":"login"},"name":{"nullable":true,"type":"string","key$":"name"},"node_id":{"type":"string","key$":"node_id"},"public_gists":{"type":"integer","key$":"public_gists"},"public_repos":{"type":"integer","key$":"public_repos"},"type":{"enum":["User","Organization"],"type":"string","key$":"type"},"updated_at":{"format":"date-time","type":"string","key$":"updated_at"},"url":{"format":"uri","type":"string","key$":"url"}},"type":"object","x-ref":"#/components/schemas/User","index$":0,"key$":"owner"},"private":{"description":"Whether the repository is private","type":"boolean","key$":"private"},"html_url":{"format":"uri","type":"string","key$":"html_url"},"description":{"nullable":true,"type":"string","key$":"description"},"fork":{"type":"boolean","key$":"fork"},"url":{"format":"uri","type":"string","key$":"url"},"created_at":{"format":"date-time","type":"string","key$":"created_at"},"updated_at":{"format":"date-time","type":"string","key$":"updated_at"},"pushed_at":{"format":"date-time","type":"string","key$":"pushed_at"},"size":{"type":"integer","key$":"size"},"stargazers_count":{"type":"integer","key$":"stargazers_count"},"watchers_count":{"type":"integer","key$":"watchers_count"},"language":{"nullable":true,"type":"string","key$":"language"},"forks_count":{"type":"integer","key$":"forks_count"},"open_issues_count":{"type":"integer","key$":"open_issues_count"},"default_branch":{"type":"string","key$":"default_branch"},"visibility":{"enum":["public","private","internal"],"type":"string","key$":"visibility"}},"x-ref":"#/components/schemas/Repository"}}}},"404":{"description":"Resource not found","content":{"application/json":{"schema":{"type":"object","properties":{"message":{"type":"string","description":"Error message"},"documentation_url":{"type":"string","format":"uri","description":"URL to documentation about this error"}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/NotFound"}},"parameters":[{"name":"owner","in":"path","required":true,"description":"The account owner of the repository. The name is not case sensitive.","schema":{"type":"string"},"x-ref":"#/components/parameters/owner","index$":0},{"name":"repo","in":"path","required":true,"description":"The name of the repository. The name is not case sensitive.","schema":{"type":"string"},"x-ref":"#/components/parameters/repo","index$":1}],"security":[{"BearerAuth":[]},{"BasicAuth":[]},{"OAuth2":[]}],"securitySource":"definition","securitySchemes":{"BearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"JWT","description":"Personal access token or OAuth token"},"BasicAuth":{"type":"http","scheme":"basic","description":"Username and password authentication"},"OAuth2":{"type":"oauth2","flows":{"authorizationCode":{"authorizationUrl":"https://github.com/login/oauth/authorize","tokenUrl":"https://github.com/login/oauth/access_token","scopes":{"repo":"Full control of private repositories","public_repo":"Access public repositories","user":"Update all user data","read:user":"Read all user profile data","user:email":"Access user email addresses","gist":"Create gists","notifications":"Access notifications","read:org":"Read org and team membership","workflow":"Update GitHub Action workflows"}}}}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let repo_ref01_data = Object.values(setup.data.existing.repo)[0] as any

    // LIST
    const repo_ref01_ent = client.Repo()
    const repo_ref01_match: any = {}
    repo_ref01_match['org_id'] = setup.idmap['org01']

    const repo_ref01_list = (await repo_ref01_ent.list(repo_ref01_match)).map((e: any) => e.data())


    // LOAD
    const repo_ref01_match_dt0: any = {}
    repo_ref01_match_dt0.id = repo_ref01_data.id
    const repo_ref01_data_dt0 = (await repo_ref01_ent.load(repo_ref01_match_dt0)).data()
    assert(repo_ref01_data_dt0.id === repo_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/repo/RepoTestData.json')

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
    ['repo01','repo02','repo03','org01','org02','org03','user01','user02','user03','owner01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GITHUB_REST_TEST_REPO_ENTID': idmap,
    'GITHUB_REST_TEST_LIVE': 'FALSE',
    'GITHUB_REST_TEST_EXPLAIN': 'FALSE',
    'GITHUB_REST_APIKEY': '',
  })

  idmap = env['GITHUB_REST_TEST_REPO_ENTID']

  const live = 'TRUE' === env.GITHUB_REST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GITHUB_REST_TEST_REPO_ENTID']
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
  
