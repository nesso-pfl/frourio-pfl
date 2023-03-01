import dotenv from 'dotenv'
import Fastify, { FastifyInstance } from 'fastify'
import cors from '@fastify/cors'
import aspida from '@aspida/axios'
import api from '$/api/$api'
import { render } from '@/test/testUtils'
import Register from '@/src/pages/register'
import { submitForm, validInput } from '@/src/features/account/RegisterForm.test-input'
import mockRouter from 'next-router-mock'
import { pagesPath } from '@/src/utils/$path'

dotenv.config({ path: 'server/.env' })
jest.mock('next/router', () => require('next-router-mock'))

const apiClient = api(aspida(undefined, { baseURL: process.env.API_BASE_PATH }))
const res = function <T extends (args: Parameters<T>[0]) => unknown>(
  data: ReturnType<T> extends Promise<infer S> ? S : never,
) {
  return data
}

let fastify: FastifyInstance

beforeAll(() => {
  fastify = Fastify({ forceCloseConnections: true })
  fastify.register(cors)
  fastify.post(apiClient.public.signup.$path(), (_, reply) => {
    reply.send(
      res<typeof apiClient.public.signup.$post>({
        firebaseUid: 'firebaseUid',
        email: 'test@test.test',
        emailVerified: true,
      }),
    )
  })

  return fastify.listen({ port: +(process.env.API_SERVER_PORT ?? '8080') })
})

afterAll(() => fastify.close())

describe('/register', () => {
  test('アカウントが作成できる', async () => {
    const { container, findByText } = render(<Register />)
    await submitForm(container, validInput)

    expect(await findByText('アカウントを作成しました。')).toBeInTheDocument()
    expect(mockRouter).toMatchObject({ asPath: pagesPath.login.$url().pathname })
  })
})
