import { City, CityFeature, CreateCity, UpdateCity } from '$/types'

type FeatureOption = Partial<CityFeature>
const mockCityFeature = (option?: FeatureOption): CityFeature => ({
  id: 1,
  name: '広い',
  createdAt: new Date(2023, 1, 1, 0, 0, 0, 0),
  updatedAt: new Date(2023, 1, 1, 0, 0, 0, 0),
  ...option,
})

type Option = Partial<City>
export const mockCity = (option?: Option): City => ({
  id: 1,
  name: '東京',
  nameKana: 'とうきょう',
  category: 'local',
  startedAt: new Date(2021, 1, 1, 0, 0, 0, 0),
  features: [mockCityFeature({ name: 'きれい' }), mockCityFeature({ name: '広い' })],
  createdAt: new Date(2023, 1, 1, 0, 0, 0, 0),
  updatedAt: new Date(2023, 1, 1, 0, 0, 0, 0),
  ...option,
})

type CreateOption = Partial<CreateCity>
export const mockCreateCity = (option?: CreateOption): CreateCity => ({
  name: '東京',
  nameKana: 'とうきょう',
  category: 'local',
  startedAt: new Date(2021, 1, 1, 0, 0, 0, 0).toISOString(),
  features: ['きれい', '広い'],
  ...option,
})

type UpdateOption = Partial<UpdateCity>
export const mockUpdateCity = (option?: UpdateOption): UpdateCity => ({
  name: '東京',
  nameKana: 'とうきょう',
  category: 'local',
  startedAt: new Date(2021, 1, 1, 0, 0, 0, 0),
  features: ['きれい', '広い'],
  ...option,
})
