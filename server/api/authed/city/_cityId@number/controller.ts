import { findCity, cityToResponse, updateCity, deleteCity, UpdateCityError } from '$/service/city'
import { defineController } from './$relay'

export default defineController({ findCity, updateCity, deleteCity }, ({ findCity, updateCity, deleteCity }) => ({
  get: async ({ params }) => {
    const city = await findCity(params.cityId)
    return !city ? { status: 404 } : { status: 200, body: cityToResponse(city) }
  },
  put: async ({ params, body }) => {
    try {
      const city = await updateCity(params.cityId, body)
      return { status: 200, body: cityToResponse(city) }
    } catch (error) {
      if (error instanceof UpdateCityError) {
        return { status: 400, body: error }
      } else {
        return { status: 500, body: error }
      }
    }
  },
  delete: async ({ params }) => {
    await deleteCity(params.cityId)
    return { status: 204 }
  },
}))
