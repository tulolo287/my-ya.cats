import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import { sequelize } from './db/index'
import { router } from './router'
import express from 'express'
//import topicRoutes from './routes/topics'
//import { createClientAndConnect } from './db'

const app = express()

const corsOptions = {
  origin: `http://localhost:${process.env.CLIENT_PORT || 3000}`,
  credentials: true,
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions))

//app.use(cors())
app.use(express.json())
const port = Number(process.env.SERVER_PORT) || 3001

//createClientAndConnect()
//app.use('/topics', topicRoutes)

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
