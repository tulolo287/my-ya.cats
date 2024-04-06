import dotenv from 'dotenv'
dotenv.config()

import express, { RequestHandler } from 'express'
import cors from 'cors'
import { json } from 'body-parser'
import cookieParser from 'cookie-parser'
import { dbConnect } from './db'
import router from './router/index'
import { auth } from './middlewares/auth'
import { yandexApiProxy } from './middlewares/yandex-api-proxy'

const CLIENT_URL = process.env.CLIENT_URL

async function startServer() {
  const app = express()

  app.use(
    cors({
      origin: CLIENT_URL,
      credentials: true,
    })
  )

  const port = Number(process.env.SERVER_PORT)

  app.use('/yandex-api', yandexApiProxy)
  app.use(json())
  app.use(cookieParser() as RequestHandler)
  app.use('/api', auth, router)

  await dbConnect()

  app.get('/', (_, res) => {
    res.json('👋 Howdy from the server :)')
  })

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

// eslint-disable-next-line unicorn/prefer-top-level-await
startServer()
