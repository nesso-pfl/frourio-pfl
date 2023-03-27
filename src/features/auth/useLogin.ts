import { sendEmailVerification, SendEmailVerificationError, signin, SigninError } from '@/src/lib/firebase'
import { auth } from '@/src/lib/firebase/auth'
import { pagesPath } from '@/src/utils/$path'
import { apiClient } from '@/src/utils/apiClient'
import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { errorMessage } from '../form'

type Args = {
  email: string
  password: string
}

export const useLogin = () => {
  const router = useRouter()
  const successToast = useToast()
  const errorToast = useToast({ status: 'error' })
  const login = useCallback(
    async (args: Args) => {
      try {
        const firebaseUser = await signin(args.email, args.password)
        if (!firebaseUser.emailVerified) {
          if (!auth.currentUser) return
          await sendEmailVerification(auth.currentUser)
          successToast({
            description:
              '入力いただいたメールアドレスに確認メールを送信しました。メールのリンクからメールアドレスの確認を完了させてください。',
          })
          return
        }
        await apiClient.public.login.$post({ body: { firebaseIdToken: await firebaseUser.getIdToken() } })
        await router.push(pagesPath.$url())
      } catch (error) {
        if (error instanceof SigninError) {
          switch (error.code) {
            case 'auth/invalid-email':
              return { field: 'email', message: errorMessage.email } as const
            case 'auth/user-disabled':
              errorToast({ description: 'このアカウントは現在利用不可です。' })
              return
            case 'auth/user-not-found':
              errorToast({ description: '存在しないアカウントです。' })
              return
            case 'auth/wrong-password':
              return { field: 'email', message: 'メールアドレスかパスワードが間違っています' } as const
            case 'auth/too-many-requests':
              errorToast({ description: 'ログインに失敗しました。しばらく待ってから再度お試しください。' })
              break
          }
        } else if (error instanceof SendEmailVerificationError) {
          switch (error.code) {
            case 'auth/too-many-requests':
              errorToast({ description: 'ログインに失敗しました。しばらく待ってから再度お試しください。' })
              break
          }
        } else {
          errorToast({ description: 'ログインに失敗しました。しばらく待ってから再度お試しください。' })
          throw error
        }
      }
    },
    [errorToast, successToast, router],
  )

  return { login }
}
