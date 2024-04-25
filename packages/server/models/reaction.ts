import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize'
import { sequelize } from '../db'
import { Comment } from './comment'

export interface IReaction
  extends Model<
    InferAttributes<IReaction>,
    InferCreationAttributes<IReaction>
  > {
  commentId: number
  userId: number
  emojiId: string
}

export const Reaction = sequelize.define<IReaction>(
  'reaction',
  {
    commentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    emojiId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'reactions',
    indexes: [
      {
        fields: ['commentId', 'userId', 'emojiId'],
      },
    ],
  }
)

Comment.hasMany(Reaction, { foreignKey: 'commentId' })
Reaction.belongsTo(Comment, { foreignKey: 'commentId' })
