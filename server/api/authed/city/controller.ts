import { createCity, listCities, cityToResponse, CreateCityError } from '$/service/city'
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
      try {
        const city = await createCity(body)
        return {
          status: 201,
          body: cityToResponse(city),
        }
      } catch (error) {
        if (error instanceof CreateCityError) {
          return { status: 400, body: error }
        } else {
          return { status: 500, body: error }
        }
      }
    },
  },
}))
