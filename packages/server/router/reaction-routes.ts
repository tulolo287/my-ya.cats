import { Router } from 'express'
import { ReactionController } from '../controllers/reaction-controller'

export const reactionRoutes = Router()
reactionRoutes
  .get('/reactions/:commentId', ReactionController.getTopicReactions)
  .post('/reaction', ReactionController.addReactionToTopic)
  .delete('/reaction', ReactionController.deleteReactionFromTopic)
