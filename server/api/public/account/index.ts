import { Account, CreateAccount } from '$/types'

export type Methods = {
  post: {
    reqBody: CreateAccount
    resBody: Account
  }
}
