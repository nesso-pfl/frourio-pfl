import { Box } from '@chakra-ui/react'
import { Button } from './Button'
import { Container } from './Container'

type Props = {
  children: React.ReactNode
}

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Box bg="gray.50" minH="100vh">
      <Box as="header" bg="primary">
        <Container display={'flex'} alignItems="center" h="48px">
          <Box as="span" fontSize={'2xl'} color="white" fontWeight="bold">
            Frourio Pfl
          </Box>
          <Button as="div" variant="primaryOutline" ml="auto">
            ログイン
          </Button>
        </Container>
      </Box>
      <Container as="main">{children}</Container>
    </Box>
  )
}
