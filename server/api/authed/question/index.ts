import { PostAnswer, QuestionId, Request, Response } from '$/types'

export type Methods = {
  post: {
    reqBody: Request<PostAnswer>
    resBody: Response<{ nextQuestionId: QuestionId | undefined }>
  }
}
