import { HStack, Checkbox, CheckboxGroup as CheckboxGroup_, CheckboxGroupProps } from '@chakra-ui/react'

type Props = {
  options: { label: string; value: string }[]
} & Omit<CheckboxGroupProps, 'children'>

export const CheckboxGroup: React.FC<Props> = ({ options, ...restProps }) => {
  return (
    <CheckboxGroup_ {...restProps}>
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
          <Checkbox key={value} value={value}>
            {label}
          </Checkbox>
        ))}
      </HStack>
    </CheckboxGroup_>
  )
}
