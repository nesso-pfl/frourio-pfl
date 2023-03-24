import Head from 'next/head'
import { pagesPath } from '~/utils/$path'
import { AuthCheck } from '~/features/account'
import { Layout, Breadcrumb, Heading, Container, Card } from '~/features/ui'
import { apiClient } from '@/src/utils/apiClient'
import { useRouter } from 'next/router'
import { CreateCity } from '@/server/types'
import { CityForm } from '@/src/features/city'
import { useToast } from '@chakra-ui/react'

export default function Page() {
  const router = useRouter()
  const successToast = useToast()
  const errorToast = useToast({ status: 'error' })
  const createCity = async (formValues: CreateCity) => {
    try {
      await apiClient.authed.city.$post({ body: formValues })
      await router.push(pagesPath.city.$url())
      successToast({ description: '町を作成しました。' })
    } catch {
      errorToast({ description: '町の作成に失敗しました。しばらく待ってから再度お試しください。' })
    }
  }

  return (
    <>
      <Head>
        <title>町作成 | Frourio Pfl</title>
      </Head>
      <Breadcrumb
        my={3}
        links={[
          { href: pagesPath.$url(), label: 'トップ' },
          { href: pagesPath.city.$url(), label: '町一覧' },
          { href: pagesPath.city.new.$url(), label: '町作成' },
        ]}
      />
      <Container pt={[12, 32]} px={0} centerContent>
        <Heading variant="pageTitle">町作成</Heading>
        <Card.Container minW={['100%', '450px']}>
          <Card.Body>
            <CityForm onSubmit={createCity} />
          </Card.Body>
        </Card.Container>
      </Container>
    </>
  )
}

Page.getLayout = (page: React.ReactElement) => {
  return (
    <AuthCheck>
      <Layout>{page}</Layout>
    </AuthCheck>
  )
}
