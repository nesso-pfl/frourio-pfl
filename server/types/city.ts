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
    page: z.number().optional(),
    limit: z.number().optional(),
    orderBy: z.enum(cityQueryOrderBies).optional(),
    nameOrNameKana: z.string().optional(),
    categories: z.array(z.enum(cityCategories)).optional(),
    features: z.array(z.string()).optional(),
  })
  .optional()
export type CityQuery = z.infer<typeof cityQuerySchema>

export type UpdateCity = Pick<City, 'name' | 'nameKana' | 'category' | 'startedAt'> & { features: string[] }
