import fastify from 'fastify'
import controller from './controller'

describe('POST /public/login', () => {
  test('204 を返す', async () => {
    const controller_ = controller(fastify())

    const res = controller_.post()

    expect(res.status).toBe(204)
  })
})
