import { auth } from './auth'
import { FirebaseAdminUser } from './FirebaseAdminUser'

export const createFirebaseAdminUser = async (email: string, password: string): Promise<FirebaseAdminUser> => {
  const userRecord = await auth.createUser({ email, password, emailVerified: true })
  if (!userRecord.email) throw new Error(`user's email should be defined: firebaseUid=${userRecord.uid}`)
  return { ...userRecord, email: userRecord.email }
}
