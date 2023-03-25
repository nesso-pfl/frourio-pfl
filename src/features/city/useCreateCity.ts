import { CreateCity, createCityErrorCodes } from '@/server/types'
import { pagesPath } from '@/src/utils/$path'
import { apiClient } from '@/src/utils/apiClient'
import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { z } from 'zod'

const createCityErrorSchema = z.object({
  response: z.object({
    data: z.object({
      code: z.enum(createCityErrorCodes),
    }),
  }),
})

export const useCreateCity = () => {
  const router = useRouter()
  const successToast = useToast()
  const errorToast = useToast({ status: 'error' })
  const createCity = async (formValues: CreateCity) => {
    try {
      await apiClient.authed.city.$post({ body: formValues })
      await router.push(pagesPath.city.$url())
      successToast({ description: '町を作成しました。' })
    } catch (error) {
      const result = createCityErrorSchema.safeParse(error)
      if (result.success) {
        switch (result.data.response.data.code) {
          case 'unique-name':
            return { field: 'name', message: 'この名前は既に使われています' } as const
          case 'unique-nameKana':
            return { field: 'nameKana', message: 'この名前は既に使われています' } as const
        }
      } else {
        errorToast({ description: '町の作成に失敗しました。しばらく待ってから再度お試しください。' })
      }
    }
  }

  return { createCity }
}
