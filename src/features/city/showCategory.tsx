import { CityCategory } from '@/server/types'

export const showCategory = (category: CityCategory) => {
  switch (category) {
    case 'local':
      return '普通の都市'
    case 'legend':
      return '伝説の都市'
  }
}
