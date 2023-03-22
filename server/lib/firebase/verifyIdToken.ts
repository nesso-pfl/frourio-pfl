import { auth } from './auth'
import { FirebaseAdminUser } from './FirebaseAdminUser'

export const verifyIdToken = async (idToken: string): Promise<FirebaseAdminUser> => {
  const decodedIdToken = await auth.verifyIdToken(idToken)
  if (!decodedIdToken.email) throw new Error('email not found in decodedIdToken')

  return {
    uid: decodedIdToken.uid,
    email: decodedIdToken.email,
    emailVerified: decodedIdToken.email_verified ?? false,
  }
}
