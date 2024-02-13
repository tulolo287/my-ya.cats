import { Space } from '@/components/space'
import { Typography } from '@/components/typography'

import styles from './styles.module.css'

type Props = {
  topicName: string
  commentsNumber: number
}

export const TopicItem = ({ topicName, commentsNumber }: Props) => {
  return (
    <Space direction="row" gap="16px" className={styles.topicItem}>
      <Typography tag="h2" fontSize="l" className={styles.name}>
        {topicName}
      </Typography>
      <Typography fontSize="m">
        comments: <span className={styles.number}>{commentsNumber}</span>
      </Typography>
    </Space>
  )
}
