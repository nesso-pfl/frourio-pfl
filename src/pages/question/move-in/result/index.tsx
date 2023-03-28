import { Breadcrumb, Card, Container, Heading } from '@/src/features/ui'
import { pagesPath } from '@/src/utils/$path'
import { Box } from '@chakra-ui/react'
import { LoggedInLayout } from '~/features/layout'

// TODO: 適当な型定義してモック書いてみる

function Page() {
  return (
    <Box pt={5}>
      <Breadcrumb
        links={[
          { href: pagesPath.$url(), label: 'トップ' },
          { href: pagesPath.question.move_in.$url(), label: '転入' },
        ]}
      />
      <Container centerContent>
        <Heading variant="pageTitle" fontSize="3xl" my={8}>
          結果
        </Heading>
        <Card.Container>
          <Card.Body display="flex" flexDirection="column" alignItems="center" py={16}>
            TODO
          </Card.Body>
        </Card.Container>
      </Container>
    </Box>
  )
}

export default Page
Page.getLayout = (page: React.ReactElement) => {
  return <LoggedInLayout>{page}</LoggedInLayout>
}
