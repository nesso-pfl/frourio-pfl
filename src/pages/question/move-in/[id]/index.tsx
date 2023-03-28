import { mockQuestions } from '@/server/mocks'
import { Answer } from '@/server/types/question'
import { CheckboxQuestionCard } from '@/src/features/question'
import { YesNoQuestionCard } from '@/src/features/question/YesNoQuestionCard'
import { Breadcrumb } from '@/src/features/ui'
import { pagesPath } from '@/src/utils/$path'
import { Box, Center, Spinner } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { LoggedInLayout } from '~/features/layout'

function Page() {
  const router = useRouter()
  const questionId = router.query.id ? +router.query.id : undefined
  const question = mockQuestions().find((question) => question.id === questionId)
  const sendAnswer = async (value: Answer) => {
    console.log(value)
  }

  return question ? (
    <Box pt={5}>
      <Breadcrumb
        links={[
          { href: pagesPath.$url(), label: 'トップ' },
          { href: pagesPath.question.move_in.$url(), label: '転入' },
        ]}
      />
      {question.answerType === 'yesno' ? (
        <YesNoQuestionCard question={question} onSubmit={sendAnswer} />
      ) : (
        <CheckboxQuestionCard question={question} onSubmit={sendAnswer} />
      )}
    </Box>
  ) : (
    <Center w="100%" h="100%">
      <Spinner size="lg" />
    </Center>
  )
}

export default Page
Page.getLayout = (page: React.ReactElement) => {
  return <LoggedInLayout>{page}</LoggedInLayout>
}
