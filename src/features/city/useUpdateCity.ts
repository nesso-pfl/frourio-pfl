import { UpdateCity, updateCityErrorCodes } from '@/server/types'
import { pagesPath } from '@/src/utils/$path'
import { apiClient } from '@/src/utils/apiClient'
import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { z } from 'zod'

const updateCityErrorSchema = z.object({
  response: z.object({
    data: z.object({
      code: z.enum(updateCityErrorCodes),
    }),
  }),
})

export const useUpdateCity = () => {
  const router = useRouter()
  const cityId = router.query.id ? +router.query.id : undefined
  const successToast = useToast()
  const errorToast = useToast({ status: 'error' })
  const updateCity = async (formValues: UpdateCity) => {
    try {
      if (!cityId) throw new Error('cityId should be defined.')
      await apiClient.authed.city._cityId(cityId).$put({ body: formValues })
      await router.push(pagesPath.city.$url())
      successToast({ description: '町を編集しました。' })
    } catch (error) {
      const result = updateCityErrorSchema.safeParse(error)
      if (result.success) {
        switch (result.data.response.data.code) {
          case 'unique-name':
            return { field: 'name', message: 'この名前は既に使われています' } as const
          case 'unique-nameKana':
            return { field: 'nameKana', message: 'この名前は既に使われています' } as const
        }
      } else {
        errorToast({ description: '町の編集に失敗しました。しばらく待ってから再度お試しください。' })
      }
    }
  }

  return { updateCity }
}
