import { depend } from 'velona'
import { createFirebaseUser } from '$/lib/firebase'
import { z } from 'zod'
import { Account, CreateAccount } from '$/types'
import { CreateAccountErrorCode, createAccountErrorCodes } from '$/types/account'

export class CreateAccountError extends Error {
  code: string
  constructor(code: CreateAccountErrorCode) {
    super()
    this.code = code
  }
}

const errorSchema = z.object({
  code: z.enum(createAccountErrorCodes),
})

const create = async ({ email, password }: CreateAccount) => {
  return createFirebaseUser(email, password)
}
export const createAccount = depend({ create }, async ({ create }, newAccount: CreateAccount): Promise<Account> => {
  try {
    const firebaseUser = await create(newAccount)
    return { ...firebaseUser, firebaseUid: firebaseUser.uid }
  } catch (error) {
    const result = errorSchema.safeParse(error)
    if (result.success) {
      throw new CreateAccountError(result.data.code)
    } else {
      throw error
    }
  }
})
