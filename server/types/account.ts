import { AppError } from './utils'

export type Account = {
  firebaseUid: string
  email: string
  emailVerified: boolean
}

export type CreateAccount = Pick<Account, 'email'> & {
  password: string
}
export const createAccountErrorCodes = ['auth/invalid-password', 'auth/email-already-exists'] as const
type CreateAccountErrorCode = (typeof createAccountErrorCodes)[number]
export class CreateAccountError extends AppError<CreateAccountErrorCode> {}

export type DeleteAccount = Pick<Account, 'firebaseUid'>
