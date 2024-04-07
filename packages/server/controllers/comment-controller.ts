import type { Request, Response } from 'express'
import { Comment } from '../models/comment'
import { Reply } from '../models/reply'

class CommentController {
  async getComments(_req: any, res: Response) {
    try {
      const comments = await Comment.findAll({
        include: [{ model: Reply, as: 'replies' }],
      })
      res.json(comments)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  async getCommentsByTopicId(req: any, res: Response) {
    if (req.params.id) {
      const { id } = req.params
      try {
        const data = await Comment.findOne({
          where: { id },
          include: [{ model: Reply, as: 'replies' }],
        })
        res.json(data)
      } catch (error) {
        res.status(500).send(error)
      }
    } else {
      res.status(403).send('No data')
    }
  }

  async addComment(req: Request, res: Response) {
    if (req.body.text && req.body.topicId && req.body.username) {
      try {
        const { text, topicId, username } = req.body
        const newComment = await Comment.create({
          text,
          topicId,
          username,
        })
        res.json(newComment)
      } catch (error) {
        res.status(500).send(error)
      }
    } else {
      res.status(403).send('No data')
    }
  }
}
export const commentController = new CommentController()
