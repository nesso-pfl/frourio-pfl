import { resetPassword, ResetPasswordError } from '@/src/lib/firebase'
import { pagesPath } from '@/src/utils/$path'
import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { Form } from './PasswordResetForm'

export const useResetPassword = ({ code }: { code: string }) => {
  const router = useRouter()
  const errorToast = useToast({ status: 'error' })

  const resetPassword_ = useCallback(async (formValues: Form) => {
    try {
      await resetPassword(code, formValues.password)
      await router.push(pagesPath.auth_action.password_reset_complete.$url())
    } catch (error) {
      if (error instanceof ResetPasswordError) {
        switch (error.code) {
          case 'auth/invalid-action-code':
            errorToast({
              description:
                'URL の有効期限が過ぎました。再度パスワード再設定画面からパスワードのリセットをお試しください。',
            })
            break
          case 'auth/weak-password':
            return { field: 'password', message: 'パスワードは6文字以上の英数字で入力してください' } as const
        }
      } else {
        errorToast({
          description: 'URL の有効期限が過ぎました。再度パスワード再設定画面からパスワードのリセットをお試しください。',
        })
      }
    }
  }, [])

  return { resetPassword: resetPassword_ }
}
