import { FC, SyntheticEvent } from 'react'

import { Button } from '@components/button'
import { Space } from '@components/space'
import { Typography } from '@components/typography'
import TopicController from '@controllers/topic-controller'
import { Comment } from '@core/types'

import styles from './styles.module.css'

type CommentData = Omit<Comment, 'id'>

const addComment = async (data: CommentData) => {
  await TopicController.addCommentToTopic(data)
}

const onSubmit = async (e: SyntheticEvent) => {
  e.preventDefault()

  const textareaValue = (
    (e.target as HTMLFormElement)[0] as HTMLTextAreaElement
  ).value
  // todo: добавить username из стора (YAC-31)
  const data = {
    text: textareaValue,
    username: 'test username',
  }
  try {
    await addComment(data as CommentData)
  } catch (error) {
    console.log(error)
  }
}

export const AddCommentForm: FC = () => {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <Space gap="16px" align="center">
        <Space gap="8px" className={styles.commentField}>
          <Typography fontSize="l">
            <label htmlFor="comment-textarea">Enter your comment</label>
          </Typography>
          <textarea
            className={styles.textarea}
            rows={5}
            id="comment-textarea"></textarea>
        </Space>

        <Button color="orange">Send</Button>
      </Space>
    </form>
  )
}
