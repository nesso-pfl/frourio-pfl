import { Box, Link } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { RegisterForm } from '~/features/account'
import { Card, Container, Heading, Layout } from '~/features/ui'

const Register: NextPage = () => {
  return (
    <Layout>
      <Container pt={32} centerContent>
        <Heading variant="pageTitle">Frourio Pfl にようこそ！</Heading>
        <Card.Container>
          <Card.Body>
            <RegisterForm
              onSubmit={async () => {
                // ログイン処理
              }}
            />
          </Card.Body>
        </Card.Container>
        <Box fontSize="sm" mt={12}>
          アカウント登録がお済みの方は
          <Link as="span" color="primary">
            こちら
          </Link>
        </Box>
      </Container>
    </Layout>
  )
}

export default Register
