import { depend } from 'velona'
import { prisma } from '$/lib/prisma'
import { CreateUser, CreateUserErrorCode, createUserErrorCodes, User } from '$/types'
import { z } from 'zod'

export class CreateUserError extends Error {
  code: string
  constructor(code: CreateUserErrorCode) {
    super()
    this.code = code
  }
}
const errorSchema = z.object({
  code: z.enum(createUserErrorCodes),
})

const create = async ({ firebaseUid }: CreateUser) => {
  return await prisma.user.create({ data: { firebaseUid } })
}
export const createUser = depend({ create }, async ({ create }, newUser: CreateUser): Promise<User> => {
  try {
    return await create(newUser)
  } catch (error) {
    const result = errorSchema.safeParse(error)
    if (result.success) {
      throw new CreateUserError(result.data.code)
    } else {
      throw error
    }
  }
})
