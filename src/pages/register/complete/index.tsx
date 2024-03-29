import { Box } from '@chakra-ui/react'
import { Container, Heading } from '~/features/ui'
import { NotLoggedInLayout } from '~/features/layout'
import Head from 'next/head'

export default function Page() {
  return (
    <>
      <Head>
        <title>アカウント仮登録完了 | Frourio Pfl</title>
      </Head>
      <Container pt={[12, 32]} centerContent>
        <Heading variant="pageTitle">アカウント仮登録完了</Heading>
        <Box>ご登録いただいたメールアドレスに確認メールを送信しました。</Box>
        <Box>メールに添付されたリンクをクリックして、アカウント登録を完了させてください。</Box>
      </Container>
    </>
  )
}

Page.getLayout = (page: React.ReactElement) => {
  return <NotLoggedInLayout>{page}</NotLoggedInLayout>
}
