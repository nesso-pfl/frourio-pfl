type QuestionId = number

// 回答
type AnswerType = 'yesno' | 'checkbox'
type AnswerOption<T extends AnswerType> = T extends 'yesno' ? YesNoOption : CheckboxOption
type YesNoOption = boolean
type CheckboxOption = { label: string; value: AnswerId }
type AnswerId = number
export type Answer<T extends AnswerType = AnswerType> = T extends 'yesno' ? boolean : number[]

// 質問
export type Question<T extends AnswerType = AnswerType> = {
  id: QuestionId
  content: string
  answerType: T extends 'yesno' ? 'yesno' : 'checkbox'
  answers: AnswerOption<T>[]
  nextQuestionId?: QuestionId
  enabled?: [QuestionId, Answer<T>]
}

export type AnswerResult<T extends AnswerType = AnswerType> = {
  questionId: QuestionId
  answerType: T
  answer: Answer<T>
}
