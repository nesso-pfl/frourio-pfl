import Head from 'next/head'
import { pagesPath } from '~/utils/$path'
import { AuthCheck } from '~/features/account'
import { Layout, Breadcrumb, Heading, Container, Card } from '~/features/ui'
import { CityForm, useCreateCity } from '@/src/features/city'

export default function Page() {
  const { createCity } = useCreateCity()

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
