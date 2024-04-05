import dotenv from 'dotenv'
dotenv.config()

import express, { RequestHandler } from 'express'
import cors from 'cors'
import { json } from 'body-parser'
import { createProxyMiddleware } from 'http-proxy-middleware'
import cookieParser from 'cookie-parser'
import { dbConnect } from './db'
import router from './router/index'
import { AuthService } from './services/auth-service'

const API_URL = process.env.API_URL
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

  /**
   * Проксирование запросов на апи практикума
   */
  app.use(
    '/yandex-api',
    createProxyMiddleware({
      changeOrigin: true,
      cookieDomainRewrite: {
        '*': '',
      },
      pathRewrite: {
        '/yandex-api': '',
      },
      target: API_URL,
    })
  )

  app.use(json())
  app.use(cookieParser() as RequestHandler)

  /**
   * Проверяем авторизацию пользователя
   * Если авторизован, устанавливаем в req.currentUser
   */
  app.use(
    '/api',
    async (req, res, next) => {
      try {
        const authService = new AuthService(req.headers.cookie)
        const currentUser = await authService.getCurrentUser()
        if (!currentUser) {
          res.status(403).send('You do not have permission to access')
          return
        }
        ;(req as any).currentUser = currentUser
        next()
      } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error')
      }
    },
    router
  )

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
