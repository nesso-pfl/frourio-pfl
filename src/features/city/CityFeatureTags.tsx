import { Badge } from '~/features/ui'
import { HStack } from '@chakra-ui/react'
import { CityFeature, Response } from '@/server/types'

type Props = {
  features: Pick<Response<CityFeature>, 'name'>[]
}

export const CityFeatureTags: React.FC<Props> = ({ features }) => {
  return (
    <HStack spacing={3}>
      {features.map((feature) => (
        <Badge key={feature.name} borderWidth="1px" borderColor="cyan.600" color="cyan.600" bg="white">
          {feature.name}
        </Badge>
      ))}
    </HStack>
  )
}
