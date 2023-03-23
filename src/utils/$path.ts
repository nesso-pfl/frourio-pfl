import type { OptionalQuery as OptionalQuery0 } from '../pages/city'

export const pagesPath = {
  "auth_action": {
    "password_reset_complete": {
      $url: (url?: { hash?: string }) => ({ pathname: '/auth-action/password-reset-complete' as const, hash: url?.hash })
    },
    $url: (url?: { hash?: string }) => ({ pathname: '/auth-action' as const, hash: url?.hash })
  },
  "city": {
    $url: (url?: { query?: OptionalQuery0, hash?: string }) => ({ pathname: '/city' as const, query: url?.query, hash: url?.hash })
  },
  "login": {
    $url: (url?: { hash?: string }) => ({ pathname: '/login' as const, hash: url?.hash })
  },
  "password_reset": {
    "complete": {
      $url: (url?: { hash?: string }) => ({ pathname: '/password-reset/complete' as const, hash: url?.hash })
    },
    $url: (url?: { hash?: string }) => ({ pathname: '/password-reset' as const, hash: url?.hash })
  },
  "register": {
    "complete": {
      $url: (url?: { hash?: string }) => ({ pathname: '/register/complete' as const, hash: url?.hash })
    },
    $url: (url?: { hash?: string }) => ({ pathname: '/register' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath

export const staticPath = {
  favicon_png: '/favicon.png'
} as const

export type StaticPath = typeof staticPath
