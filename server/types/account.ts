export type Account = {
  firebaseUid: string
  email: string
  emailVerified: boolean
}

export type CreateAccount = Pick<Account, 'email'> & {
  password: string
}
export const createAccountErrorCodes = ['auth/invalid-password', 'auth/email-already-exists'] as const
export type CreateAccountErrorCode = (typeof createAccountErrorCodes)[number]

export type DeleteAccount = Pick<Account, 'firebaseUid'>
