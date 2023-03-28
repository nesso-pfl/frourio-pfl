import { Answer } from '$/types'

export const findNextQuestionId = (answers: Answer[]): number | undefined => {
  const lastAnswer = answers.at(-1)
  // TODO: 今までの回答内容から次の質問を決定する
  const nextQuestionId = (lastAnswer?.questionId ?? 1) + 1
  return nextQuestionId
}
