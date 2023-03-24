import { createCity, listCities, cityToResponse } from '$/service/city'
import { defineController } from './$relay'

export default defineController({ createCity, listCities }, ({ createCity, listCities }) => ({
  get: async ({ query }) => {
    const listedCities = await listCities(query)
    return {
      status: 200,
      body: { totalCount: listedCities.totalCount, cities: listedCities.cities.map(cityToResponse) },
    }
  },
  post: {
    handler: async ({ body }) => {
      const city = await createCity(body)
      return {
        status: 201,
        body: cityToResponse(city),
      }
    },
  },
}))
