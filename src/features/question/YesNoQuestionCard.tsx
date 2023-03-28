import { Answer, Question } from '$/types'
import { Box, Flex } from '@chakra-ui/react'
import { Button, Card, Container } from '../ui'

type Props = {
  question: Question<'yesno'>
  onSubmit: (answer: Answer<'yesno'>) => Promise<unknown>
}

export const YesNoQuestionCard: React.FC<Props> = ({ question, onSubmit }) => {
  return (
    <Container maxW={['100%', '640px']}>
      <Card.Container>
        <Card.Body display="flex" flexDirection="column" alignItems="center" py={16}>
          <Box as="p" mb={16}>
            {question.content}
          </Box>
          <Flex w="80%" gap={8}>
            <Button size="lg" w="50%" onClick={() => onSubmit(true)}>
              はい
            </Button>
            <Button variant="gray" size="lg" w="50%" onClick={() => onSubmit(false)}>
              いいえ
            </Button>
          </Flex>
        </Card.Body>
      </Card.Container>
    </Container>
  )
}
