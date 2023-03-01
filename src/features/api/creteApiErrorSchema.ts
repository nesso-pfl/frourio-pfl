import { z } from 'zod'

export const createApiErrorSchema = <T extends readonly [string, ...string[]]>(errors: T) =>
  z.object({
    response: z.object({
      data: z.object({
        code: z.enum(errors),
      }),
    }),
  })
