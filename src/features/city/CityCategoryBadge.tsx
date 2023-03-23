import { CityCategory } from '@/server/types'
import { Badge } from '~/features/ui'
import { showCategory } from './showCategory'

type Props = {
  category: CityCategory
}

const styles: Record<CityCategory, React.ComponentProps<typeof Badge>> = {
  local: {
    bg: 'white',
    borderWidth: '1px',
    borderColor: 'pink.600',
    color: 'pink.600',
    children: showCategory('local'),
  },
  legend: {
    bg: 'white',
    borderWidth: '1px',
    borderColor: 'purple.600',
    color: 'purple.600',
    children: showCategory('legend'),
  },
}

export const CityCategoryBadge: React.FC<Props> = ({ category }) => {
  return <Badge {...styles[category]} />
}
