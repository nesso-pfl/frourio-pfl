import { verifyIdToken } from '$/lib/firebase'
import { createSessionCookie, sessionCookieKey } from '$/service/session'
import { z } from 'zod'
import { defineHooks } from './$relay'

const postRequestBodySchema = z.object({
  firebaseIdToken: z.string(),
})

export default defineHooks(() => ({
  preHandler: async (req, reply) => {
    const body = postRequestBodySchema.parse(req.body)
    const firebaseAdminUser = await verifyIdToken(body.firebaseIdToken)
    if (!firebaseAdminUser.emailVerified) {
      reply.status(401).send()
      return
    }
    const sessionCookie = await createSessionCookie(body.firebaseIdToken)
    reply.setCookie(sessionCookieKey, sessionCookie)
  },
}))
