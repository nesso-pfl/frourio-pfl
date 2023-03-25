import { depend } from 'velona'
import { createUser, CreateUserError, sendEmailVerification, SendEmailVerificationError } from '~/lib/firebase'
import { pagesPath } from '~/utils/$path'
import { apiClient } from '~/utils/apiClient'
import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

const createUserAndSendEmailVerification = async (email: string, password: string) => {
  const userCredential = await createUser({ email, password })
  await sendEmailVerification(userCredential.user)
}
type RequestBody = Parameters<typeof apiClient.public.account.$post>[0]['body']

export const useCreateAccount = depend(
  { createUserAndSendEmailVerification },
  ({ createUserAndSendEmailVerification }) => {
    const router = useRouter()
    const successToast = useToast()
    const errorToast = useToast({ status: 'error' })

    const createAccount = useCallback(
      async (body: RequestBody) => {
        try {
          await createUserAndSendEmailVerification(body.email, body.password)
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
                errorToast({
                  description: 'アカウントの登録に失敗しました。しばらく待ってからもう一度お試しください。',
                })
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
  },
)
