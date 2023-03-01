export { createUserErrorCodes } from './user'
export type { User, CreateUser, CreateUserErrorCode } from './user'
export { createAccountErrorCodes } from './account'
export type { Account, CreateAccount, CreateAccountErrorCode, DeleteAccount } from './account'
export type UserInfo = {
  id: string
  name: string
  icon: string
}

export type AuthHeader = {
  authorization: string
}
