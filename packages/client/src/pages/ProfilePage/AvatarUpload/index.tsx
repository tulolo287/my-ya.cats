import { useState, ChangeEvent, SyntheticEvent } from 'react'
import { createPortal } from 'react-dom'

import { Button } from '@components/button'
import { Modal } from '@components/modal'
import { Space } from '@components/space'
import { Typography } from '@components/typography'
import userController from '@controllers/user-controller'

import styles from './styles.module.css'

export const AvatarUpload = () => {
  const [showModal, setShowModal] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()

    if (file) {
      const formData = new FormData()
      formData.append('file', file)

      try {
        userController.changeAvatar(formData)
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <>
      <button
        className={styles.avatarUpload}
        onClick={() => setShowModal(true)}
      />

      {showModal &&
        createPortal(
          <Modal onClose={() => setShowModal(false)}>
            <form onSubmit={onSubmit}>
              <Space gap="32px" className={styles.content}>
                <Typography fontSize="xl" tag="h2" color="white">
                  Изменение аватара
                </Typography>

                <input
                  name="avatar"
                  type="file"
                  accept="image/*"
                  onChange={onChange}
                />

                <Button>Изменить</Button>
              </Space>
            </form>
          </Modal>,
          document.body
        )}
    </>
  )
}
