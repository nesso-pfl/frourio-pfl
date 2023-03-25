import { Button, DefList, Heading, NextLink } from '~/features/ui'
import { City, Response } from '$/types'
import { Box, Flex } from '@chakra-ui/react'
import { showStartedAt } from './showStartedAt'
import { CityCategoryBadge } from './CityCategoryBadge'
import { pagesPath } from '@/src/utils/$path'

type Props = {
  city: Response<City>
}

export const CitySummary: React.FC<Props> = ({ city }) => {
  return (
    <Box as="article">
      <Flex align="center" mb={3}>
        <Heading as="h3" fontSize="lg" mr={3}>
          {city.name}
        </Heading>
        <CityCategoryBadge category={city.category} />
        <NextLink href={pagesPath.city._id(city.id).$url()} ml="auto">
          <Button variant="secondary">詳細を見る</Button>
        </NextLink>
      </Flex>
      <DefList
        fontSize="sm"
        mb={3}
        items={[
          { key: 'nameKana', term: '名前（かな）', desc: city.nameKana },
          { key: 'startedAt', term: '創立日', desc: showStartedAt(city.startedAt) },
        ]}
      />
    </Box>
  )
}
