import { Request, Response } from '$/types'
import { City, UpdateCity } from '$/types'

export type Methods = {
  get: {
    resBody: Response<City>
  }
  put: {
    reqBody: Request<UpdateCity>
    resBody: Response<City>
  }
  delete: {
    status: 204
  }
}
