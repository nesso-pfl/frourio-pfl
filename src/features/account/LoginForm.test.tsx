import { InvalidInputCase, render } from '@/test/testUtils'
import { LoginForm } from './LoginForm'
import { validInput, Input, submitForm } from './LoginForm.test-input'

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
]
const onSubmit = jest.fn()

describe('features/account/LoginForm', () => {
  invalidInputCases.forEach(({ title, input, message }) => {
    test(title, async () => {
      const { container, findByText } = render(<LoginForm onSubmit={onSubmit} />)
      await submitForm(container, input)
      expect(await findByText(message)).toBeInTheDocument()
    })
  })
})
