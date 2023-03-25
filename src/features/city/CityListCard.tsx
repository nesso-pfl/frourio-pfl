import { pagesPath } from '~/utils/$path'
import { Box, Center, Divider, Flex, Spinner, VStack } from '@chakra-ui/react'
import { Card, Container, HLinks } from '~/features/ui'
import { City, CityQuery, Response } from '@/server/types'
import { CitySummary } from '@/src/features/city'

type Props = {
  cityQuery?: CityQuery
  totalCount?: number
  cities?: Response<City>[]
} & Omit<React.ComponentProps<typeof Card.Container>, 'children'>

export const CityListCard: React.FC<Props> = ({ cityQuery, totalCount, cities, ...restProps }) => {
  const cityQueryOrderBy = cityQuery?.orderBy ?? 'nameKana:asc'
  return (
    <Card.Container {...restProps}>
      <Card.Body>
        <Flex borderBottomWidth="1px" borderBottomColor="gray.200" mb={8}>
          <Flex align="center" fontSize="sm" mr={3}>
            検索結果:{totalCount?.toLocaleString()}件
          </Flex>
          <HLinks
            links={[
              {
                label: '名前順',
                href: pagesPath.city.$url({ query: { ...cityQuery, orderBy: 'nameKana:asc' } }),
              },
              {
                label: '創立日順',
                href: pagesPath.city.$url({ query: { ...cityQuery, orderBy: 'startedAt:desc' } }),
              },
            ]}
            itemProps={(link) => ({
              color: cityQueryOrderBy === link.href.query?.orderBy ? 'primary' : 'initial',
              borderBottomColor: cityQueryOrderBy === link.href.query?.orderBy ? 'primary' : 'transparent',
            })}
          />
        </Flex>
        {!cities ? (
          <Center>
            <Spinner size="lg" />
          </Center>
        ) : cities.length === 0 ? (
          <Box>検索結果は0件です</Box>
        ) : (
          <VStack spacing={5} divider={<Divider color="gray.50" />}>
            {cities?.map((city) => (
              <Container key={city.id} px={0}>
                <CitySummary city={city} />
              </Container>
            ))}
          </VStack>
        )}
      </Card.Body>
    </Card.Container>
  )
}
