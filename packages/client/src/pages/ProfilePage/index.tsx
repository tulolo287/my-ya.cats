import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'

import { Button } from '../../components/button'
import { Input } from '../../components/input'
import { Paper } from '../../components/paper'
import { Modal } from '../../components/modal'
import { AvatarUpload } from './AvatarUpload'
import { EditPasswordModalContent } from './EditPasswordModalContent'

import styles from './styles.module.css'

const ProfilePage = () => {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)

  return (
    <Paper>
      <section className={styles.container}>
        <AvatarUpload />

        <div className={styles.inputs}>
          <Input
            type="text"
            label="Name"
            placeholder="Имя"
            className={styles.field}
          />
          <Input
            type="tel"
            label="Phone"
            placeholder="+0(000)000-00-00"
            className={styles.field}
          />
          <Input
            type="text"
            label="Second name"
            placeholder="Фамилия"
            className={styles.field}
          />
          <Input
            type="text"
            label="Login"
            placeholder="Логин"
            className={styles.field}
          />
          <Input
            type="email"
            label="Email"
            placeholder="test@test.com"
            className={styles.field}
          />
        </div>

        <Button color="orange" className={styles.editButton}>
          Редактировать
        </Button>

        <div className={styles.links}>
          <button className={styles.link} onClick={() => setShowModal(true)}>
            Изменить пароль
          </button>
          <button className={styles.link} onClick={() => navigate('/')}>
            Назад
          </button>
        </div>
      </section>

      {showModal &&
        createPortal(
          <Modal onClose={() => setShowModal(false)}>
            <EditPasswordModalContent />
          </Modal>,
          document.body
        )}
    </Paper>
  )
}

export default ProfilePage
