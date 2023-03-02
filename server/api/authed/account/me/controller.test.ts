import { mockAccount } from '$/mocks'
import fastify from 'fastify'
import controller from './controller'

describe('GET /authed/account/me', () => {
  test('自身のアカウント情報が取得できる', async () => {
    const controller_ = controller(fastify())

    const account = mockAccount()
    const res = controller_.get({
      account,
    })

    expect(res.body).toMatchObject(account)
    expect(res.status).toBe(200)
  })
})
