import { VStack, Checkbox, CheckboxGroup as CheckboxGroup_, CheckboxGroupProps } from '@chakra-ui/react'

type Props = {
  options: { label: string; value: string }[]
} & Omit<CheckboxGroupProps, 'children'>

export const CheckboxGroup: React.FC<Props> = ({ options, ...restProps }) => {
  return (
    <CheckboxGroup_ {...restProps}>
      <VStack align="flex-start">
        {options.map(({ label, value }) => (
          <Checkbox key={value} value={value}>
            {label}
          </Checkbox>
        ))}
      </VStack>
    </CheckboxGroup_>
  )
}
