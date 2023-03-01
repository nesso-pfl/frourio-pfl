import { auth } from './auth'

export const deleteFirebaseUser = async (firebaseUid: string) => {
  await auth.deleteUser(firebaseUid)
}
