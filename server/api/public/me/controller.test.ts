import fastify from 'fastify'
import controller from './controller'

describe('GET /public/me', () => {
  test('自身のアカウント情報が取得できる', async () => {
    const controller_ = controller(fastify())

    const res = controller_.get({
      account: { firebaseUid: 'firebaseUid', email: 'test@test.test', emailVerified: true },
    })

    expect(res.status).toBe(200)
  })
})
