import React from 'react'
import { render } from '@testing-library/react'
import { SWRConfig } from 'swr'
import { ChakraProvider } from '@chakra-ui/react'
import { chakraTheme } from '@/src/features/ui'

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ChakraProvider theme={chakraTheme}>
    <SWRConfig value={{ dedupingInterval: 0 }}>{children}</SWRConfig>
  </ChakraProvider>
)

const customRender = (ui: React.ReactElement, options = {}) => render(ui, { wrapper: Providers, ...options })

export * from '@testing-library/react'

export { customRender as render }

export type InvalidInputCase<T> = {
  title: string
  input: T
  message: string
}
