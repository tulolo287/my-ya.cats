import express from 'express'
import { topicController } from '../controllers/topic-controller'

export const topicRoutes = express.Router()

topicRoutes.get('/', topicController.getTopics)
topicRoutes.get('/:id', topicController.getTopicById)
topicRoutes.post('/', topicController.addTopic)
