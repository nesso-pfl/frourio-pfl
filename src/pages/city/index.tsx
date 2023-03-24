import Head from 'next/head'
import { pagesPath } from '~/utils/$path'
import { Box, Center, Grid } from '@chakra-ui/react'
import { AuthCheck } from '~/features/account'
import { Layout, Breadcrumb, Heading, Pagination } from '~/features/ui'
import useAspidaSWR from '@aspida/swr'
import { apiClient } from '@/src/utils/apiClient'
import { useRouter } from 'next/router'
import { CityQuery, cityQuerySchema } from '@/server/types'
import { CityListCard, CitySearchFormCard, CitySearchFormModal } from '@/src/features/city'

export type OptionalQuery = CityQuery

export default function Page() {
  const router = useRouter()
  const getCitiesQuery = router.isReady ? cityQuerySchema.parse(router.query) : undefined
  const { data } = useAspidaSWR(apiClient.authed.city, {
    key: () => (getCitiesQuery ? apiClient.authed.city.$path({ query: getCitiesQuery }) : null),
    query: getCitiesQuery,
  })
  const totalCount = data?.totalCount ?? 0
  const cities = data?.cities

  const queryCities = async (formValues: CityQuery) => {
    const query = cityQuerySchema
      // undefined なフィールドを削除
      .transform((val) => JSON.parse(JSON.stringify(val)))
      .parse({ ...router.query, ...formValues })
    await router.push(pagesPath.city.$url({ query }))
  }

  const handleChangePage = async (page: number) => {
    await router.push(pagesPath.city.$url({ query: { ...router.query, page } }))
  }

  return (
    <>
      <Head>
        <title>町一覧 | Frourio Pfl</title>
      </Head>
      <Breadcrumb
        my={3}
        links={[
          { href: pagesPath.$url(), label: 'トップ' },
          { href: pagesPath.city.$url(), label: '町一覧' },
        ]}
      />
      <Heading variant="pageTitle">町一覧</Heading>
      <Grid gap={5} templateColumns={['auto', '1fr 3fr']} templateRows={['auto auto', 'auto']}>
        <Box display={['none', 'block']} minW={['auto', '280px']}>
          <CitySearchFormCard
            // defaultValues が変更される度に Form を remount しないと Form に defaultValues が反映されない
            // ref: https://react-hook-form.com/faqs/#Whyisdefaultvaluenotchangingcorrectlywithternaryoperator
            key={JSON.stringify(getCitiesQuery)}
            defaultValues={getCitiesQuery}
            onSubmit={queryCities}
          />
        </Box>
        <Box display={['block', 'none']}>
          <CitySearchFormModal
            // defaultValues が変更される度に Form を remount しないと Form に defaultValues が反映されない
            // ref: https://react-hook-form.com/faqs/#Whyisdefaultvaluenotchangingcorrectlywithternaryoperator
            key={JSON.stringify(getCitiesQuery)}
            defaultValues={getCitiesQuery}
            onSubmit={queryCities}
          />
        </Box>
        <Box>
          <CityListCard totalCount={totalCount} cities={cities} cityQuery={getCitiesQuery} mb={8} />
          <Center mb={8}>
            <Pagination
              currentPage={getCitiesQuery?.page ?? 1}
              lastPage={Math.ceil(totalCount / 20)}
              onChange={handleChangePage}
            />
          </Center>
        </Box>
      </Grid>
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
