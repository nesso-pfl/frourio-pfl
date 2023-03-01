import { depend } from 'velona'
import { createFirebaseUser } from '$/lib/firebase'
import { Account } from './types'

export type CreateAccount = {
  email: string
  password: string
}

const create = async ({ email, password }: CreateAccount) => {
  return createFirebaseUser(email, password)
}
export const createAccount = depend({ create }, async ({ create }, newAccount: CreateAccount): Promise<Account> => {
  return await create(newAccount)
})
