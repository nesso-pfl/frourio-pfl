import { Response, City } from '$/types'

export const cityToResponse = (city: City): Response<City> => {
  return {
    ...city,
    startedAt: city.startedAt.toISOString(),
    // TODO: cityFeatureToResponse を使う
    features: [],
    createdAt: city.createdAt.toISOString(),
    updatedAt: city.updatedAt.toISOString(),
  }
}
