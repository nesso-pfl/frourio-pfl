export type User = {
  id: number
  firebaseUid: string
  createdAt: Date
  updatedAt: Date
}

export type CreateUser = Pick<User, 'firebaseUid'>
