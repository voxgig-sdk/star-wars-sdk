
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { StarWarsSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await StarWarsSDK.test()
    equal(null !== testsdk, true)
  })

})
