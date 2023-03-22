import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { errorMessage } from '../form'
import { Button, Form, Input } from '../ui'

const formSchema = z.object({
  email: z.string().min(1, errorMessage.required).email(errorMessage.email),
})
export type Form = z.infer<typeof formSchema>

type Props = {
  onSubmit: (formValues: Form) => Promise<unknown>
}

export const SendPasswordResetEmailForm: React.FC<Props> = ({ onSubmit }) => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<Form>({ resolver: zodResolver(formSchema) })

  return (
    <Form.Container onSubmit={handleSubmit(onSubmit)}>
      <Form.Item isInvalid={!!errors.email?.message}>
        <Form.Label>メールアドレス</Form.Label>
        <Input type="email" {...register('email')} autoComplete="email" />
        <Form.ErrorMessage>{errors.email?.message}</Form.ErrorMessage>
      </Form.Item>
      <Button type="submit" isDisabled={isSubmitting} mt={8} size="md">
        パスワード再設定メールを送信
      </Button>
    </Form.Container>
  )
}
