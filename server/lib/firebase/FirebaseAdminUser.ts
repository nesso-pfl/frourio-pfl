import { UserRecord } from 'firebase-admin/auth'
export type FirebaseAdminUser = Required<Pick<UserRecord, 'uid' | 'email' | 'emailVerified'>>
