import fastify from 'fastify'
import controller from './controller'

describe('POST /public/signup', () => {
  test('Firebase アカウントが作成できる', async () => {
    const injectedController = controller.inject((deps) => ({
      createAccount: deps.createAccount.inject({
        create: ({ email }) => Promise.resolve({ uid: 'firebaseUid', email, emailVerified: true }),
      }),
      createUser: deps.createUser.inject({
        create: (newUser) => Promise.resolve({ id: 1, createdAt: new Date(), updatedAt: new Date(), ...newUser }),
      }),
    }))(fastify())

    const res = await injectedController.post({
      body: { email: 'test@test.test', password: 'stringPassword1234' },
    })

    expect(res.status).toBe(201)
  })
  test('User レコードの作成に失敗したら Firebase アカウントを削除して 500 を返す', async () => {
    const deleteAccount = jest.fn()
    const injectedController = controller.inject((deps) => ({
      createAccount: deps.createAccount.inject({
        create: ({ email }) => Promise.resolve({ uid: 'firebaseUid', email, emailVerified: true }),
      }),
      createUser: deps.createUser.inject({
        create: () => Promise.reject(),
      }),
      deleteAccount: deps.deleteAccount.inject({
        delete_: deleteAccount,
      }),
    }))(fastify())

    const res = await injectedController.post({
      body: { email: 'test@test.test', password: 'stringPassword1234' },
    })

    expect(deleteAccount).toHaveBeenCalled()
    expect(res.status).toBe(500)
  })
})
