import { TopicAPI } from '@services/api/topic-api'
import { NewTopic, Topic } from '@core/types'

class TopicController {
  private api = new TopicAPI()

  async getTopics() {
    const { data } = await this.api.getTopics()
    return data as Topic[]
  }

  async addNewTopic(topic: NewTopic) {
    const { data } = await this.api.addNewTopic(topic)
    return data as Topic[]
  }

  async getTopicById(id: string) {
    const { data } = await this.api.getTopicById(id)
    return data as Topic | undefined
  }
}

export default new TopicController()
