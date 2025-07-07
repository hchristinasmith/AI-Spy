import request from 'superagent'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getAllLogsWithUsername() {
  const response = await request.get(`${rootURL}/gamelogs`)
  return response.body
}
