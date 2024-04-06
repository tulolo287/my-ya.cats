import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize'
import { sequelize } from '../db'

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

// TODO: добавить связи с Comment
// Comment.hasMany(Reaction, { foreignKey: 'commentId' })
// Reaction.belongsTo(Comment, { foreignKey: 'commentId' })
