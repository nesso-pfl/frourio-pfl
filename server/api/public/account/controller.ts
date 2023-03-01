import { createAccount } from '$/service/account'
import { createUser } from '$/service/user'
import { defineController } from './$relay'

export default defineController({ createAccount, createUser }, ({ createAccount, createUser }) => ({
  post: async ({ body }) => {
    const account = await createAccount(body)
    await createUser({ firebaseUid: account.uid })

    return { status: 201, body: account }
  },
}))
