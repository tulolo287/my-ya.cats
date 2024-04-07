import { DataTypes } from 'sequelize'
import { sequelize } from '../db'
import { Comment } from './comment'
import { User } from './user'

export const Topic = sequelize.define(
  'topic',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    topicName: { type: DataTypes.STRING, unique: true, allowNull: false },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['topicName'],
      },
    ],
  }
)

Topic.hasMany(Comment)
Topic.belongsTo(User)
