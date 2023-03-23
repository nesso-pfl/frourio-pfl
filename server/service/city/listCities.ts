import { prisma } from '$/lib/prisma'
import dayjs from 'dayjs'
import { depend } from 'velona'
import { CityQuery } from '$/types'

const findMany = async (query: CityQuery) => {
  const cities = await prisma.city.findMany({
  })

  return cities
}
export const listCities = depend({ findMany }, async ({ findMany }, query: CityQuery) => {
  return await findMany(query)
})
