export type QuestionId = number

// 回答
type AnswerType = 'yesno' | 'checkbox'
type AnswerOption<T extends AnswerType> = T extends 'yesno' ? YesNoOption : CheckboxOption
type YesNoOption = boolean
type CheckboxOption = { label: string; value: AnswerId }
type AnswerId = number
export type AnswerChoice<T extends AnswerType = AnswerType> = T extends 'yesno' ? boolean : number[]

// 質問
export type Question<T extends AnswerType = AnswerType> = {
  id: QuestionId
  content: string
  answerType: T extends 'yesno' ? 'yesno' : 'checkbox'
  answers: AnswerOption<T>[]
}

export type Answer<T extends AnswerType = AnswerType> = {
  questionId: QuestionId
  answerType: T
  answerChoice: AnswerChoice<T>
}
