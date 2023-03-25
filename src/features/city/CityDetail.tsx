import { Button, DefList, Heading, Modal, NextLink } from '~/features/ui'
import { City, Response } from '@/server/types'
import { Box, Flex, Grid, useDisclosure } from '@chakra-ui/react'
import { useCallback } from 'react'
import { showStartedAt } from './showStartedAt'
import { pagesPath } from '@/src/utils/$path'
import { CityCategoryBadge } from './CityCategoryBadge'
import { CityFeatureTags } from './CityFeatureTags'

type Props = {
  city: Response<City>
  onDeleteCity: (city: Response<City>) => Promise<unknown>
}

export const CityDetail: React.FC<Props> = ({ city, onDeleteCity }) => {
  const deleteModal = useDisclosure()
  const onDeleteCity_ = useCallback(async () => {
    await onDeleteCity(city)
    deleteModal.onClose()
  }, [onDeleteCity, deleteModal])

  return (
    <Box as="article">
      <Flex align="center" mb={3}>
        <Heading as="h3" fontSize="lg" mr={3}>
          {city.name}
        </Heading>
        <CityCategoryBadge category={city.category} />
        <NextLink href={pagesPath.city._id(city.id).$url()} ml="auto">
          <Button as="span">編集</Button>
        </NextLink>
        <Button variant="error" ml={2} onClick={deleteModal.onOpen}>
          削除
        </Button>
        <Modal {...deleteModal}>
          <Heading fontSize="lg" mb={3}>
            ユーザーを削除
          </Heading>
          <Box mb={5}>この操作は取り消せません。よろしいですか？</Box>
          <Grid templateColumns="1fr 1fr" gap={3}>
            <Button variant="gray" onClick={deleteModal.onClose}>
              キャンセル
            </Button>
            <Button variant="error" onClick={onDeleteCity_}>
              ユーザーを削除
            </Button>
          </Grid>
        </Modal>
      </Flex>
      <DefList
        fontSize="sm"
        mb={3}
        items={[
          { key: 'nameKana', term: '名前（かな）', desc: city.nameKana },
          { key: 'startedAt', term: '創立日', desc: showStartedAt(city.startedAt) },
        ]}
      />
      <CityFeatureTags features={city.features} />
    </Box>
  )
}
