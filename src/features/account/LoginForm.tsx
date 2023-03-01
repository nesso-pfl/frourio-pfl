import { Box, FormControl, FormErrorMessage, FormLabel, VStack } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { errorMessage } from '~/features/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '~/features/ui'

const formSchema = z.object({
  email: z.string().min(1, errorMessage.required).email(errorMessage.email),
  password: z.string().min(1, errorMessage.required),
})
export type Form = z.infer<typeof formSchema>

type Props = {
  onSubmit: (formValues: Form) => Promise<unknown>
}

export const LoginForm: React.FC<Props> = ({ onSubmit }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Form>({ resolver: zodResolver(formSchema) })
  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)} noValidate minW="300px">
      <VStack spacing={5} mb={12}>
        <FormControl isInvalid={!!errors.email?.message}>
          <FormLabel>メールアドレス</FormLabel>
          <Input type="email" autoComplete="email" {...register('email')} />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.password?.message}>
          <FormLabel>パスワード</FormLabel>
          <Input type="password" autoComplete="current-password" {...register('password')} />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
      </VStack>
      <Button type="submit" size="md" w="100%">
        ログイン
      </Button>
    </Box>
  )
}
