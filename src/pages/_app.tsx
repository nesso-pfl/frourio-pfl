import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { staticPath } from '~/utils/$path'
import { chakraTheme } from '~/features/ui'
import { NextPage } from 'next'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <>
      <Head>
        <link rel="icon" href={staticPath.favicon_png} />
      </Head>
      <ChakraProvider theme={chakraTheme}>{getLayout(<Component {...pageProps} />)}</ChakraProvider>
    </>
  )
}

export default MyApp
