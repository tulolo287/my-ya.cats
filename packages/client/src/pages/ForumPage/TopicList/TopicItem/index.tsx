import { Link } from 'react-router-dom'

import { Typography } from '@components/typography'
import { Topic } from '@core/types'

import styles from './styles.module.css'

export const TopicItem = ({ id, topicName, comments }: Topic) => {
  return (
    <Link className={styles.topicItem} to={`${id}`}>
      <Typography tag="h2" fontSize="l" className={styles.name}>
        {topicName}
      </Typography>

      <Typography fontSize="m" className={styles.comments}>
        comments: <span className={styles.number}>{comments.length}</span>
      </Typography>
    </Link>
  )
}
