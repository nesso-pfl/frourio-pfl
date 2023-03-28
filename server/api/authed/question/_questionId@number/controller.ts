import { findQuestion } from '$/service/question'
import { defineController } from './$relay'

export default defineController({ findQuestion }, ({ findQuestion }) => ({
  get: ({ params }) => {
    const question = findQuestion(params.questionId)
    if (!question) return { status: 404 }

    return { status: 200, body: question }
  },
}))
