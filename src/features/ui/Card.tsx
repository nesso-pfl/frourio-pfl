import {
  Card as Card_,
  CardBody,
  CardBodyProps,
  CardFooter,
  CardFooterProps,
  CardHeader,
  CardHeaderProps,
  CardProps,
  forwardRef,
} from '@chakra-ui/react'

type ContainerProps = {
  children: React.ReactNode
} & Omit<CardProps, 'variant'>

const Container = forwardRef<ContainerProps, 'div'>(({ children, ...cardProps }, ref) => {
  return (
    <Card_ ref={ref} {...cardProps}>
      {children}
    </Card_>
  )
})

type HeaderProps = {
  children: React.ReactNode
} & Omit<CardHeaderProps, 'variant'>

const Header = forwardRef<HeaderProps, 'div'>(({ children, ...cardHeaderProps }, ref) => {
  return (
    <CardHeader ref={ref} {...cardHeaderProps}>
      {children}
    </CardHeader>
  )
})

type BodyProps = {
  children: React.ReactNode
} & Omit<CardBodyProps, 'variant'>

const Body = forwardRef<BodyProps, 'div'>(({ children, ...cardBodyProps }, ref) => {
  return (
    <CardBody ref={ref} {...cardBodyProps}>
      {children}
    </CardBody>
  )
})

type FooterProps = {
  children: React.ReactNode
} & Omit<CardFooterProps, 'variant'>

const Footer = forwardRef<FooterProps, 'div'>(({ children, ...cardFooterProps }, ref) => {
  return (
    <CardFooter ref={ref} {...cardFooterProps}>
      {children}
    </CardFooter>
  )
})

export const Card = {
  Container,
  Header,
  Body,
  Footer,
}
