export const pagesPath = {
  "login": {
    $url: (url?: { hash?: string }) => ({ pathname: '/login' as const, hash: url?.hash })
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
