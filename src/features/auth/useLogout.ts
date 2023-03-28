import { pagesPath } from '@/src/utils/$path'
import { apiClient } from '@/src/utils/apiClient'
import useAspidaSWR from '@aspida/swr'
import { useRouter } from 'next/router'

export const useLogout = () => {
  const { mutate } = useAspidaSWR(apiClient.authed.account.me)
  const router = useRouter()
  const logout = async () => {
    await apiClient.public.logout.$post()
    await mutate(undefined, { revalidate: true })
    await router.push(pagesPath.login.$url())
  }

  return { logout }
}
