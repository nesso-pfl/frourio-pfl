import { depend } from 'velona'
import { createFirebaseAdminUser } from '$/lib/firebase'
import { z } from 'zod'
import { Account, CreateAccount } from '$/types'
import { CreateAccountError, createAccountErrorCodes } from '$/types'

const errorSchema = z.object({
  code: z.enum(createAccountErrorCodes),
})

const create = async ({ email, password }: CreateAccount) => {
  return createFirebaseAdminUser(email, password)
}
export const createAccount = depend({ create }, async ({ create }, newAccount: CreateAccount): Promise<Account> => {
  try {
    const firebaseAdminUser = await create(newAccount)
    return { ...firebaseAdminUser, firebaseUid: firebaseAdminUser.uid }
  } catch (error) {
    const result = errorSchema.safeParse(error)
    if (result.success) {
      throw new CreateAccountError(result.data.code)
    } else {
      throw error
    }
  }
})
