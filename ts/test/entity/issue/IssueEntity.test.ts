
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { GithubRestSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


describe('IssueEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GITHUBREST_TEST_LIVE=TRUE.
  afterEach(liveDelay('GITHUBREST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GithubRestSDK.test()
    const ent = testsdk.Issue()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GITHUB_REST_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load']) {
      if (maybeSkipControl(t, 'entityOp', 'issue.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set GITHUB_REST_TEST_ISSUE_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const issue_ref01_ent = client.Issue()
    let issue_ref01_data = setup.data.new.issue['issue_ref01']
    issue_ref01_data['owner'] = setup.idmap['owner01']
    issue_ref01_data['repo'] = setup.idmap['repo01']

    issue_ref01_data = await issue_ref01_ent.create(issue_ref01_data)
    assert(null != issue_ref01_data.id)


    // LIST
    const issue_ref01_match: any = {}
    issue_ref01_match['owner'] = setup.idmap['owner01']
    issue_ref01_match['repo'] = setup.idmap['repo01']

    const issue_ref01_list = await issue_ref01_ent.list(issue_ref01_match)

    assert(!isempty(select(issue_ref01_list, { id: issue_ref01_data.id })))


    // UPDATE
    const issue_ref01_data_up0: any = {}
    issue_ref01_data_up0.id = issue_ref01_data.id
    issue_ref01_data_up0 ['owner'] = setup.idmap['owner']
    issue_ref01_data_up0 ['repo'] = setup.idmap['repo']

    const issue_ref01_markdef_up0 = { name: 'body', value: 'Mark01-issue_ref01_' + setup.now }
    issue_ref01_data_up0 [issue_ref01_markdef_up0.name] = issue_ref01_markdef_up0.value

    const issue_ref01_resdata_up0 = await issue_ref01_ent.update(issue_ref01_data_up0)
    assert(issue_ref01_resdata_up0.id === issue_ref01_data_up0.id)

    assert(issue_ref01_resdata_up0[issue_ref01_markdef_up0.name] === issue_ref01_markdef_up0.value)


    // LOAD
    const issue_ref01_match_dt0: any = {}
    issue_ref01_match_dt0.id = issue_ref01_data.id
    const issue_ref01_data_dt0 = await issue_ref01_ent.load(issue_ref01_match_dt0)
    assert(issue_ref01_data_dt0.id === issue_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/issue/IssueTestData.json')

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
    ['issue01','issue02','issue03','repo01','repo02','repo03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['GITHUB_REST_TEST_ISSUE_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'GITHUB_REST_TEST_ISSUE_ENTID': idmap,
    'GITHUB_REST_TEST_LIVE': 'FALSE',
    'GITHUB_REST_TEST_EXPLAIN': 'FALSE',
    'GITHUB_REST_APIKEY': 'NONE',
  })

  idmap = env['GITHUB_REST_TEST_ISSUE_ENTID']

  const live = 'TRUE' === env.GITHUB_REST_TEST_LIVE

  if (live) {
    client = new GithubRestSDK(merge([
      {
        apikey: env.GITHUB_REST_APIKEY,
      },
      extra
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
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
