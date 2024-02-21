import { FC, useState } from 'react'
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
import { InputTypes } from '@core/types'

const ProfilePage: FC = () => {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)

  return (
    <Background>
      <Center>
        <Paper className={styles.container}>
          <Space align="center">
            <AvatarUpload />
            <div className={styles.inputs}>
              <Input
                type={InputTypes.text}
                label="Name"
                placeholder="Name"
                w="100%"
                h="48px"
              />
              <Input
                type={InputTypes.tel}
                label="Phone"
                placeholder="+0(000)000-00-00"
                w="100%"
                h="48px"
              />
              <Input
                type={InputTypes.text}
                label="Second name"
                placeholder="Second name"
                w="100%"
                h="48px"
              />
              <Input
                type={InputTypes.text}
                label="Login"
                placeholder="Login"
                w="100%"
                h="48px"
              />
              <Input
                type={InputTypes.email}
                label="Email"
                placeholder="test@test.com"
                w="100%"
                h="48px"
              />
            </div>
            <Button color="orange" w="400px" h="66px">
              Edit
            </Button>
            <Space className={styles.links} gap="8px" align="center">
              <button
                className={styles.link}
                onClick={() => setShowModal(true)}>
                Change password
              </button>
              <a className={styles.link} onClick={() => navigate(-1)}>
                Back
              </a>
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
