export interface Task {
  id: number
  category: string
  text: string
}

export interface AIResponse {
  score: number
  feedback: string
}

export type QuizState = 'answering' | 'loading' | 'result'

export type ScoreLevel = 'excellent' | 'good' | 'average' | 'low'
