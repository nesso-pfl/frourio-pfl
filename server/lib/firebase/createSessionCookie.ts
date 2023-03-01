import { auth } from './auth'

export const createSessionCookie = async (idToken: string) => {
  // Firebase の session cookie は有効期限最大14日
  // ref: https://firebase.google.com/docs/reference/admin/node/firebase-admin.auth.sessioncookieoptions.md#sessioncookieoptionsexpiresin
  return await auth.createSessionCookie(idToken, { expiresIn: 1000 * 60 * 60 * 24 * 14 })
}
