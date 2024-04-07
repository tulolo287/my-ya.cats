import { Reaction } from '@core/types'
import { API } from '../api.service'

export class ReactionAPI extends API {
  constructor() {
    super('/api')
  }

  public async getReactions<Response>(commentId: number) {
    return await this.http.get<Response>('/reactions', commentId)
  }

  public async addReaction<Response>(data: Reaction) {
    return await this.http.post<Response>('/reaction', { data })
  }

  public async deleteReaction<Response>(data: Reaction) {
    return await this.http.delete<Response>('/reaction', { data })
  }
}
