import { confirmPasswordReset } from 'firebase/auth'
import { z } from 'zod'
import { auth } from './auth'

export const resetPasswordErrorCodes = ['auth/weak-password', 'auth/invalid-action-code'] as const
export type ResetPasswordErrorCode = (typeof resetPasswordErrorCodes)[number]

const errorSchema = z.object({
  code: z.enum(resetPasswordErrorCodes),
})

export class ResetPasswordError extends Error {
  code: ResetPasswordErrorCode
  constructor(code: ResetPasswordErrorCode) {
    super()
    this.code = code
  }
}

export const resetPassword = async (code: string, password: string) => {
  try {
    await confirmPasswordReset(auth, code, password)
  } catch (error) {
    const result = errorSchema.safeParse(error)
    if (result.success) {
      throw new ResetPasswordError(result.data.code)
    } else {
      throw error
    }
  }
}
