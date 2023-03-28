import { AnswerResult, Question } from '$/types'

export const mockQuestions = (): Question[] => [
  {
    id: 1,
    content: '国外から転入しましたか？',
    answerType: 'yesno',
    answers: [true, false],
    nextQuestionId: 2,
  },
  {
    id: 2,
    content: 'お持ちの証明書に関連して、以下のうち該当するものをすべて選択し、「次へ」を押してください。',
    answerType: 'checkbox',
    answers: [
      { label: 'マイナンバーカードを持っている方がいる', value: 1 },
      { label: '住民基本台帳カードを持っている方がいる', value: 2 },
      { label: '運転免許証を持っている方がいる', value: 3 },
    ],
    nextQuestionId: 3,
  },
  {
    id: 3,
    content: 'マイナンバーカードを持っている人だけの質問',
    answerType: 'yesno',
    answers: [true, false],
    enabled: [2, [1]],
    nextQuestionId: 4,
  },
  {
    id: 4,
    content: '最後の質問',
    answerType: 'yesno',
    answers: [true, false],
  },
]

export const mockAnswerResults = (): AnswerResult[] => [
  {
    questionId: 1,
    answerType: 'yesno',
    answer: true,
  },
  {
    questionId: 2,
    answerType: 'checkbox',
    answer: [1, 2],
  },
  {
    questionId: 3,
    answerType: 'yesno',
    answer: true,
  },
  {
    questionId: 4,
    answerType: 'yesno',
    answer: true,
  },
]
