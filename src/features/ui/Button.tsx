import {
  Button as Button_,
  ButtonProps,
  IconButton as IconButton_,
  IconButtonProps as IconButtonProps_,
  forwardRef,
} from '@chakra-ui/react'

const variants = ['primary', 'primaryOutline', 'secondary', 'error', 'errorLight', 'gray', 'disabled'] as const
type Variant = (typeof variants)[number]

const variantStyleMap: Record<Variant, ButtonProps> = {
  primary: {
    bg: 'primary',
    color: 'white',
  },
  primaryOutline: {
    borderColor: 'primary',
    color: 'primary',
  },
  secondary: {
    bg: 'secondary',
    color: 'white',
  },
  error: {
    bg: 'error',
    color: 'white',
  },
  errorLight: {
    bg: 'errorLight',
    color: 'white',
  },
  gray: {
    bg: 'gray.500',
    color: 'white',
  },
  disabled: {
    bg: 'gray.200',
    color: 'gray.600',
    opacity: 1,
    cursor: 'not-allowed',
  },
}

type Props = {
  variant?: Variant
  children: React.ReactNode
} & Omit<ButtonProps, 'variant'>

export const Button = forwardRef<Props, 'button'>(({ variant = 'primary', children, ...buttonProps }, ref) => {
  return (
    <Button_
      ref={ref}
      {...buttonProps}
      size={buttonProps.size ?? 'sm'}
      {...variantStyleMap[variant]}
      _disabled={variantStyleMap['disabled']}
      _hover={{ opacity: 0.8, _disabled: variantStyleMap['disabled'] }}
      _active={{ opacity: 0.6, _disabled: variantStyleMap['disabled'] }}
    >
      {children}
    </Button_>
  )
})

type IconButtonProps = {
  variant?: Variant
} & Omit<IconButtonProps_, 'variant'>

export const IconButton = forwardRef<IconButtonProps, 'button'>(({ variant = 'primary', ...buttonProps }, ref) => {
  return (
    <IconButton_
      ref={ref}
      {...buttonProps}
      size={buttonProps.size ?? 'sm'}
      {...variantStyleMap[variant]}
      _disabled={variantStyleMap['disabled']}
      _hover={{ opacity: 0.8, _disabled: variantStyleMap['disabled'] }}
      _active={{ opacity: 0.6, _disabled: variantStyleMap['disabled'] }}
    />
  )
})
