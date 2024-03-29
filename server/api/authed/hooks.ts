import { sessionCookieKey, verifySession } from '$/service/session'
import { Account } from '$/types'
import { defineHooks } from './$relay'

export type AdditionalRequest = {
  account: Account
}

export default defineHooks(() => ({
  onRequest: async (req, reply) => {
    if (!req.cookies?.[sessionCookieKey]) {
      reply.status(401).send()
      return
    }

    try {
      const account = await verifySession(req.cookies[sessionCookieKey])
      req.account = account
    } catch {
      reply.clearCookie(sessionCookieKey)
      reply.status(401).send()
    }
  },
}))
