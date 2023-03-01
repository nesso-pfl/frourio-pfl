import { depend } from 'velona'
import { createSessionCookie as create } from '$/lib/firebase'

export const createSessionCookie = depend({ create }, async ({ create }, idToken: string) => {
  return await create(idToken)
})
