import { Reaction } from '@core/types'
import { API } from '../api.service'

export class ReactionAPI extends API {
  constructor() {
    super('/api')
  }

  public getReactions<Response>(commentId: number) {
    return this.http.get<Response>(`/reactions/${commentId}`)
  }

  public addReaction<Response>(data: Reaction) {
    return this.http.post<Response>('/reaction', { data })
  }

  public deleteReaction<Response>(data: Reaction) {
    return this.http.delete<Response>('/reaction', { data })
  }
}
