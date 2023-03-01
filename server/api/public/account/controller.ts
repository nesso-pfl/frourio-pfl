import { createAccount, deleteAccount } from '$/service/account'
import { createUser } from '$/service/user'
import { defineController } from './$relay'

export default defineController(
  { createAccount, createUser, deleteAccount },
  ({ createAccount, createUser, deleteAccount }) => ({
    post: async ({ body }) => {
      const account = await createAccount(body)
      try {
        await createUser({ firebaseUid: account.uid })

        return { status: 201, body: account }
      } catch (error) {
        await deleteAccount({ firebaseUid: account.uid })
        return { status: 500, body: { code: 'create-user-error' } }
      }
    },
  }),
)
