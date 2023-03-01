import { pagesPath } from '@/src/utils/$path'
import { apiClient } from '@/src/utils/apiClient'
import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { z } from 'zod'

const createAccountErrorCodes = ['auth/invalid-password', 'auth/email-already-exists'] as const

type RequestBody = Parameters<typeof apiClient.public.account.$post>[0]['body']
const errorSchema = z.object({
  response: z.object({
    data: z.object({
      code: z.enum(createAccountErrorCodes),
    }),
  }),
})

export const useCreateAccount = () => {
  const router = useRouter()
  const successToast = useToast()
  const failureToast = useToast({ status: 'error' })

  const createAccount = useCallback(
    async (body: RequestBody) => {
      try {
        await apiClient.public.account.$post({ body })
        await router.push(pagesPath.login.$url())
        successToast({ description: 'アカウントを作成しました。' })
      } catch (error) {
        const result = errorSchema.safeParse(error)
        if (result.success) {
          switch (result.data.response.data.code) {
            case 'auth/invalid-password':
              return { field: 'password', message: 'パスワードは6文字以上で入力してください' } as const
            case 'auth/email-already-exists':
              return { field: 'email', message: 'このメールアドレスは既に使われています' } as const
          }
        } else {
          failureToast({ description: 'アカウントの作成に失敗しました。しばらく待ってからもう一度お試しください。' })
        }
      }
    },
    [successToast, failureToast],
  )

  return { createAccount }
}
