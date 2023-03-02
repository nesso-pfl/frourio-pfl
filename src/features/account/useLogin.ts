import { signin, SigninError } from '@/src/lib/firebase'
import { apiClient } from '@/src/utils/apiClient'
import { useToast } from '@chakra-ui/react'
import { useCallback } from 'react'
import { errorMessage } from '../form'

type Args = {
  email: string
  password: string
}

export const useLogin = () => {
  const errorToast = useToast({ status: 'error' })
  const login = useCallback(
    async (args: Args) => {
      try {
        const firebaseUser = await signin(args.email, args.password)
        await apiClient.public.login.$post({ body: { firebaseIdToken: await firebaseUser.getIdToken() } })
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
              throw error
          }
        } else {
          errorToast({ description: 'ログインに失敗しました。しばらく待ってから再度お試しください。' })
          throw error
        }
      }
    },
    [errorToast],
  )

  return { login }
}
