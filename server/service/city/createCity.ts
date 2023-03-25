import { depend } from 'velona'
import { prisma } from '$/lib/prisma'
import { CreateCity, City } from '$/types'
import { CreateCityError } from '$/types/city'
import { prismaValidationErrorSchema } from '$/util/prismaValidationErrorSchema'

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
  try {
    return await create(newCity)
  } catch (error) {
    const result = prismaValidationErrorSchema.safeParse(error)
    if (!result.success) throw error
    if (result.data.meta.target?.includes('name')) {
      throw new CreateCityError('unique-name')
    } else if (result.data.meta.target?.includes('nameKana')) {
      throw new CreateCityError('unique-nameKana')
    } else {
      throw error
    }
  }
})
