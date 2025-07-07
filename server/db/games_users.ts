
import db from './connection.ts'

export async function getAllLogsWithUsername() {
const logs = await db('gameslog')
.join('users', 'gameslog.user_id', 'users.id')
.select('gameslog.id as gameslog_id',
   'users.id as users_id', 
   'gameslog.status',
   'gameslog.question_used',
   'gameslog.hint_used',
   'gameslog.ai_answer',
   'gameslog.question_text',
   'gameslog.ai_response',
   'gameslog.created_at'
  )
.orderBy('gameslog.created_at')
return logs
}

// delete
export async function deleteGameLogById(id: number) {
  return await db('gameslog')
  .where({ id })
  .del()
}

// Add
type NewGameLog = {
  user_id: number
  status: boolean
  question_used: number
  hint_used: number
  ai_answer: string
  question_text: string
  ai_response: string
  created_at: string
}

export async function addGameLog(data: NewGameLog) {
  return await db('gameslog').insert(data)
}