import { Router } from 'express'
import { reactionRoutes } from './reaction-routes'

const router: Router = Router()
router.use('', reactionRoutes)

export default router
