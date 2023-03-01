import { auth } from './auth'
import { FirebaseUser } from './FirebaseUser'

export const createFirebaseUser = async (email: string, password: string): Promise<FirebaseUser> => {
  const userRecord = await auth.createUser({ email, password, emailVerified: true })
  if (!userRecord.email) throw new Error(`user's email should be defined: firebaseUid=${userRecord.uid}`)
  return { ...userRecord, email: userRecord.email }
}
