import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'

import { Background } from '@components/background'
import { Button } from '@components/button'
import { Input } from '@components/input'
import { Modal } from '@components/modal'
import { Paper } from '@components/paper'
import { Space } from '@components/space'
import { AvatarUpload } from './AvatarUpload'
import { EditPasswordModalContent } from './EditPasswordModalContent'

import styles from './styles.module.css'
import { Center } from '@/components/center'

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
                placeholder="Имя"
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
                placeholder="Фамилия"
                w="100%"
                h="48px"
              />
              <Input
                type="text"
                label="Login"
                placeholder="Логин"
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
              Редактировать
            </Button>
            <Space className={styles.links} gap="8px">
              <button
                className={styles.link}
                onClick={() => setShowModal(true)}>
                Изменить пароль
              </button>
              <button className={styles.link} onClick={() => navigate('/')}>
                Назад
              </button>
            </Space>
          </Space>
        </Paper>
      </Center>

      {showModal &&
        createPortal(
          <Modal onClose={() => setShowModal(false)}>
            <EditPasswordModalContent />
          </Modal>,
          document.body
        )}
    </Background>
  )
}

export default ProfilePage
