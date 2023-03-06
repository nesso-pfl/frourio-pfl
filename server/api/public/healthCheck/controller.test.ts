import fastify from 'fastify'
import controller from './controller'

describe('GET /public/healthCheck', () => {
  test('OK という文字列と 200 レスポンスを返す', () => {
    const controller_ = controller(fastify())

    const res = controller_.get()
    expect(res.body).toBe('OK')
    expect(res.status).toBe(200)
  })
})
