import { verifyEmail, VerifyEmailError, VerifyEmailErrorCode } from '@/src/lib/firebase'
import { Box, Center, Heading, Spinner } from '@chakra-ui/react'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import { Layout } from '../layout'

type PageState =
  | {
      status: 'loading' | 'success'
      data?: undefined
    }
  | {
      status: 'error'
      data: VerifyEmailErrorCode | 'unknown-error'
    }

const showError = (error: VerifyEmailErrorCode | 'unknown-error') => {
  switch (error) {
    case 'INVALID_OOB_CODE':
      return 'ログイン画面からログインし、 送信された確認メールからメールアドレスの確認を再度お試しください。'
    case 'unknown-error':
      return 'ログイン画面からログインし、 送信された確認メールからメールアドレスの確認を再度お試しください。'
  }
}

type Props = {
  code: string
}

export const VerifyEmail: React.FC<Props> = ({ code }) => {
  const processed = useRef(false)
  const [pageState, setPageState] = useState<PageState>({ status: 'loading' })

  useEffect(() => {
    if (processed.current) return
    processed.current = true

    const verifyEmail_ = async () => {
      try {
        await verifyEmail(code)
        setPageState({ status: 'success' })
      } catch (error) {
        if (error instanceof VerifyEmailError) {
          setPageState({ status: 'error', data: error.code })
        } else {
          setPageState({ status: 'error', data: 'unknown-error' })
        }
      }
    }

    verifyEmail_()
  }, [code])

  switch (pageState.status) {
    case 'loading':
      return (
        <Center w="100vw" h="100vh">
          <Spinner size="xl" />
        </Center>
      )
    case 'success':
      return (
        <Layout>
          <Head>
            <title>メールアドレス確認完了 | Frourio Pfl</title>
          </Head>
          <Center flexDirection="column" pt="10vh">
            <Heading fontSize="xl" textAlign="center" mb="25px">
              メールアドレスの確認が完了しました。
            </Heading>
            <Box as="p">ログインページからログインしてください。</Box>
          </Center>
        </Layout>
      )
    case 'error':
      return (
        <Layout>
          <Center flexDirection="column" pt="10vh">
            <Heading fontSize="xl" textAlign="center" mb="25px">
              メールアドレスの確認ができませんでした。
            </Heading>
            <Box as="p">{showError(pageState.data)}</Box>
          </Center>
        </Layout>
      )
  }
}
