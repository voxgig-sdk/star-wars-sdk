
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { StarWarsSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = StarWarsSDK.test()
    equal(testsdk instanceof StarWarsSDK, true,
      'StarWarsSDK.test() must return a client synchronously')
  })

})
