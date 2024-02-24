import { API } from '../api.service'

export class TopicAPI extends API {
  constructor() {
    super('/topics')
  }

  public async getTopics<Response>() {
    return await this.http.get<Response>('')
  }

  public async addNewTopic<Response>(data: FormData) {
    return await this.http.post<Response>('', data)
  }

  public async getTopicById<Response>(id: number) {
    return await this.http.get<Response>('/:id', id)
  }

  public async addCommentToTopic<Response>(data: FormData) {
    return await this.http.post<Response>('/comment', data)
  }
}
