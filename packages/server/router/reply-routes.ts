import { replyController } from '../controllers/reply-controller'
import express from 'express'

export const replyRoutes = express.Router()

replyRoutes.get('/', replyController.getReplies)
replyRoutes.post('/:id', replyController.addReply)
