import { z } from 'zod'
import { sendEmailVerification as sendEmailVerification_, User } from 'firebase/auth'
import { AppError } from '@/src/utils/AppError'

const sendEmailVerificationErrorCodes = ['auth/too-many-requests'] as const
type SendEmailVerificationErrorCode = (typeof sendEmailVerificationErrorCodes)[number]

const errorSchema = z.object({
  code: z.enum(sendEmailVerificationErrorCodes),
})

export class SendEmailVerificationError extends AppError<SendEmailVerificationErrorCode> {}

export const sendEmailVerification = async (user: User) => {
  try {
    await sendEmailVerification_(user)
  } catch (error) {
    const result = errorSchema.safeParse(error)
    if (result.success) {
      throw new SendEmailVerificationError(result.data.code)
    } else {
      throw error
    }
  }
}
