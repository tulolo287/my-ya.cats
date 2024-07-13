import { Headers, NewTopic } from '@core/types'
import { API } from '../api.service'

export class TopicAPI extends API {
  constructor() {
    super('/api/topics')
  }

  public getTopics = <Response>(data?: Headers) => {
    return this.http.get<Response>('/', data)
  }

  public addNewTopic<Response>(data: NewTopic) {
    return this.http.post<Response>('', {
      data: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    })
  }

  public async getTopicById<Response>(id: string) {
    return await this.http.get<Response>(id)
  }
}
