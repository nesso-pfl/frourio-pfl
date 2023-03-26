import { pagesPath } from '@/src/utils/$path'
import { apiClient } from '@/src/utils/apiClient'
import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export const useDeleteCity = (cityId: number | undefined) => {
  const router = useRouter()
  const successToast = useToast()
  const errorToast = useToast({ status: 'error' })
  const deleteCity = async () => {
    try {
      if (cityId === undefined) throw new Error('cityId should be defined.')
      await apiClient.authed.city._cityId(cityId).$delete()
      await router.push(pagesPath.city.$url())
      successToast({ description: '町を削除しました' })
    } catch {
      errorToast({ description: '町の削除に失敗しました。しばらく待ってから再度お試しください。' })
    }
  }

  return { deleteCity }
}
