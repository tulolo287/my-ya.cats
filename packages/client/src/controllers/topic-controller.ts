import { TopicAPI } from '@services/topic-api'
import { Comment, NewTopic, Topic } from '@core/types'

const mockData: Topic[] = [
  {
    id: 1,
    topicName: '34lldks',
    comments: [{ id: 1, username: 'sdjk 3', text: 'conooas erwr werw ssc' }],
  },
  {
    id: 2,
    topicName: 'wie pewowe',
    comments: [{ id: 2, username: 'dsdfdsfdf', text: 'conooas erwr werw ssc' }],
  },
  {
    id: 3,
    topicName: '32 werkdk',
    comments: [
      { id: 3, username: 'sdf dsf', text: 'conooas erwr werw ssc' },
      { id: 4, username: 'ddf df', text: 'conooas erwr werw ssc' },
    ],
  },
  {
    id: 4,
    topicName: 'klew owwooew wrwrw',
    comments: [{ id: 5, username: '3er33', text: 'conooas erwr werw ssc' }],
  },
  {
    id: 5,
    topicName: 'wrp ere 324 dd',
    comments: [{ id: 6, username: 'sdf sfd', text: 'conooas erwr werw ssc' }],
  },
  { id: 6, topicName: '34lldks', comments: [] },
]

const mockTopic: Topic = {
  id: 7,
  topicName: 'new created topic',
  comments: [],
}

class TopicController {
  private api = new TopicAPI()

  async getTopics() {
    // todo: убрать моковые данные (YAC-31)
    return mockData
  }

  async addNewTopic(data: NewTopic) {
    // todo: убрать моковые данные (YAC-31)
    console.log('addNewTopic |', data)
    return mockTopic
  }

  async getTopicById(id: number) {
    // todo: убрать моковые данные (YAC-31)
    console.log('getTopicById |', id)
    const currentTopic = mockData.find(topic => topic.id === id)
    return currentTopic ?? mockTopic
  }

  async addCommentToTopic(data: Omit<Comment, 'id'>) {
    // todo: убрать моковые данные (YAC-31)
    console.log('addCommentToTopic |', data)
    return data
  }
}

export default new TopicController()
