
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { GithubRestSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = GithubRestSDK.test()
    equal(testsdk instanceof GithubRestSDK, true,
      'GithubRestSDK.test() must return a client synchronously')
  })

})
