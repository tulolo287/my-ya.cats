import express from 'express'
import { userRoutes } from './user-routes'
import { commentRoutes } from './comment-routes'
import { topicRoutes } from './topic-routes'

export const router = express.Router()

router.use('/user', userRoutes)
router.use('/comment', commentRoutes)
router.use('/topic', topicRoutes)
