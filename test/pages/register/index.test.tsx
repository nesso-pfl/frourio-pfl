import { render, ServerErrorCase } from '@/test/testUtils'
import Register from '@/src/pages/register'
import { submitForm, validInput } from '@/src/features/account/RegisterForm.test-input'
import mockRouter from 'next-router-mock'
import { pagesPath } from '@/src/utils/$path'
import { CreateAccountErrorCode, CreateUserErrorCode } from '@/server/types'
import { server } from '@/src/mocks/server'
import { createHandler, postWith201 } from '@/src/mocks/handlers'
import { apiClient } from '@/src/utils/apiClient'

const serverErrorCases: ServerErrorCase<CreateAccountErrorCode | CreateUserErrorCode>[] = [
  { errorCode: 'auth/email-already-exists', statusCode: 400, message: 'このメールアドレスは既に使われています' },
  { errorCode: 'auth/invalid-password', statusCode: 400, message: 'パスワードは6文字以上で入力してください' },
  {
    errorCode: 'create-user-error',
    statusCode: 500,
    message: 'アカウントの登録に失敗しました。しばらく待ってからもう一度お試しください。',
  },
]

describe('/register', () => {
  test('アカウントが登録できる', async () => {
    const createAccount = jest.fn()
    server.use(postWith201(apiClient.public.account, { onRequest: createAccount }))
    const { container, findByText } = render(<Register />)
    await submitForm(container, validInput)

    expect(createAccount).toHaveBeenCalled()
    expect(await findByText('アカウントを登録しました。')).toBeInTheDocument()
    expect(mockRouter).toMatchObject({ asPath: pagesPath.login.$url().pathname })
  })
  serverErrorCases.forEach(({ errorCode, statusCode, message }) => {
    test(`サーバーの ${errorCode} エラーによりアカウント登録に失敗したら「${message}」と表示する`, async () => {
      server.use(createHandler(apiClient.public.account.$path(), 'post', statusCode, { response: { code: errorCode } }))
      const { container, findByText } = render(<Register />)
      await submitForm(container, validInput)

      expect(await findByText(message)).toBeInTheDocument()
    })
  })
})
