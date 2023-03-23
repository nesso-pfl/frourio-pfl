import { City, CreateCity, UpdateCity } from '$/types'

type Option = Partial<City>
export const mockCity = (option?: Option): City => ({
  id: 1,
  name: '東京',
  nameKana: 'とうきょう',
  category: 'local',
  startedAt: new Date(2021, 1, 1, 0, 0, 0, 0),
  features: [],
  createdAt: new Date(2023, 1, 1, 0, 0, 0, 0),
  updatedAt: new Date(2023, 1, 1, 0, 0, 0, 0),
  ...option,
})

type CreateOption = Partial<CreateCity>
export const mockCreateCity = (option?: CreateOption): CreateCity => ({
  name: '東京',
  nameKana: 'とうきょう',
  category: 'local',
  startedAt: new Date(2021, 1, 1, 0, 0, 0, 0),
  features: [],
  ...option,
})

type UpdateOption = Partial<UpdateCity>
export const mockUpdateCity = (option?: UpdateOption): UpdateCity => ({
  name: '東京',
  nameKana: 'とうきょう',
  category: 'local',
  startedAt: new Date(2021, 1, 1, 0, 0, 0, 0),
  features: [],
  ...option,
})
