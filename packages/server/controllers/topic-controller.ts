import { Comment } from '../models/comment'
import { Topic } from '../models/topic'
import { User } from '../models/user'

class TopicController {
  async getTopics(_req: any, res: any) {
    const topics = await Topic.findAll({
      include: [
        { model: Comment, as: 'comments' },
        { model: User, as: 'user' },
      ],
    })
    res.json(topics)
  }

  async getTopicById(req: any, res: any) {
    const { id } = req.params
    const data = await Topic.findOne({
      where: { id },
      include: [{ model: Comment, as: 'comments' }],
    })
    res.json(data)
  }

  async addTopic(req: any, res: any) {
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