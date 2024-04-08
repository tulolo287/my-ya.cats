import express from 'express'
import { replyController } from '../controllers/reply-controller'

export const replyRoutes = express.Router()

replyRoutes.get('/', replyController.getReplies)
replyRoutes.post('/', replyController.addReply)
