import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Background } from '@components/background'
import { Button } from '@components/button'
import { Center } from '@components/center'
import { Modal } from '@components/modal'
import { Paper } from '@components/paper'
import { Space } from '@components/space'
import { Typography } from '@components/typography'
import { AddTopicModalContent } from './AddTopicModalContent'
import { TopicList } from './TopicList'

import styles from './styles.module.css'

const ForumPage = () => {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)

  return (
    <Background>
      <Center>
        <Space gap="40px" className={styles.container} align="center">
          <Typography tag="h1" fontSize="xxl" align="center">
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

          <Button onClick={() => navigate('/')}>Back</Button>
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

export default ForumPage
