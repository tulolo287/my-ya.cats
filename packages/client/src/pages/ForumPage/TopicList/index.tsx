import { FC, useContext, useEffect } from 'react'

import { Space } from '@components/space'
import TopicController from '@controllers/topic-controller'
import { TopicsContext } from '@context/topics-context'
import { TopicItem } from './TopicItem'

import styles from './styles.module.css'

export const TopicList: FC = () => {
  const { topics, setTopics } = useContext(TopicsContext)

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
