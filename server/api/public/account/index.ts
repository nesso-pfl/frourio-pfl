import { Account, CreateAccount } from '$/service/account'

export type Methods = {
  post: {
    reqBody: CreateAccount
    resBody: Account
  }
}
