import { Card, Container, Heading, Layout } from '~/features/ui'
import { pagesPath } from '@/src/utils/$path'
import Head from 'next/head'
import { useCallback } from 'react'
import { Form, SendPasswordResetEmailForm } from '@/src/features/auth/SendPasswordResetEmailForm'
import { sendPasswordResetEmail } from '@/src/lib/firebase'
import { useRouter } from 'next/router'

export default function Page() {
  const router = useRouter()
  const handleSubmit = useCallback(
    async (formValues: Form) => {
      await sendPasswordResetEmail(formValues.email)
      await router.push(pagesPath.password_reset.complete.$url())
    },
    [sendPasswordResetEmail],
  )
  return (
    <>
      <Head>
        <title>パスワードをリセット | Frourio Pfl</title>
      </Head>
      <Container pt={[12, 32]} centerContent>
        <Heading variant="pageTitle">パスワードをリセット</Heading>
        <Card.Container>
          <Card.Body>
            <SendPasswordResetEmailForm onSubmit={handleSubmit} />
          </Card.Body>
        </Card.Container>
      </Container>
    </>
  )
}

Page.getLayout = (page: React.ReactElement) => {
  return <Layout>{page}</Layout>
}
