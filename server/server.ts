import express from 'express'
import * as Path from 'node:path'
import router from './routes/gameLogs.ts'
import fruitRoutes from './routes/fruits.ts'
import gemini from './routes/gemini.ts'

const server = express()

server.use(express.json())

server.use('/api/v1/gameLogs', router)
server.use('/api/v1/fruits', fruitRoutes)

server.use('/api/v1/gemini', gemini)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
