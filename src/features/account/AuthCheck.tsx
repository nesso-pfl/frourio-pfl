import { pagesPath } from '~/utils/$path'
import { apiClient } from '~/utils/apiClient'
import useAspidaSWR from '@aspida/swr'
import { Center, Spinner } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'

type Props = {
  children: React.ReactNode
}

export const AuthCheck: React.FC<Props> = ({ children }) => {
  const router = useRouter()
  const { data, error } = useAspidaSWR(apiClient.authed.account.me, {
    onError: () => {
      router.replace(pagesPath.login.$url())
    },
  })

  // SWR の data による re-rendering がやかましいため副作用が重複発生してしまう。その対策としての ref
  const hasRedirected = useRef(false)
  useEffect(() => {
    if (error) {
      hasRedirected.current = true
      router.replace(pagesPath.login.$url())
    }
  }, [router])

  return data ? (
    <>{children}</>
  ) : (
    <Center w="100vw" h="100vh">
      <Spinner size="xl" />
    </Center>
  )
}
