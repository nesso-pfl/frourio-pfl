import { pagesPath } from '@/src/utils/$path'
import { Box, Link } from '@chakra-ui/react'
import Head from 'next/head'
import NextLink from 'next/link'
import { LoginForm, useLogin } from '~/features/auth'
import { Card, Container, Heading } from '~/features/ui'
import { NotLoggedInLayout } from '~/features/layout'

function Login() {
  const { login } = useLogin()

  return (
    <>
      <Head>
        <title>ログイン | Frourio Pfl</title>
      </Head>
      <Container pt={[12, 32]} centerContent>
        <Heading variant="pageTitle">Frourio Pfl にログイン</Heading>
        <Card.Container>
          <Card.Body>
            <LoginForm onSubmit={login} />
          </Card.Body>
        </Card.Container>
        <Box fontSize="sm" mt={8}>
          パスワードをお忘れの方は
          <NextLink href={pagesPath.password_reset.$url()}>
            <Link as="span" color="primary">
              こちら
            </Link>
          </NextLink>
        </Box>
        <Box fontSize="sm" mt={2}>
          アカウント登録がまだの方は
          <NextLink href={pagesPath.register.$url()}>
            <Link as="span" color="primary">
              こちら
            </Link>
          </NextLink>
        </Box>
      </Container>
    </>
  )
}

export default Login
Login.getLayout = (page: React.ReactElement) => {
  return <NotLoggedInLayout>{page}</NotLoggedInLayout>
}
