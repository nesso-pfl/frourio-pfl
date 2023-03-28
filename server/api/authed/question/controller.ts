import { listAnswers } from '$/service/answer'
import { findNextQuestionId } from '$/service/question'
import { defineController } from './$relay'

export default defineController({ listAnswers, findNextQuestionId }, ({ listAnswers, findNextQuestionId }) => ({
  post: ({ body }) => {
    const answers = listAnswers(body)
    const nextQuestionId = findNextQuestionId(answers)

    return { status: 200, body: { nextQuestionId } }
  },
}))
