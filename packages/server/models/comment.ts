import { DataTypes } from 'sequelize'
import { sequelize } from '../db'

import { Reply } from './reply'
import { User } from './user'

export const Comment = sequelize.define(
  'comment',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    text: { type: DataTypes.STRING, unique: false },
    username: { type: DataTypes.STRING, unique: true },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['username'],
      },
    ],
  }
)

Comment.hasMany(Reply)
Comment.belongsTo(User)
