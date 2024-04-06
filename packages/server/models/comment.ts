import { DataTypes } from 'sequelize'
import { sequelize } from '../db/index'

import { Reply } from './reply'
import { User } from './user'

export const Comment = sequelize.define('comment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  text: { type: DataTypes.STRING, unique: false },
  username: { type: DataTypes.STRING },
})

Comment.hasMany(Reply)
Comment.belongsTo(User)