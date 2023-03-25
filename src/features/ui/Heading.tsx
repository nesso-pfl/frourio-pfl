import { forwardRef, Heading as Heading_, HeadingProps } from '@chakra-ui/react'

const variants = ['pageTitle', 'cardTitle'] as const
type Variant = (typeof variants)[number]

const variantStyleMap: Record<Variant, HeadingProps> = {
  pageTitle: {
    as: 'h1',
    fontSize: 'xl',
    mb: 8,
  },
  cardTitle: {
    as: 'h2',
    fontSize: 'lg',
    mb: 5,
  },
}

type Props = {
  variant?: Variant
  children: React.ReactNode
} & Omit<HeadingProps, 'variant'>

export const Heading = forwardRef<Props, 'h2'>(({ variant, children, ...headingProps }, ref) => {
  return (
    <Heading_ ref={ref} {...(variant ? variantStyleMap[variant] : {})} {...headingProps}>
      {children}
    </Heading_>
  )
})
