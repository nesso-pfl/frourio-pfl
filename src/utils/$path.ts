export const pagesPath = {
  "auth_action": {
    "password_reset_complete": {
      $url: (url?: { hash?: string }) => ({ pathname: '/auth-action/password-reset-complete' as const, hash: url?.hash })
    },
    $url: (url?: { hash?: string }) => ({ pathname: '/auth-action' as const, hash: url?.hash })
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
  "question": {
    "move_in": {
      $url: (url?: { hash?: string }) => ({ pathname: '/question/move-in' as const, hash: url?.hash })
    }
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
