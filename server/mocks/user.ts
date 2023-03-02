import { CreateUser, User } from '$/types'

type Option = Partial<User>
export const mockUser = (option?: Option): User => ({
  id: 1,
  firebaseUid: 'firebaseUid',
  createdAt: new Date(2023, 1, 1, 0, 0, 0, 0),
  updatedAt: new Date(2023, 1, 1, 0, 0, 0, 0),
  ...option,
})

type CreateOption = Partial<CreateUser>
export const mockCreateUser = (option?: CreateOption): CreateUser => ({
  firebaseUid: 'firebaseUid',
  ...option,
})
