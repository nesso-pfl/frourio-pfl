import { createUserWithEmailAndPassword, UserCredential } from 'firebase/auth'
import { z } from 'zod'
import { auth } from './auth'

const createUserErrorCodes = ['auth/invalid-email', 'auth/weak-password', 'auth/email-already-in-use'] as const
export type CreateUserErrorCode = (typeof createUserErrorCodes)[number]

const errorSchema = z.object({
  code: z.enum(createUserErrorCodes),
})
export class CreateUserError extends Error {
  code: CreateUserErrorCode
  constructor(code: CreateUserErrorCode) {
    super()
    this.code = code
  }
}

export const createUser = async ({ email, password }: { email: string; password: string }): Promise<UserCredential> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    return userCredential
  } catch (error) {
    const result = errorSchema.safeParse(error)
    if (result.success) {
      throw new CreateUserError(result.data.code)
    } else {
      throw error
    }
  }
}
