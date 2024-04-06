import express from 'express'
import { commentRoutes } from './comment-routes'
import { replyRoutes } from './reply-routes'
import { topicRoutes } from './topic-routes'

export const router = express.Router()

router.use('/topics', topicRoutes)
router.use('/comments', commentRoutes)
router.use('/replies', replyRoutes)
