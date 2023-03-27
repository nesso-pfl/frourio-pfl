import { sessionCookieKey } from '$/service/session'
import { defineHooks } from './$relay'

export default defineHooks(() => ({
  preHandler: (_, reply, done) => {
    reply.clearCookie(sessionCookieKey)
    done()
  },
}))
