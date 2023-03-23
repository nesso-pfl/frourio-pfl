import { Response, City } from '$/types'

export const cityToResponse = (city: City): Response<City> => {
  return {
    ...city,
    createdAt: city.createdAt.toISOString(),
    updatedAt: city.updatedAt.toISOString(),
  }
}
