export type { User, CreateUser } from './user'
export type { Account, CreateAccount } from './account'
export type UserInfo = {
  id: string
  name: string
  icon: string
}

export type AuthHeader = {
  authorization: string
}
