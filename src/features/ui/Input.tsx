import { Input as Input_, InputProps, forwardRef } from '@chakra-ui/react'

type Props = Omit<InputProps, 'variant'>

export const Input = forwardRef<Props, 'input'>(({ ...inputProps }, ref) => {
  return <Input_ ref={ref} {...inputProps} bg="white" />
})
