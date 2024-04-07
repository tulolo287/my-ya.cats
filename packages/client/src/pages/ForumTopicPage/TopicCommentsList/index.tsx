import { Typography } from '@components/typography'
import { Paper } from '@components/paper'
import { Space } from '@components/space'
import { Comment } from '@core/types'

import styles from './styles.module.css'
import { Reaction } from './Reaction'

type Props = {
  comments: Comment[]
}

export const TopicCommentsList = ({ comments }: Props) => {
  return comments.length > 0 ? (
    <Space gap="24px" align="center" className={styles.wrapper}>
      {comments.map(({ id, username, text }) => (
        <Paper key={id} className={styles.container}>
          <Space gap="16px">
            <Typography fontSize="l" color="orange">
              {username}
            </Typography>
            <Typography fontSize="m">{text}</Typography>
            <Reaction isCurrentUserReaction={false} emojiId={''} count={1} />
          </Space>
        </Paper>
      ))}
    </Space>
  ) : (
    <Paper className={styles.container}>No comments yet</Paper>
  )
}
