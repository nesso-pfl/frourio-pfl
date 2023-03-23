import { prisma } from '$/lib/prisma'
import { depend } from 'velona'

const find = async (id: number) => {
  const city = await prisma.city.findUnique({
    where: { id },
  })

  if (!city) return undefined

  return city
}
export const findCity = depend({ find }, async ({ find }, id: number) => {
  return await find(id)
})
