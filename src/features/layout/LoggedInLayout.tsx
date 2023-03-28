import { Box } from '@chakra-ui/react'
import { AuthCheck, useLogout } from '../auth'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'

type Props = {
  children: React.ReactNode
}

export const LoggedInLayout: React.FC<Props> = ({ children }) => {
  const { logout } = useLogout()

  return (
    <AuthCheck requiredAuth="loggingIn">
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
