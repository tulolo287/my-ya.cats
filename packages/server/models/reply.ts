import { DataTypes } from 'sequelize'
import { sequelize } from '../db/index'
import { User } from './user'

export const Reply = sequelize.define('reply', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  text: { type: DataTypes.STRING, unique: false },
})

Reply.belongsTo(User)
