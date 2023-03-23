import { findCity, cityToResponse, updateCity, deleteCity } from '$/service/city'
import { defineController } from './$relay'

export default defineController({ findCity, updateCity, deleteCity }, ({ findCity, updateCity, deleteCity }) => ({
  get: async ({ params }) => {
    const city = await findCity(params.cityId)
    return !city ? { status: 404 } : { status: 200, body: cityToResponse(city) }
  },
  put: async ({ params, body }) => {
    const city = await updateCity(params.cityId, { ...body, startedAt: new Date(body.startedAt) })
    return { status: 200, body: cityToResponse(city) }
  },
  delete: async ({ params }) => {
    await deleteCity(params.cityId)
    return { status: 204 }
  },
}))
