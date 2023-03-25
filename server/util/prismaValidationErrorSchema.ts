import { z } from 'zod'

export const prismaValidationErrorSchema = z.object({
  code: z.enum(['P2002']),
  meta: z.object({
    target: z.string().array().optional(),
  }),
})
