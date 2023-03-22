import { z } from 'zod'
import { sendEmailVerification as sendEmailVerification_, User } from 'firebase/auth'

const sendEmailVerificationErrorCodes = ['auth/too-many-requests'] as const
type SendEmailVerificationErrorCode = (typeof sendEmailVerificationErrorCodes)[number]

const errorSchema = z.object({
  code: z.enum(sendEmailVerificationErrorCodes),
})

export class SendEmailVerificationError extends Error {
  code: SendEmailVerificationErrorCode
  constructor(code: SendEmailVerificationErrorCode) {
    super()
    this.code = code
  }
}
export const sendEmailVerification = async (user: User) => {
  try {
    await sendEmailVerification_(user)
  } catch (e) {
    const result = errorSchema.safeParse(e)
    if (result.success) {
      throw new SendEmailVerificationError(result.data.code)
    } else {
      throw e
    }
  }
}
