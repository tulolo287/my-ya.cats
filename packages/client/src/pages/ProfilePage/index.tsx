import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Background } from '@components/background'
import { Button } from '@components/button'
import { Center } from '@components/center'
import { Input } from '@components/input'
import { Modal } from '@components/modal'
import { Paper } from '@components/paper'
import { Space } from '@components/space'
import { AvatarUpload } from './AvatarUpload'
import { EditPasswordModalContent } from './EditPasswordModalContent'

import styles from './styles.module.css'

const ProfilePage = () => {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)

  return (
    <Background>
      <Center>
        <Paper className={styles.container}>
          <Space className={styles.content}>
            <AvatarUpload />
            <div className={styles.inputs}>
              <Input
                type="text"
                label="Name"
                placeholder="Name"
                w="100%"
                h="48px"
              />
              <Input
                type="tel"
                label="Phone"
                placeholder="+0(000)000-00-00"
                w="100%"
                h="48px"
              />
              <Input
                type="text"
                label="Second name"
                placeholder="Second name"
                w="100%"
                h="48px"
              />
              <Input
                type="text"
                label="Login"
                placeholder="Login"
                w="100%"
                h="48px"
              />
              <Input
                type="email"
                label="Email"
                placeholder="test@test.com"
                w="100%"
                h="48px"
              />
            </div>
            <Button color="orange" w="400px" h="66px">
              Edit
            </Button>
            <Space className={styles.links} gap="8px">
              <button
                className={styles.link}
                onClick={() => setShowModal(true)}>
                Change password
              </button>
              <button className={styles.link} onClick={() => navigate('/')}>
                Back
              </button>
            </Space>
          </Space>
        </Paper>
      </Center>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditPasswordModalContent />
        </Modal>
      )}
    </Background>
  )
}

export default ProfilePage
