import { CityFeature } from './cityFeature'

export const cityCategories = ['local', 'legend'] as const
export type CityCategory = (typeof cityCategories)[number]

export type City = {
  id: number
  name: string
  nameKana: string
  category: CityCategory
  startedAt: Date
  features: CityFeature[]
  createdAt: Date
  updatedAt: Date
}

export type CreateCity = Pick<City, 'name' | 'nameKana' | 'category' | 'startedAt' | 'features'>
export type CityQuery = {
  orderBy: 'nameKana:asc' | 'nameKana:desc' | 'startAt:asc' | 'startedAt:desc'
  nameOrNameKana: string
  categories: CityCategory[]
  features: string[]
}
export type UpdateCity = Pick<City, 'name' | 'nameKana' | 'category' | 'startedAt' | 'features'>
