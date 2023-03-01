import {
  FormLabel,
  FormLabelProps,
  forwardRef,
  FormErrorMessageProps,
  FormErrorMessage,
  FormControlProps,
  FormControl,
  Box,
  BoxProps,
} from '@chakra-ui/react'

type ContainerProps = {
  children: React.ReactNode
} & Omit<BoxProps, 'variant'>

const Container = forwardRef<ContainerProps, 'form'>(({ children, ...boxProps }, ref) => {
  return (
    <Box as="form" ref={ref} {...boxProps} noValidate>
      {children}
    </Box>
  )
})

type ItemProps = {
  children: React.ReactNode
} & Omit<FormControlProps, 'variant'>

const Item = forwardRef<ItemProps, 'div'>(({ children, ...formControlProps }, ref) => {
  return (
    <FormControl ref={ref} {...formControlProps}>
      {children}
    </FormControl>
  )
})

type LabelProps = {
  children: React.ReactNode
} & Omit<FormLabelProps, 'variant'>

const Label = forwardRef<LabelProps, 'label'>(({ children, ...formLabelProps }, ref) => {
  return (
    <FormLabel ref={ref} {...formLabelProps} fontSize="sm">
      {children}
    </FormLabel>
  )
})

type ErrorMessageProps = {
  children: React.ReactNode
} & Omit<FormErrorMessageProps, 'variant'>

const ErrorMessage = forwardRef<ErrorMessageProps, 'div'>(({ children, ...formErrorMessageProps }, ref) => {
  return (
    <FormErrorMessage ref={ref} {...formErrorMessageProps} fontSize="sm">
      {children}
    </FormErrorMessage>
  )
})

export const Form = {
  Container,
  Item,
  Label,
  ErrorMessage,
}
