import { Link } from 'react-router-dom'

import { Typography } from '@components/typography'
import { Topic } from '@core/types'

import styles from './styles.module.css'

export const TopicItem = ({ id, topicName, comments }: Topic) => {
  return (
    <Link className={styles.topicItem} to={`${id}`}>
      {/*  className={styles.name} */}
      <Typography tag="h2" fontSize="l">
        {topicName}
      </Typography>

      <Typography fontSize="m">
        comments: <span className={styles.number}>{comments.length}</span>
      </Typography>
    </Link>
  )
}
