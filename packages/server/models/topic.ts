import { DataTypes } from 'sequelize'
import { sequelize } from '../db/index'
import { Comment } from './comment'

export const Topic = sequelize.define('topic', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  topicName: { type: DataTypes.STRING, unique: false, allowNull: false },
})

Topic.hasMany(Comment)
Comment.belongsTo(Topic)
