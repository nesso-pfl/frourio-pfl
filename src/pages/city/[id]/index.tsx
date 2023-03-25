import Head from 'next/head'
import { pagesPath } from '~/utils/$path'
import { Center, Spinner } from '@chakra-ui/react'
import { AuthCheck } from '~/features/account'
import { Layout, Breadcrumb, Heading, Card } from '~/features/ui'
import useAspidaSWR from '@aspida/swr'
import { apiClient } from '@/src/utils/apiClient'
import { useRouter } from 'next/router'
import { CityDetail, useDeleteCity } from '@/src/features/city'

export default function Page() {
  const router = useRouter()
  const cityId = router.query.id ? +router.query.id : undefined
  // cityId が undefined ならば必ず fetch しない
  const { data: city } = useAspidaSWR(apiClient.authed.city._cityId(cityId as number), {
    key: () => (cityId ? apiClient.authed.city._cityId(cityId).$path() : null),
  })

  const { deleteCity } = useDeleteCity(cityId)

  return (
    <>
      <Head>
        <title>町詳細 | Frourio Pfl</title>
      </Head>
      <Breadcrumb
        my={3}
        links={[
          { href: pagesPath.$url(), label: 'トップ' },
          { href: pagesPath.city.$url(), label: '町一覧' },
          { href: pagesPath.city._id(cityId as number).$url(), label: '町詳細' },
        ]}
      />
      <Heading variant="pageTitle">町詳細</Heading>
      <Card.Container flex={1} mb={12}>
        <Card.Body py={8}>
          {city ? (
            <CityDetail city={city} onDeleteCity={deleteCity} />
          ) : (
            <Center>
              <Spinner size="lg" />
            </Center>
          )}
        </Card.Body>
      </Card.Container>
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
