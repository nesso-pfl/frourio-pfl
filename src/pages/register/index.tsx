import { Box, Link, useToast } from '@chakra-ui/react'
import NextLink from 'next/link'
import type { NextPage } from 'next'
import { RegisterForm } from '~/features/account'
import { Card, Container, Heading, Layout } from '~/features/ui'
import { pagesPath } from '@/src/utils/$path'
import { apiClient } from '@/src/utils/apiClient'
import { useRouter } from 'next/router'

const Register: NextPage = () => {
  const router = useRouter()
  const successToast = useToast()

  return (
    <Layout>
      <Container pt={32} centerContent>
        <Heading variant="pageTitle">Frourio Pfl にようこそ！</Heading>
        <Card.Container>
          <Card.Body>
            <RegisterForm
              onSubmit={async (formValues) => {
                await apiClient.public.account.$post({ body: formValues })
                await router.push(pagesPath.login.$url())
                successToast({ description: 'アカウントを作成しました' })
              }}
            />
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
