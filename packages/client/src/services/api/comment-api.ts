import { NewComment } from '@core/types'
import { API } from '../api.service'

export class CommentAPI extends API {
  constructor() {
    super('/api/comments')
  }

  public async addCommentToTopic<Response>(data: NewComment) {
    return await this.http.post<Response>('', {
      data: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
