export type CityFeature = {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
}

export type CreateCityFeature = Pick<CityFeature, 'name'>
export type CityFeatureQuery = {
  orderBy: 'name:asc' | 'name:desc'
  name: string
}
export type UpdateCityFeature = Pick<CityFeature, 'name'>
