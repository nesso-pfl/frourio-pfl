import { depend } from 'velona'
import { prisma } from '$/lib/prisma'

const delete_ = async (id: number) => {
  await prisma.city.delete({ where: { id } })
}

export const deleteCity = depend({ delete_ }, async ({ delete_ }, id: number) => {
  return delete_(id)
})
