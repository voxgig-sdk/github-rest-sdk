
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { GithubRestSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await GithubRestSDK.test()
    equal(null !== testsdk, true)
  })

})
