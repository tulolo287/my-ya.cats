import { Space } from '@components/space'
import styles from './styles.module.css'
import { FC } from 'react'
import { Emoji } from 'emoji-picker-react'
import { Typography } from '@components/typography'

type ReactionProps = {
  isCurrentUserReaction: boolean
  emojiId: string
  count: number
  onClick: () => void
}

export const Reaction: FC<ReactionProps> = ({
  isCurrentUserReaction,
  emojiId,
  count,
  onClick,
}) => {
  return (
    <button
      className={`${styles.reaction} ${
        isCurrentUserReaction ? styles.currentUserReaction : ''
      }`}
      onClick={onClick}>
      <Space direction="row" gap="4px">
        <Emoji unified={emojiId} size={20} />
        <Typography fontSize="m">{count}</Typography>
      </Space>
    </button>
  )
}
