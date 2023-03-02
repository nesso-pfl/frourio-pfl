export { createUserErrorCodes } from './user'
export type { User, CreateUser, CreateUserErrorCode } from './user'
export { createAccountErrorCodes } from './account'
export type { Account, CreateAccount, CreateAccountErrorCode, DeleteAccount } from './account'

type DatetimeString = string
export type DateToString<T> = T extends Date
  ? DatetimeString
  : T extends Record<string, unknown> | unknown[]
  ? { [K in keyof T]: DateToString<T[K]> }
  : T

export type Request<T> = DateToString<T>
export type Response<T extends Record<string, unknown>> = DateToString<T>
