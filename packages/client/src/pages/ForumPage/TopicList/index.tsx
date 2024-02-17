import { useEffect, useState } from 'react'

import { Space } from '@components/space'
import TopicController from '@controllers/topic-controller'
import { Topic } from '@core/types'
import { TopicItem } from './TopicItem'

import styles from './styles.module.css'

export const TopicList = () => {
  const [topics, setTopics] = useState<Topic[]>([])

  const getTopics = async () => {
    const data = await TopicController.getTopics()

    if (data) {
      setTopics(data)
    }
  }

  useEffect(() => {
    getTopics()
  }, [])

  return (
    <Space gap="24px" className={styles.topicList}>
      {topics.map(item => (
        <TopicItem key={item.id} {...item} />
      ))}
    </Space>
  )
}
