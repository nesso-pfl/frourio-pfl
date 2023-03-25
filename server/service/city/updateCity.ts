import { depend } from 'velona'
import { City, UpdateCity } from '$/types'
import { prisma } from '$/lib/prisma'
import { prismaValidationErrorSchema } from '$/util/prismaValidationErrorSchema'
import { UpdateCityError } from '$/types/city'

const update = async (id: number, params: UpdateCity) => {
  const { features, ...restParams } = params
  const city = await prisma.city.update({
    where: { id },
    data: {
      ...restParams,
      features: {
        set: [],
        connectOrCreate: features.map((feature) => ({
          create: { name: feature },
          where: { name: feature },
        })),
      },
    },
    include: { features: true },
  })

  return city
}

export const updateCity = depend({ update }, async ({ update }, id: number, params: UpdateCity): Promise<City> => {
  try {
    return await update(id, params)
  } catch (error) {
    const result = prismaValidationErrorSchema.safeParse(error)
    if (!result.success) throw error
    if (result.data.meta.target?.includes('name')) {
      throw new UpdateCityError('unique-name')
    } else if (result.data.meta.target?.includes('nameKana')) {
      throw new UpdateCityError('unique-nameKana')
    } else {
      throw error
    }
  }
})
