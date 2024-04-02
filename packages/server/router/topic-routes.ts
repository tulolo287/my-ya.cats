import { topicController } from '../controllers/topic-controller'
import express from 'express'

export const topicRoutes = express.Router()

topicRoutes.get('/all', topicController.getTopics)
topicRoutes.get('/:id', topicController.getTopicById)
topicRoutes.post('/add', topicController.addTopic)
