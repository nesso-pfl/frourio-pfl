import { depend } from 'velona'
import { prisma } from '$/lib/prisma'
import { CreateCity, City } from '$/types'
import { z } from 'zod'

const create = async ({}: CreateCity) => {
  return await prisma.city.create({ data: { firebaseUid } })
}
export const createCity = depend({ create }, async ({ create }, newCity: CreateCity): Promise<City> => {


})
