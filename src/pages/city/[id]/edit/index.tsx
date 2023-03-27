import Head from 'next/head'
import { pagesPath } from '~/utils/$path'
import { Breadcrumb, Heading, Container, Card } from '~/features/ui'
import { LoggedInLayout } from '~/features/layout'
import { apiClient } from '@/src/utils/apiClient'
import { useRouter } from 'next/router'
import { CityForm, useUpdateCity } from '@/src/features/city'
import useAspidaSWR from '@aspida/swr'

export default function Page() {
  const router = useRouter()
  const cityId = router.query.id ? +router.query.id : undefined
  // cityId が undefined ならば必ず fetch しない
  const { data: city } = useAspidaSWR(apiClient.authed.city._cityId(cityId as number), {
    key: () => (cityId ? apiClient.authed.city._cityId(cityId).$path() : null),
  })
  const defaultValues = { ...city, features: city?.features.map((feature) => feature.name) }
  const { updateCity } = useUpdateCity()

  return (
    <>
      <Head>
        <title>町編集 | Frourio Pfl</title>
      </Head>
      <Breadcrumb
        my={3}
        links={[
          { href: pagesPath.$url(), label: 'トップ' },
          { href: pagesPath.city.$url(), label: '町一覧' },
          { href: pagesPath.city._id(cityId as number).$url(), label: '町詳細' },
          { href: pagesPath.city._id(cityId as number).edit.$url(), label: '町編集' },
        ]}
      />
      <Container pt={[5, 32]} px={0} centerContent>
        <Heading variant="pageTitle" mb={5}>
          町編集
        </Heading>
        <Card.Container minW={['100%', '450px']}>
          <Card.Body>
            <CityForm
              isEdit
              // defaultValues が変更される度に Form を remount しないと Form に defaultValues が反映されない
              // ref: https://react-hook-form.com/faqs/#Whyisdefaultvaluenotchangingcorrectlywithternaryoperator
              key={JSON.stringify(defaultValues)}
              defaultValues={defaultValues}
              onSubmit={updateCity}
            />
          </Card.Body>
        </Card.Container>
      </Container>
    </>
  )
}

Page.getLayout = (page: React.ReactElement) => {
  return <LoggedInLayout>{page}</LoggedInLayout>
}
