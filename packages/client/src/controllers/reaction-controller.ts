import { Reaction, ReactionList } from '@core/types'
import { ReactionAPI } from '@services/api/reaction-api'

class ReactionController {
  private api = new ReactionAPI()

  async getReactions(commentId: number) {
    const { data } = await this.api.getReactions<ReactionList>(commentId)
    return data
  }

  addReaction(data: Reaction) {
    return this.api.addReaction(data)
  }

  deleteReaction(data: Reaction) {
    return this.api.addReaction(data)
  }
}

export default new ReactionController()
