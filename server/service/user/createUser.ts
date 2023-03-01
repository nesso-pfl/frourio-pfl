import { depend } from 'velona'
import { prisma } from '$/lib/prisma'
import { CreateUser, User } from '$/types'

const create = async ({ firebaseUid }: CreateUser) => {
  return await prisma.user.create({ data: { firebaseUid } })
}
export const createUser = depend({ create }, async ({ create }, newUser: CreateUser): Promise<User> => {
  return await create(newUser)
})
