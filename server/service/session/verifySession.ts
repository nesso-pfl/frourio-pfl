import { depend } from 'velona'
import { verifySessionCookie as verify } from '$/lib/firebase'
import { Account } from '$/types'

export const verifySession = depend({ verify }, async ({ verify }, sessionCookie: string): Promise<Account> => {
  const firebaseUser = await verify(sessionCookie)
  return {
    firebaseUid: firebaseUser.uid,
    email: firebaseUser.email,
    emailVerified: firebaseUser.emailVerified,
  }
})
