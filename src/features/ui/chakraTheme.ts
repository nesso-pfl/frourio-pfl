import { extendTheme } from '@chakra-ui/react'

export const chakraTheme = extendTheme({
  // スマホ/タブレット用と、PC 用の２種類のレイアウトを用意する
  // breakpoint が sm ならスマホ/タブレット用で、それ以外なら PC 用レイアウトを表示するようにする
  breakpoints: { sm: '768px' },
  semanticTokens: {
    colors: {
      primary: 'blue.400',
      primaryLight: 'blue.50',
      secondary: 'green.400',
      secondaryLight: 'green.50',
      error: 'red.400',
      errorLight: 'red.300',
    },
  },
})
