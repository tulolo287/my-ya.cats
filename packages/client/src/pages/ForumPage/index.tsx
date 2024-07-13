import { Background } from '@components/background'
import { Button } from '@components/button'
import { CatImage } from '@components/catImage'
import { Center } from '@components/center'
import { Modal } from '@components/modal'
import { Paper } from '@components/paper'
import { Space } from '@components/space'
import { Typography } from '@components/typography'
import { usePage } from '@hooks/use-page'
import { PageInitArgs } from '@routes'
import { selectTopics } from '@store/topics/topics-slice'
import { getTopics } from '@store/topics/topics-thunks'
import { selectUser } from '@store/user/user-slice'
import { getUser } from '@store/user/user-thunks'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AddTopicModalContent } from './AddTopicModalContent'
import { TopicList } from './TopicList'
import styles from './styles.module.css'

const ForumPage: FC = () => {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)

  usePage({ initPage: initForumPage })

  return (
    <Background>
      <Center>
        <Space gap="40px" className={styles.container} align="center">
          <CatImage />
          <Typography
            tag="h1"
            fontSize="xxl"
            align="center"
            color="grey-with-shadow">
            Forum
          </Typography>

          <Paper className={styles.topicsWrapper}>
            <Space gap="32px" align="center">
              <TopicList />

              <Button color="orange" onClick={() => setShowModal(true)}>
                New topic
              </Button>
            </Space>
          </Paper>

          <Button onClick={() => navigate(-1)}>Back</Button>
        </Space>
      </Center>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddTopicModalContent />
        </Modal>
      )}
    </Background>
  )
}

export const initForumPage = async ({ dispatch, state, ctx }: PageInitArgs) => {
  const promises: Array<Promise<unknown>> = []

  if (!selectUser(state)) {
    promises.push(dispatch(getUser(ctx)))
  }
  if (!selectTopics(state)) {
    promises.push(dispatch(getTopics(ctx)))
  }

  return Promise.all(promises)
}

export default ForumPage
