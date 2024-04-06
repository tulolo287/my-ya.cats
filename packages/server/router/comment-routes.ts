import express from 'express'
import { commentController } from '../controllers/comment-controller'

export const commentRoutes = express.Router()

commentRoutes.get('/', commentController.getComments)
commentRoutes.get('/:id', commentController.getComments)
commentRoutes.post('/', commentController.addComment)
