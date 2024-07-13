import { FC } from 'react'

import { Space } from '@components/space'
import { TopicItem } from './TopicItem'

import { LoadStatus } from '@core/types'
import { useAppSelector } from '@store/hooks'
import styles from './styles.module.css'

export const TopicList: FC = () => {
  const { allTopics, status } = useAppSelector(state => state.topics)

  return (
    <Space gap="24px" className={styles.topicList}>
      {status === LoadStatus.LOADING && 'Loading...'}
      {allTopics?.length &&
        allTopics.map(topic => <TopicItem key={topic.id} {...topic} />)}
    </Space>
  )
}
