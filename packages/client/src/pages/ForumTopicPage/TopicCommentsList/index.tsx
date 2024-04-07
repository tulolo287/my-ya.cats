import { Typography } from '@components/typography'
import { Paper } from '@components/paper'
import { Space } from '@components/space'
import { Comment } from '@core/types'

import styles from './styles.module.css'
import { Reaction } from './Reaction'
import { useEffect } from 'react'
import EmojiPicker from 'emoji-picker-react'
import { EmojiClickData } from 'emoji-picker-react'
import reactionController from '@controllers/reaction-controller'

const addReaction = async (emoji: EmojiClickData, commentId: number) => {
  const response = await reactionController.addReaction({
    emojiId: emoji.unified,
    commentId,
  })
  console.log(response)
}

type Props = {
  comments: Comment[]
}

export const TopicCommentsList = ({ comments }: Props) => {
  // useEffect(() => {}, [])

  return comments.length > 0 ? (
    <Space gap="24px" align="center" className={styles.wrapper}>
      {comments.map(({ id, username, text }) => (
        <Paper key={id} className={styles.container}>
          <Space gap="16px">
            <Typography fontSize="l" color="orange">
              {username}
            </Typography>
            <Typography fontSize="m">{text}</Typography>
            <Space direction="row" gap="4px">
              <Reaction isCurrentUserReaction={false} emojiId={''} count={1} />
              <EmojiPicker
                reactionsDefaultOpen={true}
                allowExpandReactions={false}
                className={styles.emojiPicker}
                onReactionClick={emoji => {
                  addReaction(emoji, id)
                }}
              />
            </Space>
          </Space>
        </Paper>
      ))}
    </Space>
  ) : (
    <Paper className={styles.container}>No comments yet</Paper>
  )
}
