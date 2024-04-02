import { Reply } from '../models/reply'

class ReplyController {
  async getReplies(_req: any, res: any) {
    const reply = await Reply.findAll()
    res.json(reply)
  }

  async addReply(req: any, res: any) {
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
