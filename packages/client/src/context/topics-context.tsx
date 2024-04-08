import { createContext } from 'react'
import { Topic } from '@core/types'

type AllTopicsContext = {
  topics: Topic[]
  setTopics: (topics: Topic[]) => void
}

type CurrentTopicContext = {
  topic?: Topic
  setTopic: (topic: Topic) => void
}

export const TopicsContext = createContext<AllTopicsContext>({
  topics: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setTopics: () => {},
})

export const CurrentTopicContext = createContext<CurrentTopicContext>({
  topic: undefined,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setTopic: () => {},
})
