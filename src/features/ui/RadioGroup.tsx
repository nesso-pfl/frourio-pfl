import { forwardRef, HStack, Radio, RadioGroup as RadioGroup_, RadioGroupProps } from '@chakra-ui/react'

type Props = {
  options: { label: string; value: string }[]
} & Omit<RadioGroupProps, 'children'>

export const RadioGroup = forwardRef<Props, 'div'>(({ options, ...restProps }, ref) => {
  return (
    <RadioGroup_ ref={ref} {...restProps}>
      <HStack
        columnGap={4}
        wrap="wrap"
        sx={{
          '& > :not(:first-of-type)': {
            marginInlineStart: '0px',
          },
        }}
      >
        {options.map(({ label, value }) => (
          <Radio key={value} value={value}>
            {label}
          </Radio>
        ))}
      </HStack>
    </RadioGroup_>
  )
})
