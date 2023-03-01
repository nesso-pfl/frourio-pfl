import { VStack } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { errorMessage, SubmitError } from '~/features/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Form, Input } from '~/features/ui'
import { useCallback } from 'react'

const formSchema = z
  .object({
    email: z.string().min(1, errorMessage.required).email(errorMessage.email),
    password: z.string().min(1, errorMessage.required),
    passwordConfirm: z.string().min(1, errorMessage.required),
  })
  .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
    message: '入力されたパスワードと一致しません',
    path: ['passwordConfirm'],
  })
export type Form = z.infer<typeof formSchema>

type Props = {
  onSubmit: (formValues: Form) => Promise<SubmitError<Form> | undefined>
}

export const RegisterForm: React.FC<Props> = ({ onSubmit }) => {
  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm<Form>({ resolver: zodResolver(formSchema) })
  const onSubmit_ = useCallback(async (formValues: Form) => {
    const error = await onSubmit(formValues)
    if (error) {
      setError(error.field, { message: error.message })
    }
  }, [])

  return (
    <Form.Container onSubmit={handleSubmit(onSubmit_)} minW="300px">
      <VStack spacing={5} mb={12}>
        <Form.Item isInvalid={!!errors.email?.message}>
          <Form.Label fontSize="sm">メールアドレス</Form.Label>
          <Input type="email" autoComplete="email" {...register('email')} />
          <Form.ErrorMessage>{errors.email?.message}</Form.ErrorMessage>
        </Form.Item>
        <Form.Item isInvalid={!!errors.password?.message}>
          <Form.Label>パスワード</Form.Label>
          <Input type="password" autoComplete="new-password" {...register('password')} />
          <Form.ErrorMessage>{errors.password?.message}</Form.ErrorMessage>
        </Form.Item>
        <Form.Item isInvalid={!!errors.passwordConfirm?.message}>
          <Form.Label>パスワード（確認）</Form.Label>
          <Input type="password" autoComplete="new-password" {...register('passwordConfirm')} />
          <Form.ErrorMessage>{errors.passwordConfirm?.message}</Form.ErrorMessage>
        </Form.Item>
      </VStack>
      <Button type="submit" size="md" w="100%">
        アカウント作成
      </Button>
    </Form.Container>
  )
}
