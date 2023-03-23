import { depend } from 'velona'
import { UpdateCity } from '$/types'
import { prisma } from '$/lib/prisma'

const update = async (id: number, params: UpdateCity) => {
  const city = await prisma.city.update({
    where: { id },
    data: params,
  })

  return city
}

export const updateCity = depend({ update }, async ({ update }, id: number, params: UpdateCity) => {
  return update(id, params)
})
