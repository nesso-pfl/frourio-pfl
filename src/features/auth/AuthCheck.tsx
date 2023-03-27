import { pagesPath } from '~/utils/$path'
import { apiClient } from '~/utils/apiClient'
import useAspidaSWR from '@aspida/swr'
import { Center, Spinner } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { UrlObject } from 'url'

type AuthState = 'notLoggingIn' | 'loggingIn'
const redirectPathMap: Record<AuthState, UrlObject> = {
  notLoggingIn: pagesPath.$url(),
  loggingIn: pagesPath.login.$url(),
}

type Props = {
  requiredAuth: AuthState
  children: React.ReactNode
}

export const AuthCheck: React.FC<Props> = ({ children, requiredAuth }) => {
  const router = useRouter()
  const { data, error } = useAspidaSWR(apiClient.authed.account.me, {
    errorRetryCount: 0,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  const isLoaded = data || error
  const shouldRedirect = (requiredAuth === 'loggingIn' && error) || (requiredAuth === 'notLoggingIn' && data)
  useEffect(() => {
    if (shouldRedirect) {
      router.replace(redirectPathMap[requiredAuth])
    }
  }, [shouldRedirect, router, requiredAuth])

  return isLoaded && !shouldRedirect ? (
    <>{children}</>
  ) : (
    <Center w="100vw" h="100vh">
      <Spinner size="xl" />
    </Center>
  )
}
