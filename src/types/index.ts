export interface Task {
  question_id: number
  question_text: string
}

export interface AIResponse {
  score: number
  explanation: string
}

export type QuizState = 'answering' | 'loading' | 'result'

export type ScoreLevel = 'excellent' | 'good' | 'average' | 'low'
