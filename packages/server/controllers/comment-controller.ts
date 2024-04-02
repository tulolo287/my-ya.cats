import { Comment } from '../models/comment'

class CommentController {
  async getComments(_req: any, res: any) {
    const comments = await Comment.findAll()
    res.json(comments)
  }
  async addComment(req: any, res: any) {
    try {
      if (req.body.data) {
        const { data } = req.body
        //topicName = JSON.parse(topicName)
        const newComment = await Comment.create({ ...data })
        res.json(newComment)
      }
    } catch (error) {
      console.error(error)
    }
  }
}
export const commentController = new CommentController()
