import { FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY, FIREBASE_PROJECT_ID } from '$/service/envValues'
import admin from 'firebase-admin'
import { getAuth } from 'firebase-admin/auth'

const app = admin.initializeApp({
  credential: admin.credential.cert({
    projectId: FIREBASE_PROJECT_ID,
    privateKey: FIREBASE_PRIVATE_KEY,
    clientEmail: FIREBASE_CLIENT_EMAIL,
  }),
})

export const auth = getAuth(app)
