import { createCity, listCities, cityToResponse } from '$/service/city'
import { defineController } from './$relay'

export default defineController({ createCity, listCities }, ({ createCity, listCities }) => ({
  get: async ({ query }) => {
    const cities = await listCities(query)
    return {
      status: 200,
      body: { cities: cities.map(cityToResponse) },
    }
  },
  post: {
    handler: async ({ body }) => {
      const city = await createCity({ ...body, startedAt: new Date(body.startedAt) })
      return {
        status: 201,
        body: cityToResponse(city),
      }
    },
  },
}))
