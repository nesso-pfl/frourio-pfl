import { Button, CheckboxGroup, Form, Input, Modal, NextLink } from '~/features/ui'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Flex, useDisclosure, VStack } from '@chakra-ui/react'
import { cityCategories, CityQuery, cityQuerySchema } from '@/server/types'
import { showCategory } from './showCategory'
import { pagesPath } from '@/src/utils/$path'
import { CitySearchTags } from './CitySearchTags'

type Props = {
  defaultValues?: Partial<CityQuery>
  onSubmit: (formValues: CityQuery) => Promise<unknown>
}

export const CitySearchFormModal: React.FC<Props> = ({ defaultValues, onSubmit }) => {
  const searchModal = useDisclosure()
  const {
    register,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<CityQuery>({ defaultValues, resolver: zodResolver(cityQuerySchema) })

  const onSubmit_ = async (formValues: CityQuery) => {
    await onSubmit(formValues)
    searchModal.onClose()
  }

  return (
    <Box>
      <Flex>
        <Box>
          <Button variant="secondary" onClick={searchModal.onOpen} mb={3}>
            絞り込み
          </Button>
          <CitySearchTags formValues={defaultValues} />
        </Box>
        <NextLink href={pagesPath.city.new.$url()} ml="auto">
          <Button as="span" w="100%">
            新規作成
          </Button>
        </NextLink>
      </Flex>
      <Modal {...searchModal}>
        <Form.Container gap={5} onSubmit={handleSubmit(onSubmit_)}>
          <VStack spacing={5} mb={8}>
            <Form.Item isInvalid={!!errors.nameOrNameKana?.message}>
              <Form.Label>名前</Form.Label>
              <Input {...register('nameOrNameKana')} />
              <Form.ErrorMessage>{errors.nameOrNameKana?.message}</Form.ErrorMessage>
            </Form.Item>
            <Form.Item isInvalid={!!errors.categories?.message}>
              <Form.Label>町種別</Form.Label>
              <Controller
                control={control}
                name="categories"
                render={({ field: { value, onChange } }) => (
                  <CheckboxGroup
                    value={value}
                    onChange={onChange}
                    options={cityCategories.map((category) => ({ label: showCategory(category), value: category }))}
                  />
                )}
              />
              <Form.ErrorMessage>{errors.categories?.message}</Form.ErrorMessage>
            </Form.Item>
          </VStack>
          <Button type="submit" isDisabled={isSubmitting} size="md">
            絞り込む
          </Button>
        </Form.Container>
      </Modal>
    </Box>
  )
}
