import { depend } from 'velona'
import { createFirebaseUser } from '$/lib/firebase'
import { Account } from './types'
import { z } from 'zod'

const createAccountErrorCodes = ['auth/invalid-password', 'auth/email-already-exists'] as const
type CreateAccountErrorCode = (typeof createAccountErrorCodes)[number]

class CreateAccountError extends Error {
  code: string
  constructor(code: CreateAccountErrorCode) {
    super()
    this.code = code
  }
}

const errorSchema = z.object({
  code: z.enum(createAccountErrorCodes),
})

export type CreateAccount = {
  email: string
  password: string
}

const create = async ({ email, password }: CreateAccount) => {
  return createFirebaseUser(email, password)
}
export const createAccount = depend({ create }, async ({ create }, newAccount: CreateAccount): Promise<Account> => {
  try {
    return await create(newAccount)
  } catch (error) {
    const result = errorSchema.safeParse(error)
    if (result.success) {
      throw new CreateAccountError(result.data.code)
    } else {
      throw error
    }
  }
})
