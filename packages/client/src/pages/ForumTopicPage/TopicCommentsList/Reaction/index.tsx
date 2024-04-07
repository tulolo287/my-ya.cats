import { Space } from '@components/space'
import styles from './styles.module.css'
import { FC } from 'react'
import { Emoji } from 'emoji-picker-react'
import { Typography } from '@components/typography'

type ReactionProps = {
  isCurrentUserReaction: boolean
  emojiId: string
  count: number
}

export const Reaction: FC<ReactionProps> = ({
  isCurrentUserReaction,
  emojiId,
  count,
}) => {
  return (
    <button
      className={`${styles.reaction} ${
        isCurrentUserReaction ? styles.currentUserReaction : ''
      }`}>
      <Space direction="row" gap="4px">
        <Emoji unified="1f423" size={20} />
        <Typography fontSize="m">{count}</Typography>
      </Space>
    </button>
  )
}
