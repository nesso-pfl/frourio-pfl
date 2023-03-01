export type User = {
  id: number
  firebaseUid: string
  createdAt: Date
  updatedAt: Date
}

export type CreateUser = Pick<User, 'firebaseUid'>

export const createUserErrorCodes = ['create-user-error'] as const
export type CreateUserErrorCode = (typeof createUserErrorCodes)[number]
