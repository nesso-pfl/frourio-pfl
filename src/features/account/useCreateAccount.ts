import { createUser, CreateUserError, sendEmailVerification, SendEmailVerificationError } from '@/src/lib/firebase'
import { pagesPath } from '@/src/utils/$path'
import { apiClient } from '@/src/utils/apiClient'
import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

type RequestBody = Parameters<typeof apiClient.public.account.$post>[0]['body']

export const useCreateAccount = () => {
  const router = useRouter()
  const successToast = useToast()
  const errorToast = useToast({ status: 'error' })

  const createAccount = useCallback(
    async (body: RequestBody) => {
      try {
        const userCredential = await createUser({ email: body.email, password: body.password })
        await sendEmailVerification(userCredential.user)
        await router.push(pagesPath.register.complete.$url())
      } catch (error) {
        if (error instanceof CreateUserError) {
          switch (error.code) {
            case 'auth/email-already-in-use':
              return { field: 'email', message: 'このメールアドレスは既に使われています' } as const
            case 'auth/invalid-email':
              return { field: 'email', message: 'このメールアドレスは使用できません' } as const
            case 'auth/weak-password':
              return { field: 'password', message: 'パスワードは6文字以上で入力してください' } as const
            default:
              errorToast({ description: 'アカウントの登録に失敗しました。しばらく待ってからもう一度お試しください。' })
          }
        } else if (error instanceof SendEmailVerificationError) {
          switch (error.code) {
            case 'auth/too-many-requests':
              // アカウントの仮登録は成功しているはずなので、一旦仮完了とし、ログイン画面で再度メアド確認メールを送信するようにする
              await router.push(pagesPath.register.complete.$url())
              break
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
