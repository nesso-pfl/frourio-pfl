import { createAccountErrorCodes } from '@/server/types/account'
import { pagesPath } from '@/src/utils/$path'
import { apiClient } from '@/src/utils/apiClient'
import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { createApiErrorSchema } from '../api'

type RequestBody = Parameters<typeof apiClient.public.account.$post>[0]['body']
const errorSchema = createApiErrorSchema(createAccountErrorCodes)

export const useCreateAccount = () => {
  const router = useRouter()
  const successToast = useToast()
  const errorToast = useToast({ status: 'error' })

  const createAccount = useCallback(
    async (body: RequestBody) => {
      try {
        await apiClient.public.account.$post({ body })
        await router.push(pagesPath.login.$url())
        successToast({ description: 'アカウントを登録しました。' })
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
          errorToast({ description: 'アカウントの登録に失敗しました。しばらく待ってからもう一度お試しください。' })
        }
      }
    },
    [successToast, errorToast],
  )

  return { createAccount }
}
