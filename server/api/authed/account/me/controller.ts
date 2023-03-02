import { defineController } from './$relay'

export default defineController(() => ({
  get: ({ account }) => {
    return { status: 200, body: account }
  },
}))
