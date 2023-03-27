import { auth } from './auth'

export const getIdToken = async () => {
  if (auth.currentUser) {
    return await auth.currentUser.getIdToken()
  } else {
    return undefined
  }
}
