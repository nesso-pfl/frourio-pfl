import { Request } from '$/types'

export type Methods = {
  post: {
    reqBody: Request<{ firebaseIdToken: string }>
  }
}
