import { Box } from '@chakra-ui/react'
import { Container, Heading, Layout } from '~/features/ui'
import Head from 'next/head'

export default function Page() {
  return (
    <>
      <Head>
        <title>パスワード再設定メール送信完了 | Frourio Pfl</title>
      </Head>
      <Container pt={[12, 32]} centerContent>
        <Heading variant="pageTitle">パスワード再設定メール送信完了</Heading>
        <Box>ご入力いただいたメールアドレスにパスワード再設定メールを送信しました。</Box>
        <Box>メールに添付されたリンクをクリックして、パスワードの再設定を完了させてください。</Box>
      </Container>
    </>
  )
}

Page.getLayout = (page: React.ReactElement) => {
  return <Layout>{page}</Layout>
}
