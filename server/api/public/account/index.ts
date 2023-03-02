import { Account, CreateAccount, Request, Response } from '$/types'

export type Methods = {
  post: {
    reqBody: Request<CreateAccount>
    resBody: Response<Account>
  }
}
