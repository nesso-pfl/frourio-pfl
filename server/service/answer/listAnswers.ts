import { mockAnswers } from '$/mocks'

export const listAnswers = (latestQuestionId: number) => {
  //TODO: 今までの回答一覧を取得する
  return mockAnswers().filter((answer) => answer.questionId <= latestQuestionId)
}
