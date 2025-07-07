import request from 'superagent'
import { GameLogData, SendGuessData } from '../../models/models'

const rootUrl = new URL('/api/v1', document.baseURI)

//gameStart
export async function getGameStart(level: string, topic: string) {
  const res = await request.get(
    `${rootUrl}/gemini/start?level=${level}&topic=${topic}`,
  )

  if (!res.ok) {
    const err = 'Error starting game'
    throw new Error(err)
  }

  return res.body as { answer: string; introMessage: string }
}

//sendGuess
export async function sendGuess(data: SendGuessData) {
  const res = await request.post(`${rootUrl}/gemini/guess`).send(data)

  if (!res.ok) {
    const err = 'Error sending guess'
    throw new Error(err)
  }

  return res.body as { aiResponse: string }
}


//submitGameStats
export async function submitGameStats(stats:GameLogData) {
  try {
    const res = await request.post(`${rootUrl}/gamelogs`).send(stats)
    console.log('game log created:', res.body)
  }catch (error){
    console.error('failed to save game stats', error)

    }
}