import { pagesPath } from '@/src/utils/$path'
import { Box, Link } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import NextLink from 'next/link'
import { LoginForm } from '~/features/account'
import { Card, Container, Heading, Layout } from '~/features/ui'

const Login: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>ログイン | Frourio Pfl</title>
      </Head>
      <Container pt={32} centerContent>
        <Heading variant="pageTitle">Frourio Pfl にログイン</Heading>
        <Card.Container>
          <Card.Body>
            <LoginForm
              onSubmit={async () => {
                // ログイン処理
              }}
            />
          </Card.Body>
        </Card.Container>
        <Box fontSize="sm" mt={12}>
          アカウント登録がまだの方は
          <NextLink href={pagesPath.register.$url()}>
            <Link as="span" color="primary">
              こちら
            </Link>
          </NextLink>
        </Box>
      </Container>
    </Layout>
  )
}

export default Login
