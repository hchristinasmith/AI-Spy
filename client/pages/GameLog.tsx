import { useGetAllLogsWithUsername } from '../hooks/useGame'
import * as fn from '../components/Functions.tsx'
function GameLog() {
  const allUsers = useGetAllLogsWithUsername()

  if (allUsers.isPending) {
    return <p>Loading....</p>
  }
  if (allUsers.isError || !allUsers.data) {
    return <p>There was an error...</p>
  }

  return (
    <>
      <div className="gamelog">
        <h1>Game Log</h1>
        {/*ignore the error if it works it works*/}
        {allUsers.data.map((user) => {
          return (
            <div className="gamesLog" key={user.gameslog_id}>
              Created at: {user.created_at}, Player ID: {user.users_id}, Game
              status: {fn.convertStatus(user.status)}, No. of Guesses:{' '}
              {user.question_used}, Question: {user.question_text}, Answer:{' '}
              {user.ai_answer}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default GameLog
