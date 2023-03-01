import { Box, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import type { NextPage } from 'next'
import { RegisterForm, useCreateAccount } from '~/features/account'
import { Card, Container, Heading, Layout } from '~/features/ui'
import { pagesPath } from '@/src/utils/$path'

const Register: NextPage = () => {
  const { createAccount } = useCreateAccount()

  return (
    <Layout>
      <Container pt={32} centerContent>
        <Heading variant="pageTitle">Frourio Pfl にようこそ！</Heading>
        <Card.Container>
          <Card.Body>
            <RegisterForm onSubmit={createAccount} />
          </Card.Body>
        </Card.Container>
        <Box fontSize="sm" mt={12}>
          アカウント登録がお済みの方は
          <NextLink href={pagesPath.login.$url()}>
            <Link as="span" color="primary">
              こちら
            </Link>
          </NextLink>
        </Box>
      </Container>
    </Layout>
  )
}

export default Register
