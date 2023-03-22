import { applyActionCode } from 'firebase/auth'
import { z } from 'zod'
import { auth } from './auth'

export const verifyEmailErrorCodes = ['INVALID_OOB_CODE'] as const
export type VerifyEmailErrorCode = (typeof verifyEmailErrorCodes)[number]

const errorSchema = z.object({
  error: z.object({
    message: z.enum(verifyEmailErrorCodes),
  }),
})

export class VerifyEmailError extends Error {
  code: VerifyEmailErrorCode
  constructor(code: VerifyEmailErrorCode) {
    super()
    this.code = code
  }
}

export const verifyEmail = async (code: string) => {
  try {
    await applyActionCode(auth, code)
  } catch (error) {
    const result = errorSchema.safeParse(error)
    if (result.success) {
      throw new VerifyEmailError(result.data.error.message)
    } else {
      throw error
    }
  }
}
