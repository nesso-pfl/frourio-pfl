import { Box, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import { RegisterForm, useCreateAccount } from '~/features/account'
import { Card, Container, Heading, Layout } from '~/features/ui'
import { pagesPath } from '@/src/utils/$path'
import Head from 'next/head'
import { depend } from 'velona'

const Register = depend({ useCreateAccount }, ({ useCreateAccount }) => {
  const { createAccount } = useCreateAccount()

  return (
    <>
      <Head>
        <title>アカウント登録 | Frourio Pfl</title>
      </Head>
      <Container pt={[12, 32]} centerContent>
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
    </>
  )
})

const Page: typeof Register & { getLayout?: (page: React.ReactElement) => React.ReactNode } = Register
export default Page
Page.getLayout = (page: React.ReactElement) => {
  return <Layout>{page}</Layout>
}
