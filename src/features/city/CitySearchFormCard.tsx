import { cityCategories, CityQuery, cityQuerySchema } from '@/server/types'
import { VStack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { Button, Card, CheckboxGroup, Form, Heading, Input } from '../ui'
import { showCategory } from './showCategory'

type Props = {
  defaultValues?: Partial<CityQuery>
  onSubmit: (formValues: CityQuery) => Promise<unknown>
}

export const CitySearchFormCard: React.FC<Props> = ({ defaultValues, onSubmit }) => {
  const {
    register,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<CityQuery>({ defaultValues, resolver: zodResolver(cityQuerySchema) })

  return (
    <Card.Container>
      <Card.Body>
        <Heading variant="cardTitle">絞り込み</Heading>
        <Form.Container onSubmit={handleSubmit(onSubmit)}>
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
      </Card.Body>
    </Card.Container>
  )
}
