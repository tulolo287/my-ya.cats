import { NewTopic } from '@core/types'
import { API } from '../api.service'

export class TopicAPI extends API {
  constructor() {
    super('/api/topics', `http://localhost:${__SERVER_PORT__}`)
  }

  public async getTopics<Response>() {
    return await this.http.get<Response>('')
  }

  public async addNewTopic<Response>(data: NewTopic) {
    return await this.http.post<Response>('', {
      data: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    })
  }

  public async getTopicById<Response>(id: string) {
    return await this.http.get<Response>(id)
  }
}
