import { commentController } from '../controllers/comment-controller'
import express from 'express'

export const commentRoutes = express.Router()

commentRoutes.get('/all', commentController.getComments)
commentRoutes.post('/add', commentController.addComment)
