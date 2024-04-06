import type { Request, Response } from 'express'
import { Comment } from '../models/comment'
import { Topic } from '../models/topic'
import { User } from '../models/user'

class TopicController {
  async getTopics(_req: Request, res: Response) {
    const topics = await Topic.findAll({
      include: [
        { model: Comment, as: 'comments' },
        { model: User, as: 'user' },
      ],
    })
    res.json(topics)
  }

  async getTopicById(req: Request, res: Response) {
    const { id } = req.params
    const data = await Topic.findOne({
      where: { id },
      include: [{ model: Comment, as: 'comments' }],
    })
    res.json(data)
  }

  async addTopic(req: Request, res: Response) {
    try {
      if (req.body.topicName) {
        const { topicName } = req.body
        const newTopic = await Topic.create({ topicName })
        res.json(newTopic)
      }
    } catch (error) {
      console.error(error)
    }
  }
}
export const topicController = new TopicController()
