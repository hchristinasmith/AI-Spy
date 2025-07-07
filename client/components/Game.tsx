import { useState } from 'react'
import { getGameStart, sendGuess } from '../apis/gemini'
import { SendGuessData } from '../../models/models'

export default function GameLogic() {
  const [stage, setStage] = useState<'setup' | 'playing' | 'finished'>('setup')
  const [conversation, setConversation] = useState<Message[]>([])
  const [topic, setTopic] = useState('')
  const [answer, setAnswer] = useState('')
  const [level, setLevel] = useState('')
  const [userInput, setUserInput] = useState('')
  const [questionCount, setQuestionCount] = useState(0)
  const maxQuestions = 20

  type Message = { sender: 'user' | 'ai'; text: string }

  const handleStartGame = async () => {
    if (!level || !topic) {
      alert('Please Select level and topic')
      return
    }

    try {
      const res = await getGameStart(topic, level)
      setAnswer(res.answer)
      setConversation([{ sender: 'ai', text: res.introMessage }])
      setStage('playing')
      setQuestionCount(0)
      setAnswer('')
    } catch (error) {
      console.error('error starting game', error)
    }
  }

  const handleSubmitQuestion = async () => {
    if (!userInput.trim()) return
    if (questionCount >= maxQuestions) {
      alert('You have reached the maximum number of questions!')
      setStage('finished')
    }

    const data: SendGuessData = {
      answer,
      topic,
      conversation,
      userInput,
    }

    // Update convo with user question and AI answer
    try {
      const res = await sendGuess(data)
      setConversation((prev) => [
        ...prev,
        { sender: 'user', text: userInput },
        { sender: 'ai', text: res.aiResponse },
      ])
      setUserInput('')
      setQuestionCount((count) => count + 1)
    } catch (error) {
      alert('Error submitting question')
      console.error(error)
    }
  }

  return (
    <div className="mx-auto max-w-xl p-4">
      {stage === 'setup' && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Start a New Game</h2>

          <div>
            <label className="mb-1 block">Topic</label>
            <input
              type="text"
              className="w-full rounded border px-3 py-2"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. New Zealand towns, animals"
            />
          </div>

          <div>
            <label className="mb-1 block">Difficulty</label>
            <select
              className="w-full rounded border px-3 py-2"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="">Select difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <button
            onClick={handleStartGame}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Start Game
          </button>
        </div>
      )}

      {stage === 'playing' && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Ask Your Questions</h2>
          <p>
            Topic: <strong>{topic}</strong>
          </p>
          <p>
            Questions asked: {questionCount} / {maxQuestions}
          </p>

          <div className="max-h-64 space-y-2 overflow-y-auto rounded border bg-gray-50 p-2">
            {conversation.map((msg, i) => (
              <div
                key={i}
                className={msg.sender === 'user' ? 'text-right' : 'text-left'}
              >
                <span className="font-semibold">
                  {msg.sender === 'user' ? 'You' : 'AI'}:
                </span>{' '}
                {msg.text}
              </div>
            ))}
          </div>

          <input
            type="text"
            className="w-full rounded border px-3 py-2"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type a yes/no question"
          />

          <button
            onClick={handleSubmitQuestion}
            className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            Ask
          </button>
        </div>
      )}

      {stage === 'finished' && (
        <div className="space-y-4 text-center">
          <h2 className="text-2xl font-bold">Game Over</h2>
          <p>
            The answer was: <strong>{answer}</strong>
          </p>

          <button
            onClick={() => {
              setStage('setup')
              setConversation([])
              setTopic('')
              setLevel('')
              setAnswer('')
              setUserInput('')
              setQuestionCount(0)
            }}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  )
}
