import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { RequestHandler } from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { sequelize } from './db/index'
import { auth } from './middlewares/auth'
import { router } from './router'

const port = Number(process.env.SERVER_PORT) || 3001

const app = express()

const corsOptions = {
  origin: `http://localhost:${process.env.CLIENT_PORT || 3000}`,
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions))

app.use(
  '/api/v2',
  createProxyMiddleware({
    changeOrigin: true,
    cookieDomainRewrite: {
      '*': '',
    },
    target: 'https://ya-praktikum.tech/api/v2',
  })
)

app.use(cookieParser() as RequestHandler)
app.use(express.json())
app.use('/api', auth, router)
app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)')
})

const start = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
    await sequelize.sync({ force: true })
    console.log('All models were synchronized successfully.')
    app.listen(port, async () => {
      console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
    })
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

start()
