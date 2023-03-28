import { AnswerChoice, Question } from '$/types'
import { Box, Flex } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button, Card, CheckboxGroup, Container, Form } from '../ui'

const formSchema = z.object({
  values: z.coerce.number().array().default([]),
})
type Form = z.infer<typeof formSchema>

type Props = {
  question: Question<'checkbox'>
  onSubmit: (answer: AnswerChoice<'checkbox'>) => Promise<unknown>
}

export const CheckboxQuestionCard: React.FC<Props> = ({ question, onSubmit }) => {
  const { control, handleSubmit } = useForm<Form>({ resolver: zodResolver(formSchema) })

  const onSubmit_ = async (formValues: Form) => {
    await onSubmit(formValues.values)
  }

  return (
    <Container maxW={['100%', '640px']}>
      <Card.Container>
        <Card.Body display="flex" flexDirection="column" alignItems="center" py={16}>
          <Box as="p" mb={16} whiteSpace="pre-wrap">
            {question.content}
          </Box>
          <Form.Container onSubmit={handleSubmit(onSubmit_)}>
            <Form.Item mb={8}>
              <Controller
                control={control}
                name="values"
                render={({ field: { value, onChange } }) => (
                  <CheckboxGroup
                    value={value}
                    onChange={onChange}
                    options={question.answers.map((answer) => ({
                      label: answer.label,
                      value: answer.value.toString(),
                    }))}
                  />
                )}
              />
            </Form.Item>
            <Flex w="100%" gap={8}>
              <Button type="submit" size="lg" w="100%">
                次へ
              </Button>
            </Flex>
          </Form.Container>
        </Card.Body>
      </Card.Container>
    </Container>
  )
}
