import { sendPasswordResetEmail as sendPasswordResetEmail_ } from 'firebase/auth'
import { auth } from './auth'

export const sendPasswordResetEmail = async (email: string) => {
  await sendPasswordResetEmail_(auth, email)
}
