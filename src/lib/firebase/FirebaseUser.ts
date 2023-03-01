import { UserCredential } from 'firebase/auth'
export type FirebaseUser = Pick<UserCredential['user'], 'uid' | 'emailVerified' | 'getIdToken'> & { email: string }
