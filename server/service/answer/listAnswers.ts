import { mockAnswers } from '$/mocks'
import { Answer, PostAnswer } from '$/types'

export const listAnswers = (answer: PostAnswer): Answer[] => {
  //TODO: 今までの回答一覧を取得する
  const answers = mockAnswers().filter((answer_) => answer_.questionId < answer.questionId)
  const mockAnswer = mockAnswers().find((answer_) => answer_.questionId === answer.questionId)
  if (!mockAnswer) throw new Error('mock answer not found')
  return [
    ...answers,
    {
      ...mockAnswer,
      answerChoice: answer.answerChoice,
    },
  ]
}
