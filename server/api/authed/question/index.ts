import { Answer, QuestionId, Request, Response } from '$/types'

export type Methods = {
  post: {
    reqBody: Request<Answer>
    resBody: Response<{ nextQuestionId: QuestionId | undefined }>
  }
}
