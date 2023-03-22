import { depend } from 'velona'
import { prisma } from '$/lib/prisma'
import { CreateUser, CreateUserErrorCode, createUserErrorCodes, User } from '$/types'
import { z } from 'zod'
import { AppError } from '$/util/AppError'

export class CreateUserError extends AppError<CreateUserErrorCode> {}
const errorSchema = z.object({
  code: z.enum(createUserErrorCodes),
})

const create = async ({ firebaseUid }: CreateUser) => {
  return await prisma.firebaseUser.create({ data: { firebaseUid } })
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
