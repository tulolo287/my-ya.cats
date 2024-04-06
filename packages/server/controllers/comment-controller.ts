import type { Request, Response } from 'express'
import { Reply } from '../models/reply'
import { Comment } from '../models/comment'

class CommentController {
  async getComments(_req: any, res: Response) {
    const comments = await Comment.findAll({
      include: [{ model: Reply, as: 'replies' }],
    })
    res.json(comments)
  }

  async getCommentsByTopicId(req: any, res: Response) {
    const { id } = req.params
    const data = await Comment.findOne({
      where: { id },
      include: [{ model: Reply, as: 'replies' }],
    })
    res.json(data)
  }

  async addComment(req: Request, res: Response) {
    try {
      if (req.body.text) {
        const { text, topicId, username } = req.body
        const newComment = await Comment.create({
          text,
          topicId,
          username,
        })
        res.json(newComment)
      }
    } catch (error) {
      console.error(error)
    }
  }
}
export const commentController = new CommentController()
