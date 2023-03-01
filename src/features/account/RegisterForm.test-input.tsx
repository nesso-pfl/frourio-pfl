import { getByLabelText, getByRole } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Form } from './RegisterForm'

export type Input = Partial<Form>
export const validInput: Input = {
  email: 'test@test.test',
  password: 'stringPassword123',
  passwordConfirm: 'stringPassword123',
}

export const submitForm = async (container: HTMLElement, input: Input) => {
  if (input.email) await userEvent.type(getByRole(container, 'textbox', { name: 'メールアドレス' }), input.email)
  if (input.password) await userEvent.type(getByLabelText(container, 'パスワード'), input.password)
  if (input.passwordConfirm)
    await userEvent.type(getByLabelText(container, 'パスワード（確認）'), input.passwordConfirm)
  await userEvent.click(getByRole(container, 'button', { name: 'アカウント作成' }))
}
