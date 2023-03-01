import { UserRecord } from 'firebase-admin/auth'
export type FirebaseUser = Required<Pick<UserRecord, 'uid' | 'email' | 'emailVerified'>>
