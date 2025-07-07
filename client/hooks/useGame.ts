import { useQuery } from '@tanstack/react-query'
import { getAllLogsWithUsername, deleteLogWithId } from '../apis/api.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useGetAllLogsWithUsername() {
  return useQuery({ queryKey: ['gameLogs'], queryFn: getAllLogsWithUsername })
}

export function useDeleteLogWithId() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number | string) => deleteLogWithId(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gameLogs'] })
    },
  })
}
