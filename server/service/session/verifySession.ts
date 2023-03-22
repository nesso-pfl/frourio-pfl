import { depend } from 'velona'
import { verifySessionCookie as verify } from '$/lib/firebase'
import { Account } from '$/types'

export const verifySession = depend({ verify }, async ({ verify }, sessionCookie: string): Promise<Account> => {
  const firebaseAdminUser = await verify(sessionCookie)
  return {
    firebaseUid: firebaseAdminUser.uid,
    email: firebaseAdminUser.email,
    emailVerified: firebaseAdminUser.emailVerified,
  }
})
