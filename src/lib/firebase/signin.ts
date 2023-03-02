import { z } from 'zod'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { FirebaseUser } from './FirebaseUser'
import { auth } from './auth'

const signinErrorCodes = [
  'auth/invalid-email',
  'auth/user-not-found',
  'auth/wrong-password',
  'auth/user-disabled',
  'auth/too-many-requests',
] as const
type SigninErrorCode = (typeof signinErrorCodes)[number]

const errorSchema = z.object({
  code: z.enum(signinErrorCodes),
})

export class SigninError extends Error {
  code: SigninErrorCode
  constructor(code: SigninErrorCode) {
    super()
    this.code = code
  }
}
export const signin = async (email: string, password: string): Promise<FirebaseUser> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    if (!userCredential.user.email) throw new Error("user's email should be non-nullable")
    return { ...userCredential.user, email: userCredential.user.email, getIdToken: userCredential.user.getIdToken }
  } catch (e) {
    const result = errorSchema.safeParse(e)
    if (result.success) {
      throw new SigninError(result.data.code)
    } else {
      throw new Error()
    }
  }
}
