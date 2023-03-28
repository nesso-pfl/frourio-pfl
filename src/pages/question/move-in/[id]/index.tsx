import { AnswerChoice, Question } from '@/server/types/question'
import { CheckboxQuestionCard } from '@/src/features/question'
import { YesNoQuestionCard } from '@/src/features/question/YesNoQuestionCard'
import { Breadcrumb } from '@/src/features/ui'
import { pagesPath } from '@/src/utils/$path'
import { apiClient } from '@/src/utils/apiClient'
import useAspidaSWR from '@aspida/swr'
import { Box, Center, Spinner } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { LoggedInLayout } from '~/features/layout'

function Page() {
  const router = useRouter()
  const questionId = router.query.id ? +router.query.id : undefined
  const { data: question } = useAspidaSWR(apiClient.authed.question._questionId(questionId as number), {
    key: questionId ? apiClient.authed.question._questionId(questionId).$path() : null,
  })
  const sendAnswer = async (value: AnswerChoice) => {
    if (!question) throw new Error('question should be defined')
    const { nextQuestionId } = await apiClient.authed.question.$post({
      body: {
        questionId: question.id,
        answerType: question.answerType,
        answerChoice: value,
      },
    })
    if (nextQuestionId) {
      router.push(pagesPath.question.move_in._id(nextQuestionId).$url())
    } else {
      // 結果がめんへ飛ぶ
    }
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
        <YesNoQuestionCard question={question as Question<'yesno'>} onSubmit={sendAnswer} />
      ) : (
        <CheckboxQuestionCard question={question as Question<'checkbox'>} onSubmit={sendAnswer} />
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
