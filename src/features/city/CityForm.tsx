import { cityCategories, CreateCity, createCitySchema } from '@/server/types/city'
import { VStack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { Button, Datepicker, Form, Input, MultiSelect, RadioGroup } from '../ui'
import { SubmitError } from '../form'
import { showCategory } from './showCategory'

type Props = {
  defaultValues?: Partial<CreateCity>
  isEdit?: boolean
  onSubmit: (formValues: CreateCity) => Promise<SubmitError<CreateCity> | undefined>
}

export const CityForm: React.FC<Props> = ({ defaultValues, isEdit, onSubmit }) => {
  const {
    register,
    control,
    formState: { errors, isSubmitting },
    setError,
    handleSubmit,
  } = useForm<CreateCity>({ defaultValues, resolver: zodResolver(createCitySchema) })

  const onSubmit_ = async (formValues: CreateCity) => {
    const error = await onSubmit(formValues)
    if (error) {
      setError(error.field, { message: error.message })
    }
  }

  return (
    <Form.Container onSubmit={handleSubmit(onSubmit_)}>
      <VStack spacing={5} mb={8}>
        <Form.Item isInvalid={!!errors.name?.message}>
          <Form.Label>名前</Form.Label>
          <Input {...register('name')} />
          <Form.ErrorMessage>{errors.name?.message}</Form.ErrorMessage>
        </Form.Item>
        <Form.Item isInvalid={!!errors.nameKana?.message}>
          <Form.Label>名前（かな）</Form.Label>
          <Input {...register('nameKana')} />
          <Form.ErrorMessage>{errors.nameKana?.message}</Form.ErrorMessage>
        </Form.Item>
        <Form.Item isInvalid={!!errors.category?.message}>
          <Form.Label>町種別</Form.Label>
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <RadioGroup
                {...field}
                options={cityCategories.map((category) => ({ label: showCategory(category), value: category }))}
              />
            )}
          />
          <Form.ErrorMessage>{errors.category?.message}</Form.ErrorMessage>
        </Form.Item>
        <Form.Item isInvalid={!!errors.startedAt?.message}>
          <Form.Label>創立日</Form.Label>
          <Controller
            control={control}
            name="startedAt"
            render={({ field }) => (
              <Datepicker
                selected={field.value ? new Date(field.value) : undefined}
                onChange={(date) => field.onChange(date ? date.toISOString() : undefined)}
              />
            )}
          />
          <Form.ErrorMessage>{errors.startedAt?.message}</Form.ErrorMessage>
        </Form.Item>
        <Form.Item isInvalid={!!errors.features?.message}>
          <Form.Label>特徴</Form.Label>
          <Controller
            control={control}
            name="features"
            render={({ field }) => (
              <MultiSelect
                options={['広い', '狭い'].map((feature) => ({ value: feature, label: feature }))}
                formatCreateLabel={(feature) => `${feature} を追加`}
                defaultValue={defaultValues?.features?.map((feature) => ({ value: feature, label: feature }))}
                onChange={(features) => field.onChange(features.map((feature) => feature.value))}
              />
            )}
          />
          <Form.ErrorMessage>{errors.features?.message}</Form.ErrorMessage>
        </Form.Item>
      </VStack>
      <Button type="submit" isDisabled={isSubmitting} size="md" w="100%">
        {isEdit ? '編集' : '作成'}
      </Button>
    </Form.Container>
  )
}
