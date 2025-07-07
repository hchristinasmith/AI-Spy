import request from 'superagent'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getAllLogsWithUsername() {
  const response = await request.get(`${rootURL}/gamelogs`)
  return response.body
}

export async function deleteLogWithId(logId: number | string) {
  const response = await request.delete(`${rootURL}/gamelogs/${logId}`)
  return response.body
}
