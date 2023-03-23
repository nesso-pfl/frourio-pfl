import { z } from 'zod'
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

export type CreateCity = Pick<City, 'name' | 'nameKana' | 'category' | 'startedAt'> & { features: string[] }

export const cityQueryOrderBies = ['nameKana:asc', 'nameKana:desc', 'startedAt:asc', 'startedAt:desc'] as const
export type CityQueryOrderBy = (typeof cityQueryOrderBies)[number]
export const cityQuerySchema = z
  .object({
    page: z.coerce.number(),
    limit: z.coerce.number(),
    orderBy: z.enum(cityQueryOrderBies),
    nameOrNameKana: z.string().transform((val) => (val ? val : undefined)),
    categories: z.preprocess((val) => (typeof val === 'string' ? [val] : val), z.enum(cityCategories).array()),
    features: z.preprocess((val) => (typeof val === 'string' ? [val] : val), z.string().array()),
  })
  .partial()
export type CityQuery = z.infer<typeof cityQuerySchema>

export type UpdateCity = Pick<City, 'name' | 'nameKana' | 'category' | 'startedAt'> & { features: string[] }
