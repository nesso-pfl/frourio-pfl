import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { errorMessage } from '../form'
import { Button, Form, Input } from '../ui'

const formSchema = z.object({
  password: z.string().min(1, errorMessage.required),
})
export type Form = z.infer<typeof formSchema>

type Props = {
  onSubmit: (formValues: Form) => Promise<{ field: keyof Form; message: string } | undefined>
}

export const PasswordResetForm: React.FC<Props> = ({ onSubmit }) => {
  const {
    register,
    formState: { errors, isSubmitting },
    setError,
    handleSubmit,
  } = useForm<Form>({ resolver: zodResolver(formSchema) })

  const onSubmit_ = useCallback(
    async (formValues: Form) => {
      const result = await onSubmit(formValues)
      if (result) {
        setError(result.field, { message: result.message })
      }
    },
    [onSubmit, setError],
  )

  return (
    <Form.Container onSubmit={handleSubmit(onSubmit_)} minW="300px">
      <Form.Item isInvalid={!!errors.password?.message}>
        <Form.Label>新しいパスワード</Form.Label>
        <Input {...register('password')} type="password" autoComplete="new-password" />
        <Form.ErrorMessage>{errors.password?.message}</Form.ErrorMessage>
      </Form.Item>
      <Button type="submit" isDisabled={isSubmitting} mt={5} size="md" w="100%">
        パスワード再設定
      </Button>
    </Form.Container>
  )
}
