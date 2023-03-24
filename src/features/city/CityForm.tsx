import { cityCategories, CreateCity, createCitySchema } from '@/server/types/city'
import { VStack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { Button, Datepicker, Form, Input, RadioGroup } from '../ui'
import { showCategory } from './showCategory'
import ReactSelect from 'react-select/creatable'

type Props = {
  defaultValues?: Partial<CreateCity>
  isEdit?: boolean
  onSubmit: (formValues: CreateCity) => Promise<unknown>
}

export const CityForm: React.FC<Props> = ({ defaultValues, isEdit, onSubmit }) => {
  const {
    register,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<CreateCity>({ defaultValues, resolver: zodResolver(createCitySchema) })

  return (
    <Form.Container onSubmit={handleSubmit(onSubmit, (e) => console.log(e))}>
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
                placeholderText="年/月/日"
                dateFormat="yyyy/MM/dd"
                selected={field.value ? new Date(field.value) : undefined}
                onChange={(date) => field.onChange(date ? date.toISOString() : undefined)}
                customInput={<Input />}
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
              <ReactSelect
                placeholder="選択してください"
                noOptionsMessage={() => <>検索結果はありません</>}
                isMulti
                isClearable
                isSearchable
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
