import { mockQuestions } from '$/mocks'
import { Question } from '$/types'

export const findQuestion = (id: number): Question | undefined => {
  // TODO: DB から指定の質問を取得する
  return mockQuestions().find((question) => question.id === id)
}
