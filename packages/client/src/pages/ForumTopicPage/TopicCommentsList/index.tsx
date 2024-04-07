import { Paper } from '@components/paper'
import { Space } from '@components/space'
import { Comment } from './Comment'
import { Comment as CommentType } from '@core/types'

import styles from './styles.module.css'

type Props = {
  comments: CommentType[]
}

export const TopicCommentsList = ({ comments }: Props) => {
  return comments.length > 0 ? (
    <Space gap="24px" align="center" className={styles.wrapper}>
      {comments.map(({ id, username, text }) => (
        <Comment key={id} id={id} username={username} text={text} />
      ))}
    </Space>
  ) : (
    <Paper className={styles.container}>No comments yet</Paper>
  )
}
