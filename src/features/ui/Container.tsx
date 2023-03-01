import { Container as Container_, ContainerProps, forwardRef } from '@chakra-ui/react'

type Props = {
  children: React.ReactNode
} & ContainerProps

export const Container = forwardRef<Props, 'div'>(({ children, ...boxProps }, ref) => {
  return (
    <Container_ ref={ref} maxW={['100%', '1080px']} {...boxProps}>
      {children}
    </Container_>
  )
})
