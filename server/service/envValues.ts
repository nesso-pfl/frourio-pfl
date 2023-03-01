import dotenv from 'dotenv'

dotenv.config({ path: process.env.NODE_ENV === 'test' ? './server/.env' : undefined })

function assertString(val: unknown, key: string): asserts val is string {
  if (typeof val !== 'string') throw new Error(`${key} should be defined`)
}

assertString(process.env.API_JWT_SECRET, 'API_JWT_SECRET ')
assertString(process.env.API_USER_ID, 'API_USER_ID ')
assertString(process.env.API_USER_PASS, 'API_USER_PASS ')
assertString(process.env.API_SERVER_PORT, 'API_SERVER_PORT ')
assertString(process.env.API_BASE_PATH, 'API_BASE_PATH ')
assertString(process.env.API_ORIGIN, 'API_ORIGIN ')
assertString(process.env.API_UPLOAD_DIR, 'API_UPLOAD_DIR ')
assertString(process.env.FIREBASE_PROJECT_ID, 'FIREBASE_PROJECT_ID')
assertString(process.env.FIREBASE_PRIVATE_KEY, 'FIREBASE_PRIVATE_KEY')
assertString(process.env.FIREBASE_CLIENT_EMAIL, 'FIREBASE_CLIENT_EMAIL')

const API_JWT_SECRET = process.env.API_JWT_SECRET
const API_USER_ID = process.env.API_USER_ID
const API_USER_PASS = process.env.API_USER_PASS
const API_SERVER_PORT = +process.env.API_SERVER_PORT
const API_BASE_PATH = process.env.API_BASE_PATH
const API_ORIGIN = process.env.API_ORIGIN
const API_UPLOAD_DIR = process.env.API_UPLOAD_DIR
const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID
const FIREBASE_PRIVATE_KEY = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
const FIREBASE_CLIENT_EMAIL = process.env.FIREBASE_CLIENT_EMAIL

export {
  API_JWT_SECRET,
  API_USER_ID,
  API_USER_PASS,
  API_SERVER_PORT,
  API_BASE_PATH,
  API_ORIGIN,
  API_UPLOAD_DIR,
  FIREBASE_PROJECT_ID,
  FIREBASE_PRIVATE_KEY,
  FIREBASE_CLIENT_EMAIL,
}
