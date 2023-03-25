import { Response, City, CreateCity, UpdateCity } from '$/types'

export const cityToResponse = (city: City): Response<City> => {
  return {
    ...city,
    startedAt: city.startedAt.toISOString(),
    features: city.features.map((feature) => ({
      ...feature,
      createdAt: feature.createdAt.toISOString(),
      updatedAt: feature.updatedAt.toISOString(),
    })),
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
