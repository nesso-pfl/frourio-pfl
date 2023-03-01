import { pagesPath } from '@/src/utils/$path'
import { Box } from '@chakra-ui/react'
import NextLink from 'next/link'
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
          <Box ml="auto">
            <NextLink href={pagesPath.login.$url()}>
              <Button as="div" variant="primaryOutline">
                ログイン
              </Button>
            </NextLink>
          </Box>
        </Container>
      </Box>
      <Container as="main">{children}</Container>
    </Box>
  )
}
