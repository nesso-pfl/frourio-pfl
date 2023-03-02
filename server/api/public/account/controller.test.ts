import { mockCreateAccount, mockUser } from '$/mocks'
import { CreateAccountError } from '$/service/account'
import { CreateUserError } from '$/service/user'
import fastify from 'fastify'
import controller from './controller'

describe('POST /public/account', () => {
  test('Firebase アカウントが作成できる', async () => {
    const newFirebaseUid = 'newFirebaseUid'
    const injectedController = controller.inject((deps) => ({
      createAccount: deps.createAccount.inject({
        create: ({ email }) => Promise.resolve({ uid: newFirebaseUid, email, emailVerified: true }),
      }),
      createUser: deps.createUser.inject({
        create: (newUser) => Promise.resolve(mockUser(newUser)),
      }),
    }))(fastify())

    const reqBody = mockCreateAccount()
    const res = await injectedController.post({
      body: reqBody,
    })

    expect(res.body).toMatchObject({ firebaseUid: newFirebaseUid, email: reqBody.email, emailVerified: true })
    expect(res.status).toBe(201)
  })
  test('不正なパスワードによってアカウント登録に失敗したら 400 を返す', async () => {
    const injectedController = controller.inject((deps) => ({
      createAccount: deps.createAccount.inject({
        create: () => Promise.reject(new CreateAccountError('auth/invalid-password')),
      }),
    }))(fastify())

    const reqBody = mockCreateAccount({ password: 'h' })
    const res = await injectedController.post({
      body: reqBody,
    })

    expect(res.body).toMatchObject({ code: 'auth/invalid-password' })
    expect(res.status).toBe(400)
  })
  test('既に登録されているメールアドレスでアカウント登録に失敗したら 400 を返す', async () => {
    const injectedController = controller.inject((deps) => ({
      createAccount: deps.createAccount.inject({
        create: () => Promise.reject(new CreateAccountError('auth/email-already-exists')),
      }),
    }))(fastify())

    const reqBody = mockCreateAccount({ email: 'already-exists@test.test' })
    const res = await injectedController.post({
      body: reqBody,
    })

    expect(res.body).toMatchObject({ code: 'auth/email-already-exists' })
    expect(res.status).toBe(400)
  })
  test('User レコードの作成に失敗したら Firebase アカウントを削除して 500 を返す', async () => {
    const deleteAccount = jest.fn()
    const injectedController = controller.inject((deps) => ({
      createAccount: deps.createAccount.inject({
        create: ({ email }) => Promise.resolve({ uid: 'firebaseUid', email, emailVerified: true }),
      }),
      createUser: deps.createUser.inject({
        create: () => Promise.reject(new CreateUserError('create-user-error')),
      }),
      deleteAccount: deps.deleteAccount.inject({
        delete_: deleteAccount,
      }),
    }))(fastify())

    const res = await injectedController.post({
      body: mockCreateAccount(),
    })

    expect(deleteAccount).toHaveBeenCalled()
    expect(res.body).toMatchObject({ code: 'create-user-error' })
    expect(res.status).toBe(500)
  })
})
