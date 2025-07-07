import { useGetAllLogsWithUsername, useDeleteLogWithId } from '../hooks/useGame'
import * as fn from '../components/Functions.tsx'

function GameLog() {
  const allUsers = useGetAllLogsWithUsername()
  const deleteMutation = useDeleteLogWithId()

  if (allUsers.isPending) {
    return <p className="mt-10 text-center text-white">Loading...</p>
  }

  if (allUsers.isError || !allUsers.data) {
    return (
      <p className="mt-10 text-center text-red-500">There was an error...</p>
    )
  }

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id)
  }

  return (
    <div className="mx-auto mt-10 max-w-4xl rounded-2xl bg-white/5 p-6 text-white shadow-lg">
      <h1 className="mb-8 text-center text-3xl font-bold">Game Log</h1>

      <div className="space-y-6">
        {/*IGNORE PLZZZZZZZZZ*/}
        {allUsers.data.map((user) => (
          <div
            key={user.gameslog_id}
            className="flex flex-col gap-4 rounded-xl bg-white/10 p-4 shadow md:flex-row md:items-center md:justify-between"
          >
            <div className="space-y-1 text-sm md:text-base">
              <p>
                <span className="font-semibold">Created at:</span>{' '}
                {user.created_at}
              </p>
              <p>
                <span className="font-semibold">Player ID:</span>{' '}
                {user.users_id}
              </p>
              <p>
                <span className="font-semibold">Status:</span>{' '}
                {fn.convertStatus(user.status)}
              </p>
              <p>
                <span className="font-semibold">Guesses:</span>{' '}
                {user.question_used}
              </p>
              <p>
                <span className="font-semibold">Question:</span>{' '}
                {user.question_text}
              </p>
              <p>
                <span className="font-semibold">Answer:</span> {user.ai_answer}
              </p>
            </div>

            <button
              onClick={() => handleDelete(user.gameslog_id)}
              className="self-start rounded-xl bg-red-500 px-4 py-2 font-semibold text-white transition hover:bg-red-600 md:self-auto"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GameLog
