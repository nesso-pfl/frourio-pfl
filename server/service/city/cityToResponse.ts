import { Response, City, CreateCity, UpdateCity } from '$/types'

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

export const createCityToResponse = (city: CreateCity): Response<CreateCity> => {
  return {
    ...city,
  }
}

export const updateCityToResponse = (city: UpdateCity): Response<UpdateCity> => {
  return {
    ...city,
    startedAt: city.startedAt.toISOString(),
  }
}
