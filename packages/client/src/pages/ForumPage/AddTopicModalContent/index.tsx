import { FC, SyntheticEvent, useState, useContext } from 'react'

import { Button } from '@components/button'
import { Input } from '@components/input'
import { Space } from '@components/space'
import { Typography } from '@components/typography'
import TopicController from '@controllers/topic-controller'
import { TopicsContext } from '@context/topics-context'
import { InputTypes, NewTopic } from '@core/types'

import styles from './styles.module.css'

const addNewTopic = async (data: NewTopic) => {
  await TopicController.addNewTopic(data)
}

export const AddTopicModalContent: FC = () => {
  const [status, setStatus] = useState('')
  const { setTopics } = useContext(TopicsContext)

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    const formJson = Object.fromEntries(formData.entries())

    try {
      await addNewTopic(formJson as NewTopic)
      const data = await TopicController.getTopics()
      if (data) {
        setTopics(data)
      }

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
