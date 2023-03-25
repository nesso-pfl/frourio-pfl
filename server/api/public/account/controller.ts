import { createAccount, deleteAccount } from '$/service/account'
import { createUser } from '$/service/user'
import { CreateAccountError, CreateUserError } from '$/types'
import { defineController } from './$relay'

export default defineController(
  { createAccount, createUser, deleteAccount },
  ({ createAccount, createUser, deleteAccount }) => ({
    post: async ({ body }) => {
      try {
        const account = await createAccount(body)
        try {
          await createUser(account)
          return { status: 201, body: account }
        } catch (error) {
          if (error instanceof CreateUserError) await deleteAccount(account)
          return { status: 500, body: error }
        }
      } catch (error) {
        if (!(error instanceof CreateAccountError)) throw error
        return { status: 400, body: { code: error.code } }
      }
    },
  }),
)
