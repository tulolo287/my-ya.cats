import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import dotenv from 'dotenv'
dotenv.config({ path: '../../.env' })

const sequelizeOptions: SequelizeOptions = {
  host:
    process.env.NODE_ENV === 'development'
      ? 'localhost'
      : process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  dialect: 'postgres',
}

export const sequelize = new Sequelize(sequelizeOptions)

export async function dbConnect() {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
