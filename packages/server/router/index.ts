import { Router } from 'express'
import { reactionRoutes } from './reaction-routes'
import { commentRoutes } from './comment-routes'
import { replyRoutes } from './reply-routes'
import { topicRoutes } from './topic-routes'

export const router: Router = Router()

router.use('/topics', topicRoutes)
router.use('/comments', commentRoutes)
router.use('/replies', replyRoutes)
router.use('', reactionRoutes)

export default router
