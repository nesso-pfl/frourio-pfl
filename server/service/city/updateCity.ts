import { depend } from 'velona'
import { City, UpdateCity } from '$/types'
import { prisma } from '$/lib/prisma'

const update = async (id: number, params: UpdateCity) => {
  const { features, ...restParams } = params
  const city = await prisma.city.update({
    where: { id },
    data: {
      ...restParams,
      features: { connectOrCreate: features.map((feature) => ({ create: feature, where: { name: feature.name } })) },
    },
    include: { features: true },
  })

  return city
}

export const updateCity = depend({ update }, async ({ update }, id: number, params: UpdateCity): Promise<City> => {
  return update(id, params)
})
