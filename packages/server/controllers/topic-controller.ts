import type { Request, Response } from 'express'
import { Comment } from '../models/comment'
import { Topic } from '../models/topic'
import { User } from '../models/user'

class TopicController {
  async getTopics(_req: Request, res: Response) {
    try {
      const topics = await Topic.findAll({
        include: [
          { model: Comment, as: 'comments' },
          { model: User, as: 'user' },
        ],
      })
      res.json(topics)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  async getTopicById(req: Request, res: Response) {
    if (req.params.id) {
      const { id } = req.params
      try {
        const data = await Topic.findOne({
          where: { id },
          include: [{ model: Comment, as: 'comments' }],
        })
        res.json(data)
      } catch (error) {
        res.status(500).send(error)
      }
    } else {
      res.status(403).send('No id available')
    }
  }

  async addTopic(req: Request, res: Response) {
    if (req.body.topicName) {
      const { topicName } = req.body
      try {
        const newTopic = await Topic.create({ topicName })
        res.json(newTopic)
      } catch (error) {
        console.error(error)
        res.status(500).send(error)
      }
    } else {
      res.status(403).send('No topic name')
    }
  }
}
export const topicController = new TopicController()
