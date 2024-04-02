import { NewComment, NewTopic } from '@core/types'
import { API } from '../api.service'

export class TopicAPI extends API {
  constructor() {
    super('/api/topic', `http://localhost:${__SERVER_PORT__}`)
  }

  public async getTopics<Response>() {
    return await this.http.get<Response>('/all')
  }

  public async addNewTopic<Response>(data: NewTopic) {
    return await this.http.post<Response>('/add', {
      data: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    })
  }

  public async getTopicById<Response>(id: string) {
    return await this.http.get<Response>(id)
  }

  public async addCommentToTopic<Response>(data: NewComment) {
    return await this.http.post<Response>('/comment/add', {
      data: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
