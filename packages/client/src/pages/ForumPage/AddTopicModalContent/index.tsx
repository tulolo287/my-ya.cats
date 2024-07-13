import { FC, SyntheticEvent, useState } from 'react'

import { Button } from '@components/button'
import { Input } from '@components/input'
import { Space } from '@components/space'
import { Typography } from '@components/typography'
import TopicController from '@controllers/topic-controller'
import { InputTypes, NewTopic, Topic } from '@core/types'

import { useAppDispatch, useAppSelector } from '@store/hooks'
import styles from './styles.module.css'
import { addTopic } from '@store/topics/topics-slice'
import { addNewTopic } from '@store/topics/topics-thunks'

export const AddTopicModalContent: FC = () => {
  const [status, setStatus] = useState('')
  const dispatch = useAppDispatch()
  const { allTopics } = useAppSelector(state => state.topics)

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    const formJson = Object.fromEntries(formData.entries())

    try {
      // await addNewTopic(formJson as NewTopic).then(() => dispatch(getTopics()))
      dispatch(addNewTopic(formJson as NewTopic)).then(topic =>
        dispatch(addTopic(topic))
      )

      form.reset()
      setStatus('Topic has been added. You can close modal now :)')
    } catch (error) {
      if (typeof error === 'string') {
        setStatus(error)
      } else {
        console.log(error)
      }
    }
  }

  return (
    <Space gap="32px">
      <Typography align="center" tag="h2" fontSize="xl" color="white">
        Create new topic
      </Typography>

      <form onSubmit={onSubmit}>
        <Space gap="24px" className={styles.content} align="center">
          <Input
            autoFocus
            type={InputTypes.text}
            label="Topic name"
            name="topicName"
            w="100%"
            h="48px"
          />

          <Button color="orange">Create</Button>
          {status && <b>{status}</b>}
        </Space>
      </form>
    </Space>
  )
}
