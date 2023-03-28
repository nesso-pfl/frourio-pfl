import { Answer, QuestionId } from '$/types'

// 直近回答した質問の ID と、その質問に対する回答から次の質問の ID を返す
const nextQuestionIdMap: Record<QuestionId, (answers?: Answer[]) => QuestionId | undefined> = {
  1: () => 2,
  2: (answers) => {
    const latestAnswerChoice = answers?.at(-1)?.answerChoice
    if (typeof latestAnswerChoice === 'boolean') throw new Error('latestAnswerChoice must be an array of number')
    return latestAnswerChoice?.includes(1) ? 3 : 4
  },
  3: () => 4,
  4: () => undefined,
}

export const findNextQuestionId = (answers: Answer[]): number | undefined => {
  const lastAnswer = answers.at(-1)
  const latestQuestionId = lastAnswer?.questionId ?? 1
  const nextQuestionId = nextQuestionIdMap[latestQuestionId](answers)
  return nextQuestionId
}
