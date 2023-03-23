import { Tag, TagProps, forwardRef } from '@chakra-ui/react'

type Props = {
  children: React.ReactNode
} & TagProps

export const Badge = forwardRef<Props, 'span'>(({ children, ...restProps }, ref) => {
  return (
    <Tag ref={ref} bg="secondary" color="white" size="sm" fontWeight="bold" {...restProps}>
      {children}
    </Tag>
  )
})
