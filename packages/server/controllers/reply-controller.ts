import type { Request, Response } from 'express'
import { Reply } from '../models/reply'

class ReplyController {
  async getReplies(_req: Request, res: Response) {
    const reply = await Reply.findAll()
    res.json(reply)
  }

  async getReplyById(req: Request, res: Response) {
    if (req.params.id) {
      const { id } = req.params
      try {
        const data = await Reply.findOne({
          where: { id },
        })
        res.json(data)
      } catch (error) {
        res.status(500).send(error)
      }
    } else {
      res.status(403).send('No data')
    }
  }

  async addReply(req: Request, res: Response) {
    if (req.body.data && req.params.id) {
      const { text } = req.body
      const { id } = req.params
      try {
        const newReply = await Reply.create({ text, commentId: id })
        res.json(newReply)
      } catch (error) {
        res.status(500).send(error)
      }
    } else {
      res.status(403).send('No data')
    }
  }
}

export const replyController = new ReplyController()
