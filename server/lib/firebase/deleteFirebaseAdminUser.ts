import { auth } from './auth'

export const deleteFirebaseAdminUser = async (firebaseUid: string) => {
  await auth.deleteUser(firebaseUid)
}
