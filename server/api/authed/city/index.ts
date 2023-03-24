import { Request, Response, City, CreateCity, CityQuery } from '$/types'

export type Methods = {
  get: {
    query?: Request<CityQuery>
    resBody: Response<{
      totalCount: number
      cities: City[]
    }>
  }
  post: {
    reqBody: Request<CreateCity>
    resBody: Response<City>
  }
}
