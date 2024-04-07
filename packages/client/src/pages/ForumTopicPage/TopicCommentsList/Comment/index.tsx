import { Paper } from '@components/paper'
import { Space } from '@components/space'
import { Typography } from '@components/typography'
import { FC, useEffect, useState } from 'react'
import { Reaction } from '../Reaction'
import reactionController from '@controllers/reaction-controller'

import styles from './styles.module.css'
import EmojiPicker from 'emoji-picker-react'
import { ReactionList } from '@core/types'

type CommentProps = {
  id: number
  username: string
  text: string
}

export const Comment: FC<CommentProps> = ({ id, username, text }) => {
  const [reactionList, setReactionList] = useState<ReactionList>([])

  const getReactions = async () => {
    const { data } = await reactionController.getReactions(id)
    setReactionList(data)
  }

  const addReaction = async (emojiId: string, commentId: number) => {
    await reactionController.addReaction({
      emojiId,
      commentId,
    })
    getReactions()
  }

  const deleteReaction = async (emojiId: string, commentId: number) => {
    await reactionController.deleteReaction({
      emojiId,
      commentId,
    })
    getReactions()
  }

  const toggleReaction = (emojiId: string, currentUser: boolean) => {
    if (currentUser) {
      deleteReaction(emojiId, id)
    } else {
      addReaction(emojiId, id)
    }
  }

  useEffect(() => {
    getReactions()
  }, [])

  return (
    <Paper key={id} className={styles.container}>
      <Space gap="16px">
        <Typography fontSize="l" color="orange">
          {username}
        </Typography>
        <Typography fontSize="m">{text}</Typography>
        <Space direction="row" gap="4px">
          {reactionList.map(({ emojiId, count, currentUser }) => (
            <Reaction
              key={emojiId}
              isCurrentUserReaction={currentUser}
              emojiId={emojiId}
              count={count}
              onClick={() => toggleReaction(emojiId, currentUser)}
            />
          ))}
          <EmojiPicker
            reactionsDefaultOpen={true}
            allowExpandReactions={false}
            className={styles.emojiPicker}
            onReactionClick={emoji => {
              addReaction(emoji.unified, id)
            }}
          />
        </Space>
      </Space>
    </Paper>
  )
}
