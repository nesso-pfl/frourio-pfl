import { pagesPath } from '@/src/utils/$path'
import { apiClient } from '@/src/utils/apiClient'
import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { AuthCheck } from '../auth'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'

type Props = {
  children: React.ReactNode
}

export const LoggedInLayout: React.FC<Props> = ({ children }) => {
  const router = useRouter()
  const logout = async () => {
    await apiClient.public.logout.$post()
    await router.push(pagesPath.login.$url())
  }

  return (
    <AuthCheck>
      <Box bg="gray.50" minH="100vh">
        <Box as="header" bg="primary">
          <Container display={'flex'} alignItems="center" h="48px">
            <Box as="span" fontSize={'2xl'} color="white" fontWeight="bold">
              Frourio Pfl
            </Box>
            <Box ml="auto">
              <Button variant="errorLight" onClick={logout}>
                ログアウト
              </Button>
            </Box>
          </Container>
        </Box>
        <Container as="main">{children}</Container>
      </Box>
    </AuthCheck>
  )
}
