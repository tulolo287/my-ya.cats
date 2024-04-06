import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { sequelize } from './db/index'
import { router } from './router'
import { auth } from './middleware/auth'
dotenv.config()

const app = express()

const corsOptions = {
  origin: `http://localhost:${process.env.CLIENT_PORT || 3000}`,
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions))

app.use(express.json())

const port = Number(process.env.SERVER_PORT) || 3001

app.use(auth)
app.use('/api', router)

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
