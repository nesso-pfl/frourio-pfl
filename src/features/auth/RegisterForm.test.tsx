import { InvalidInputCase, render } from '@/test/testUtils'
import { RegisterForm } from './RegisterForm'
import { validInput, Input, submitForm } from './RegisterForm.test-input'

const invalidInputCases: InvalidInputCase<Input>[] = [
  {
    title: 'メールアドレスが入力されていなければエラーを表示する',
    input: { ...validInput, email: undefined },
    message: 'この項目は入力必須です',
  },
  {
    title: 'メールアドレスの形式が正しくなければエラーを表示する',
    input: { ...validInput, email: 'wrong-email-format' },
    message: 'メールアドレスの形式が正しくありません',
  },
  {
    title: 'パスワードが入力されていなければエラーを表示する',
    input: { ...validInput, password: undefined },
    message: 'この項目は入力必須です',
  },
  {
    title: 'パスワード（確認）が入力されていなければエラーを表示する',
    input: { ...validInput, passwordConfirm: undefined },
    message: 'この項目は入力必須です',
  },
  {
    title: 'パスワードとパスワード（確認）の入力が一致しなければエラーを表示する',
    input: { ...validInput, passwordConfirm: 'notSamepassword123' },
    message: '入力されたパスワードと一致しません',
  },
]
const onSubmit = jest.fn()

describe('features/account/RegisterForm', () => {
  test('フォームが送信できる', async () => {
    const { container } = render(<RegisterForm onSubmit={onSubmit} />)
    await submitForm(container, validInput)
    expect(onSubmit).toHaveBeenCalled()
  })
  invalidInputCases.forEach(({ title, input, message }) => {
    test(title, async () => {
      const { container, findByText } = render(<RegisterForm onSubmit={onSubmit} />)
      await submitForm(container, input)
      expect(onSubmit).not.toHaveBeenCalled()
      expect(await findByText(message)).toBeInTheDocument()
    })
  })
})
