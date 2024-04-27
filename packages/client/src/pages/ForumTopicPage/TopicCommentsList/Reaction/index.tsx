import { Space } from '@components/space'
import styles from './styles.module.css'
import { FC, memo } from 'react'
import { Emoji, EmojiStyle } from 'emoji-picker-react'
import { Typography } from '@components/typography'

type ReactionProps = {
  isCurrentUserReaction: boolean
  emojiId: string
  count: number
  onClick: () => void
}

export const Reaction: FC<ReactionProps> = memo(
  ({ isCurrentUserReaction, emojiId, count, onClick }) => {
    return (
      <button
        className={`${styles.reaction} ${
          isCurrentUserReaction ? styles.currentUserReaction : ''
        }`}
        onClick={onClick}>
        <Space direction="row" gap="4px">
          <Emoji unified={emojiId} size={20} emojiStyle={EmojiStyle.NATIVE} />
          <Typography fontSize="m">{count}</Typography>
        </Space>
      </button>
    )
  }
)
