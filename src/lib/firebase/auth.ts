import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {
  NEXT_PUBLIC_API_KEY,
  NEXT_PUBLIC_APP_ID,
  NEXT_PUBLIC_AUTH_DOMAIN,
  NEXT_PUBLIC_MESSAGING_SENDER_ID,
  NEXT_PUBLIC_PROJECT_ID,
  NEXT_PUBLIC_STORAGE_BUCKET,
} from '~/envValues'

const app = initializeApp({
  apiKey: NEXT_PUBLIC_API_KEY,
  authDomain: NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: NEXT_PUBLIC_PROJECT_ID,
  storageBucket: NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: NEXT_PUBLIC_APP_ID,
})
export const auth = getAuth(app)
