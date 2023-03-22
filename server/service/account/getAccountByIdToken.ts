import { depend } from 'velona'
import { verifyIdToken } from '$/lib/firebase'
import { Account } from '$/types'

export const getAccountByIdToken = depend(
  { verifyIdToken },
  async ({ verifyIdToken }, idToken: string): Promise<Account> => {
    const decodedIdToken = await verifyIdToken(idToken)
    if (!decodedIdToken.email) throw new Error('email not found in decodedIdToken')

    return {
      firebaseUid: decodedIdToken.uid,
      email: decodedIdToken.email,
      emailVerified: decodedIdToken.emailVerified,
    }
  },
)
