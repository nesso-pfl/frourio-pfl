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

export const createCityErrorCodes = ['unique-name', 'unique-nameKana'] as const
export type CreateCityErrorCode = (typeof createCityErrorCodes)[number]

export const createCitySchema = z.object({
  name: z.string().min(1, 'この項目は入力必須です'),
  nameKana: z
    .string()
    .min(1, 'この項目は入力必須です')
    .regex(/^[ぁ-んー ]+$/, 'ひらがなで入力してください'),
  category: z.enum(cityCategories, { required_error: 'この項目は入力必須です' }),
  startedAt: z.string({ required_error: 'この項目は入力必須です' }).datetime(),
  features: z.string().array().default([]),
})
export type CreateCity = z.infer<typeof createCitySchema>

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

export type UpdateCity = CreateCity
export const updateCityErrorCodes = createCityErrorCodes
export type UpdateCityErrorCode = CreateCityErrorCode
