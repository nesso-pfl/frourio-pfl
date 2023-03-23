import { depend } from 'velona'
import { prisma } from '$/lib/prisma'
import { CreateCity, City } from '$/types'

const create = async (newCity: CreateCity) => {
  const { features, ...restData } = newCity
  return await prisma.city.create({
    data: {
      ...restData,
      features: {
        connectOrCreate: features.map((feature) => ({ create: { name: feature }, where: { name: feature } })),
      },
    },
    include: { features: true },
  })
}
export const createCity = depend({ create }, async ({ create }, newCity: CreateCity): Promise<City> => {
  return await create(newCity)
})
