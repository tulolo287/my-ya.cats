import { useState, ChangeEvent, SyntheticEvent } from 'react'

import { Button } from '@components/button'
import { Modal } from '@components/modal'
import { Space } from '@components/space'
import { Typography } from '@components/typography'
import userController from '@controllers/user-controller'

import styles from './styles.module.css'

export const AvatarUpload = () => {
  const [showModal, setShowModal] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [avatarUrl, setAvatarUrl] = useState(localStorage.getItem('avatarUrl'))

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()

    if (file) {
      const formData = new FormData()
      formData.append('avatar', file)

      try {
        await userController.changeAvatar(formData)
        // todo: брать из стора (YAC-29)
        setAvatarUrl(localStorage.getItem('avatarUrl') || '')
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <>
      <button
        className={styles.avatarUpload}
        onClick={() => setShowModal(true)}>
        {avatarUrl && (
          <img src={avatarUrl} className={styles.image} alt="user avatar" />
        )}
      </button>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <form onSubmit={onSubmit}>
            <Space gap="32px" className={styles.content}>
              <Typography fontSize="xl" tag="h2" color="white">
                Change avatar
              </Typography>

              <input
                name="avatar"
                type="file"
                accept="image/*"
                onChange={onChange}
              />

              <Button>Change</Button>
            </Space>
          </form>
        </Modal>
      )}
    </>
  )
}
