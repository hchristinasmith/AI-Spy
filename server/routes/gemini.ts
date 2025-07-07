import { Router } from 'express'
import { GoogleGenAI } from '@google/genai'
import 'dotenv/config'

const router = Router()

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

// Route to start a game (GET EXAMPLE: /api/v1/gemini/start?level=${level}&topic=${topic})
router.get('/start', async (req, res) => {
  try {
    const { level, topic } = req.query
    if (!level || !topic) {
      return res.status(400).json({ error: 'Missing level or topic' })
    }

    const prompt = `Choose a/an ${topic}. Respond with ONLY the name. No explanation.`
    const pickResponse = await genAI.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }], // gemini model for chat conversation, i.e. "Send a message from the user to Gemini with the following prompt text."
    })

    const answer =
      pickResponse.candidates?.[0]?.content?.parts?.[0]?.text?.trim() // gemini's syntax for responses (ctrl + keys to look at documentation)

    if (!answer) {
      return res.status(500).json({ error: 'AI failed to pick an answer.' })
    }

    const introMessage = `I've picked a ${topic} — start asking your yes/no questions!`
    return res.status(200).json({ answer, introMessage })
  } catch (err) {
    console.error('Error in GET /gemini/start', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Route to handle guesses/questions (POST /api/v1/gemini/guess)
router.post('/guess', async (req, res) => {
  try {
    const { answer, topic, conversation, userInput } = req.body

    if (!answer || !topic || !conversation || !userInput) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const fullConversation = [
      ...conversation,
      { sender: 'user', text: userInput },
    ]

    // converts fullConversation array into one string, joined by line breaks \n
    const convoText = fullConversation
      .map(
        (msg: any) => `${msg.sender === 'user' ? 'User' : 'AI'}: ${msg.text}`,
      )
      .join('\n')

    const prompt = `You are playing 20 Questions.
    Secret answer: ${answer}
    Topic: ${topic}
    Only respond to the user's questions with yes/no/sometimes/brief clarifications if needed.
    Keep it short.

    ${convoText}
    AI:`

    const aiResponse = await genAI.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    })

    const aiText = aiResponse.candidates?.[0]?.content?.parts?.[0]?.text?.trim()

    if (!aiText) return res.status(500).json({ error: 'AI gave no response' })

    return res.status(200).json({ aiResponse: aiText })
  } catch (err) {
    console.error('Error in POST /gemini/guess', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
