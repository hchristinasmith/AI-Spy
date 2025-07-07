import { useQuery } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

import { getGameStart, sendGuess } from '../apis/gemini'
import { SendGuessData } from '../../models/models'

export function useGameStart(level: string, topic: string) {
  return useQuery({
    queryKey: ['game-start', level, topic],
    queryFn: () => getGameStart(level, topic),
  })
}

export function useSendGuess() {
  return useMutation<
    { aiResponse: string }, // Type of the successful data
    Error, // Type of the error
    SendGuessData // Type of the variables passed to mutate
  >({
    mutationFn: sendGuess,
  })
}
