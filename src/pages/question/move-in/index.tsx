import { Breadcrumb, Button, Card, Container, Heading } from '@/src/features/ui'
import { pagesPath } from '@/src/utils/$path'
import { Box } from '@chakra-ui/react'
import { LoggedInLayout } from '~/features/layout'

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
          転入
        </Heading>
        <Card.Container>
          <Card.Body display="flex" flexDirection="column" alignItems="center" py={16}>
            <Box as="p" mb={16}>
              市外または市内他区から引越しをする際に名古屋市で必要となる手続きを洗い出します。
            </Box>
            <Button size="lg" w="50%">
              回答を始める
            </Button>
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
