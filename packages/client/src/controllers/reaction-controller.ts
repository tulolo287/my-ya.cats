import { Reaction, ReactionList } from '@core/types'
import { ReactionAPI } from '@services/api/reaction-api'

class ReactionController {
  private api = new ReactionAPI()

  getReactions(commentId: number) {
    return this.api.getReactions<ReactionList>(commentId)
  }

  addReaction(data: Reaction) {
    return this.api.addReaction(data)
  }

  deleteReaction(data: Reaction) {
    return this.api.deleteReaction(data)
  }
}

export default new ReactionController()
