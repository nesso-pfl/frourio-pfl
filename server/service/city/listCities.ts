import { prisma } from '$/lib/prisma'
import { depend } from 'velona'
import { CityQuery } from '$/types'
import { Prisma } from '@prisma/client'

const queryToOrderBy = (query: CityQuery): Prisma.Enumerable<Prisma.CityOrderByWithRelationInput> => {
  switch (query.orderBy) {
    case 'nameKana:asc':
      return { nameKana: 'asc' }
    case 'nameKana:desc':
      return { nameKana: 'desc' }
    case 'startedAt:asc':
      return { startedAt: 'asc' }
    case 'startedAt:desc':
      return { startedAt: 'desc' }
    default:
      return { nameKana: 'asc' }
  }
}

const findMany = async (query: CityQuery) => {
  const page = query.page ?? 1
  const takeCount = query.limit ?? 20
  const cities = await prisma.city.findMany({
    skip: takeCount * (page - 1),
    take: takeCount,
    orderBy: queryToOrderBy(query),
    where: {
      OR: [
        {
          name: { contains: query.nameOrNameKana },
        },
        {
          nameKana: { contains: query.nameOrNameKana },
        },
      ],
      category: { in: query.categories },
      features: { some: { name: { in: query.features } } },
    },
    include: { features: true },
  })

  return cities
}
export const listCities = depend({ findMany }, async ({ findMany }, query: CityQuery) => {
  return await findMany(query)
})
