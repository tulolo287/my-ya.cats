import type { Request, Response } from 'express'
import { Reply } from '../models/reply'

class ReplyController {
  async getReplies(_req: Request, res: Response) {
    const reply = await Reply.findAll()
    res.json(reply)
  }

  async getReplyById(req: Request, res: Response) {
    const { id } = req.params
    const data = await Reply.findOne({
      where: { id },
    })
    res.json(data)
  }

  async addReply(req: Request, res: Response) {
    try {
      if (req.body.data) {
        const { text } = req.body
        const { id } = req.params
        const newReply = await Reply.create({ text, commentId: id })
        res.json(newReply)
      }
    } catch (error) {
      console.error(error)
    }
  }
}
export const replyController = new ReplyController()
