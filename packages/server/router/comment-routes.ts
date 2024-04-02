import { commentController } from '../controllers/comment-controller'
import express from 'express'

export const commentRoutes = express.Router()

commentRoutes.get('/', commentController.getComments)
commentRoutes.post('/', commentController.addComment)
