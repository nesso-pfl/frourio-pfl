import Head from 'next/head'
import { Layout } from '../layout'
import { Card, Container, Heading } from '../ui'
import { PasswordResetForm } from './PasswordResetForm'
import { useResetPassword } from './useResetPassword'

type Props = {
  code: string
}

export const PasswordReset: React.FC<Props> = ({ code }) => {
  const { resetPassword } = useResetPassword({ code })

  return (
    <Layout>
      <Head>
        <title>パスワード再設定 | Frourio Pfl</title>
      </Head>
      <Container pt={[12, 32]} centerContent>
        <Heading variant="pageTitle">パスワード再設定</Heading>
        <Card.Container>
          <Card.Body>
            <PasswordResetForm onSubmit={resetPassword} />
          </Card.Body>
        </Card.Container>
      </Container>
    </Layout>
  )
}
