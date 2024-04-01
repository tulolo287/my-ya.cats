import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
import topicRoutes from './routes/topics'

import express from 'express'
import { createClientAndConnect } from './db'

const app = express()
const corsOptions = {
  origin: `http://localhost:${process.env.CLIENT_PORT || 3000}`,
  credentials: true,
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions))

const port = Number(process.env.SERVER_PORT) || 3001

createClientAndConnect()

app.use(express.json())
app.use('/topics', topicRoutes)

app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)')
})

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})
