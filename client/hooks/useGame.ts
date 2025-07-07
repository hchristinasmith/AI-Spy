import { useQuery } from '@tanstack/react-query'
import { getAllLogsWithUsername } from '../apis/api.ts'

export function useGetAllLogsWithUsername() {
  return useQuery({ queryKey: ['gameLogs'], queryFn: getAllLogsWithUsername })
}
