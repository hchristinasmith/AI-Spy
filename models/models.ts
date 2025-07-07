export interface SendGuessData {
  answer: string
  topic: string
  conversation: { sender: 'user' | 'ai'; text: string }[]
  userInput: string
}

export interface Message {
  sender: 'user' | 'ai'
  text: string
}

export interface GameLogData {
  user_id: number
  question_text: string
  status: boolean
  question_used: number
  hint_used: number
  ai_answer: string
}