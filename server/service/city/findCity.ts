import { prisma } from '$/lib/prisma'
import { City } from '$/types'
import { depend } from 'velona'

const find = async (id: number) => {
  const city = await prisma.city.findUnique({
    where: { id },
    include: { features: true },
  })

  if (!city) return undefined

  return city
}
export const findCity = depend({ find }, async ({ find }, id: number): Promise<City | undefined> => {
  return await find(id)
})
