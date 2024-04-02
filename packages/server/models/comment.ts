import { DataTypes } from 'sequelize'
import { sequelize } from '../db/index'

export const Comment = sequelize.define('comment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  text: { type: DataTypes.STRING, unique: false },
})
