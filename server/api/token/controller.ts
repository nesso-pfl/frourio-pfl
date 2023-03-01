import { defineController } from './$relay'
import { z } from 'zod'

export default defineController((fastify) => ({
  post: {
    validators: {
      body: z.object({ id: z.string().min(2), pass: z.string().min(4) }),
    },
    handler: ({ body }) => ({ status: 201, body: { token: fastify.jwt.sign({ id: body.id }) } }),
  },
}))
