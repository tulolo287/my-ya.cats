import { Reaction } from '../models/reaction'
import { sequelize } from '../db'
import { QueryTypes } from 'sequelize'

export class ReactionService {
  public getTopicReactions = async (commentId: number, userId: number) => {
    const reactions = await sequelize.query(
      `
    SELECT 
      "emojiId",
      COUNT(*) as "count",
      BOOL_OR("userId" = :userId) as "currentUser"
    FROM 
      "reactions"
    WHERE 
      "commentId" = :commentId
    GROUP BY 
      "emojiId"
    ORDER BY 
      MIN("id")
  `,
      {
        replacements: { commentId, userId },
        type: QueryTypes.SELECT,
      }
    )

    return reactions
  }

  public addReactionToTopic = async (
    commentId: number,
    emojiId: string,
    userId: number
  ) => {
    const existingReaction = await Reaction.findOne({
      where: { commentId, emojiId, userId },
    })

    if (!existingReaction) {
      await Reaction.create({ commentId, emojiId, userId })
      return true
    }
    return false
  }

  public deleteReactionFromTopic = async (
    commentId: number,
    emojiId: number,
    userId: number
  ) => {
    const reaction = await Reaction.findOne({
      where: { commentId, emojiId, userId },
    })

    if (reaction) {
      await reaction.destroy()
      return true
    }
    return false
  }
}
