import { CreateUser } from '$/types'
import { createUser } from './createUser'

describe('createUser', () => {
  test('ユーザーが作成できる', async () => {
    const user: CreateUser = {
      firebaseUid: 'firebaseUid',
    }

    const newUser = await createUser(user)

    expect(newUser.firebaseUid).toBe(user.firebaseUid)
  })
})
