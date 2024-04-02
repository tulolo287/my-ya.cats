import { Sequelize } from 'sequelize-typescript'

/*  const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_PORT } =
  process.env

const sequelizeOptions: SequelizeOptions = {
  host: 'localhost',
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: 'test',
  dialect: 'postgres'
};  */

export const sequelize = new Sequelize(
  'postgres://postgres:postgres@postgres:5432/postgres'
)
//export const sequelize = new Sequelize(sequelizeOptions);
