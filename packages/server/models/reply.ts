import { DataTypes } from 'sequelize'
import { sequelize } from '../db'
import { User } from './user'

export const Reply = sequelize.define(
  'reply',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    text: { type: DataTypes.STRING, unique: false },
  },
  {
    indexes: [
      {
        fields: ['commentId', 'userId'],
      },
    ],
  }
)

Reply.belongsTo(User)
