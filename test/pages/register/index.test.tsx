import { render } from '@/test/testUtils'
import Register from '~/pages/register'
import { submitForm, validInput } from '~/features/auth/RegisterForm.test-input'
import mockRouter from 'next-router-mock'
import { pagesPath } from '~/utils/$path'
import { CreateUserError } from '~/lib/firebase'

describe('/register', () => {
  test('アカウントが登録できる', async () => {
    const InjectedPage = Register.inject((deps) => ({
      useCreateAccount: deps.useCreateAccount.inject({
        createUserAndSendEmailVerification: () => Promise.resolve(),
      }),
    }))
    const { container } = render(<InjectedPage />)
    await submitForm(container, validInput)

    expect(mockRouter).toMatchObject({ asPath: pagesPath.register.complete.$url().pathname })
  })
  test(`既に使われているメールアドレスでアカウント登録をしようとすると失敗する`, async () => {
    const InjectedPage = Register.inject((deps) => ({
      useCreateAccount: deps.useCreateAccount.inject({
        createUserAndSendEmailVerification: () => Promise.reject(new CreateUserError('auth/email-already-in-use')),
      }),
    }))
    const { container, findByText } = render(<InjectedPage />)
    await submitForm(container, validInput)

    expect(await findByText('このメールアドレスは既に使われています')).toBeInTheDocument()
  })
  test(`弱いパスワード値でアカウント登録をしようとすると失敗する`, async () => {
    const InjectedPage = Register.inject((deps) => ({
      useCreateAccount: deps.useCreateAccount.inject({
        createUserAndSendEmailVerification: () => Promise.reject(new CreateUserError('auth/weak-password')),
      }),
    }))
    const { container, findByText } = render(<InjectedPage />)
    await submitForm(container, validInput)

    expect(await findByText('パスワードは6文字以上で入力してください')).toBeInTheDocument()
  })
  test(`無効なメールアドレスでアカウント登録をしようとすると失敗する`, async () => {
    const InjectedPage = Register.inject((deps) => ({
      useCreateAccount: deps.useCreateAccount.inject({
        createUserAndSendEmailVerification: () => Promise.reject(new CreateUserError('auth/invalid-email')),
      }),
    }))
    const { container, findByText } = render(<InjectedPage />)
    await submitForm(container, validInput)

    expect(await findByText('このメールアドレスは使用できません')).toBeInTheDocument()
  })
  test(`想定外のエラーによりアカウント登録に失敗するとメッセージを表示する`, async () => {
    const InjectedPage = Register.inject((deps) => ({
      useCreateAccount: deps.useCreateAccount.inject({
        createUserAndSendEmailVerification: () => Promise.reject(new Error('Unexpected error')),
      }),
    }))
    const { container, findByText } = render(<InjectedPage />)
    await submitForm(container, validInput)

    expect(
      await findByText('アカウントの登録に失敗しました。しばらく待ってからもう一度お試しください。'),
    ).toBeInTheDocument()
  })
})
