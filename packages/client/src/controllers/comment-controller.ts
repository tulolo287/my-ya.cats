import { CommentAPI } from '@services/api/comment-api'
import { NewComment, Topic } from '@core/types'

class CommentController {
  private api = new CommentAPI()

  async addCommentToTopic(comment: NewComment) {
    const { data } = await this.api.addCommentToTopic(comment)
    return data as Topic[]
  }
}

export default new CommentController()
