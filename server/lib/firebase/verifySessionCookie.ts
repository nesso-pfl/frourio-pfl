import { auth } from './auth'
import { FirebaseAdminUser } from './FirebaseAdminUser'

export const verifySessionCookie = async (sessionCookie: string): Promise<FirebaseAdminUser> => {
  const decodedIdToken = await auth.verifySessionCookie(sessionCookie)
  if (!decodedIdToken.email) throw new Error(`email should be defined: firebaseUid=${decodedIdToken.uid}`)
  return {
    uid: decodedIdToken.uid,
    email: decodedIdToken.email,
    emailVerified: decodedIdToken.emailVerified,
  }
}
