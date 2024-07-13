import { NewTopic, Topic } from '@core/types'
import { TopicAPI } from '@services/api/topic-api'

class TopicController {
  private api = new TopicAPI()

  async getTopics(data?: Headers) {
    return this.api.getTopics<Topic[]>(data)
  }

  async addNewTopic(topic: NewTopic) {
    return this.api.addNewTopic(topic)
  }

  async getTopicById(id: string) {
    const { data } = await this.api.getTopicById(id)
    return data as Topic | undefined
  }
}

export default new TopicController()
