import express from 'express'
import { userRoutes } from './user-routes'
import { commentRoutes } from './comment-routes'
import { topicRoutes } from './topic-routes'
import { replyRoutes } from './reply-routes'

export const router = express.Router()

router.use('/users', userRoutes)
router.use('/topics', topicRoutes)
router.use('/comments', commentRoutes)
router.use('/replies', replyRoutes)
