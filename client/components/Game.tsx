import { useState } from 'react'

import { getGameStart, sendGuess, submitGameStats } from '../apis/gemini'
import { SendGuessData, Message } from '../../models/models'

export default function GameLogic() {
  const [stage, setStage] = useState<'setup' | 'playing' | 'finished'>('setup')
  const [conversation, setConversation] = useState<Message[]>([])
  const [topic, setTopic] = useState('')
  const [answer, setAnswer] = useState('')
  const [level, setLevel] = useState('')
  const [userInput, setUserInput] = useState('')
  const [questionCount, setQuestionCount] = useState(0)
  const [didWin, setDidWin] = useState(false)
  const [hintCount, setHintCount] = useState(0)
  const maxQuestions = 20

  const handleStartGame = async () => {
    if (!level || !topic) {
      alert('Please Select level and topic')
      return
    }

    try {
      const res = await getGameStart(level, topic)
      setAnswer(res.answer)
      setConversation([{ sender: 'ai', text: res.introMessage }])
      setStage('playing')
      setQuestionCount(0)
      setDidWin(false)
    } catch (error) {
      console.error('error starting game', error)
    }
  }

  const handleSubmitQuestion = async () => {
    if (!userInput.trim()) return

    // Check for win
    if (userInput.toLowerCase() === answer.toLowerCase()) {
      setConversation((prev) => [
        ...prev,
        { sender: 'user', text: userInput },
        { sender: 'ai', text: '🎉 Correct! You guessed it!' },
      ])
      setDidWin(true)
      setStage('finished')
      return
    }

    // Check if user input contains "hint"
    if (userInput.toLowerCase().includes('hint')) {
      setHintCount((count) => count + 1)
    }

    //check if hint
    if (userInput.toLowerCase().includes('hint')) {
      setHintCount((count) => count + 1)
    }

    const data: SendGuessData = {
      answer,
      topic,
      conversation,
      userInput,
    }

    try {
      const res = await sendGuess(data)
      setConversation((prev) => [
        ...prev,
        { sender: 'user', text: userInput },
        { sender: 'ai', text: res.aiResponse },
      ])
      setUserInput('')
      setQuestionCount((count) => count + 1)

      if (questionCount + 1 >= maxQuestions) {
        setStage('finished')
      }
    } catch (error) {
      alert('Error submitting question')
      console.error(error)
    }
  }

  const handleGiveUp = () => {
    setConversation((prev) => [
      ...prev,
      { sender: 'user', text: 'I give up' },
      { sender: 'ai', text: `The correct answer was: ${answer}` },
    ])
    setDidWin(false)
    setStage('finished')
  }

  const handleHint = async () => {
    if (hintCount >= 3) {
      setConversation((prev) => [
        ...prev,
        { sender: 'ai', text: "You've used all your hints!" },
      ])
      return
    }

    try {
      const data: SendGuessData = {
        answer,
        topic,
        conversation,
        userInput: 'hint',
      }

      const res = await sendGuess(data)

      setHintCount((count) => count + 1)
      setConversation((prev) => [
        ...prev,
        { sender: 'user', text: 'Hint please' },
        { sender: 'ai', text: res.aiResponse },
      ])
    } catch (error) {
      alert('Error getting hint')
      console.error(error)
    }
  }

  const handleRestart = () => {
    setStage('setup')
    setConversation([])
    setTopic('')
    setLevel('')
    setAnswer('')
    setUserInput('')
    setQuestionCount(0)
    setDidWin(false)
    setHintCount(0)
  }

  const handleSubmitStats = async () => {
    const stats = {
      user_id: 3,
      question_text: topic,
      status: stage === 'finished' && answer !== '',
      question_used: questionCount,
      hint_used: hintCount,
      ai_answer: answer,
    }
    await submitGameStats(stats)
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
              className="w-full rounded border px-3 py-2 text-black"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. New Zealand towns, animals"
            />
          </div>

          <div>
            <label className="mb-1 block">Difficulty</label>
            <select
              className="w-full rounded border px-3 py-2 text-black"
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
          <p>Hints used: {hintCount}</p>

          <div className="space-y-2 overflow-y-auto rounded border bg-gray-50 p-2 text-black">
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
            className="w-full rounded border px-3 py-2 text-black"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type a yes/no question or guess the answer"
          />

          <div className="flex gap-2">
            <button
              onClick={handleSubmitQuestion}
              className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
            >
              Ask
            </button>
            <button
              onClick={handleHint}
              className="rounded bg-pink-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Hint Please
            </button>
            <button
              onClick={handleGiveUp}
              className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              I Give Up
            </button>
          </div>
        </div>
      )}

      {stage === 'finished' && (
        <div className="space-y-4 text-center">
          <h2 className="text-2xl font-bold">
            {didWin ? 'You Won! 🎉' : 'Game Over'}
          </h2>

          <p>
            The answer was: <strong>{answer}</strong>
          </p>

          <div className="mt-4 text-left">
            <h3 className="font-semibold">Game Stats:</h3>
            <ul className="list-disc pl-5">
              <li>Topic: {topic}</li>
              <li>Difficulty: {level}</li>
              <li>Questions Asked: {questionCount}</li>
              <li>Hints used: {hintCount}</li>
              <li>Result: {didWin ? 'Guessed Correctly' : 'Gave Up'}</li>
            </ul>
          </div>

          <button
            onClick={handleRestart}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Play Again
          </button>
          <button
            onClick={handleSubmitStats}
            className="rounded bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
          >
            Submit Game Stats
          </button>
        </div>
      )}
    </div>
  )
}
