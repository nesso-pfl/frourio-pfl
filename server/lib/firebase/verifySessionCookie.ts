import { auth } from './auth'
import { FirebaseUser } from './FirebaseUser'

export const verifySessionCookie = async (sessionCookie: string): Promise<FirebaseUser> => {
  const decodedIdToken = await auth.verifySessionCookie(sessionCookie)
  if (!decodedIdToken.email) throw new Error(`email should be defined: firebaseUid=${decodedIdToken.uid}`)
  return {
    uid: decodedIdToken.uid,
    email: decodedIdToken.email,
    emailVerified: decodedIdToken.emailVerified,
  }
}
