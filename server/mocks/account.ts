import { Account, CreateAccount } from '$/types'

type Option = Partial<Account>
export const mockAccount = (option?: Option): Account => ({
  firebaseUid: 'firebaseUid',
  email: 'test@test.test',
  emailVerified: true,
  ...option,
})

type CreateOption = Partial<CreateAccount>
export const mockCreateAccount = (option?: CreateOption): CreateAccount => ({
  email: 'test@test.test',
  password: 'stringPassword1234',
  ...option,
})
