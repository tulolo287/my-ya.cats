import { Reply } from '../models/reply'
import { Comment } from '../models/comment'

class CommentController {
  async getComments(_req: any, res: any) {
    const comments = await Comment.findAll({
      include: [{ model: Reply, as: 'replies' }],
    })
    res.json(comments)
  }

  async getCommentsByTopicId(req: any, res: any) {
    const { id } = req.params
    const data = await Comment.findOne({
      where: { id },
      include: [{ model: Reply, as: 'replies' }],
    })
    res.json(data)
  }

  async addComment(req: any, res: any) {
    try {
      if (req.body.text) {
        const { text } = req.body
        const { id } = req.params
        const newComment = await Comment.create({ text, topicId: id })
        res.json(newComment)
      }
    } catch (error) {
      console.error(error)
    }
  }
}
export const commentController = new CommentController()