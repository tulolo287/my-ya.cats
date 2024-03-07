import { useState, ChangeEvent, SyntheticEvent, FC } from 'react'

import { Button } from '@components/button'
import { Modal } from '@components/modal'
import { Space } from '@components/space'
import { Typography } from '@components/typography'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { changeAvatar } from '@store/user/user-thunks'

import styles from './styles.module.css'

export const AvatarUpload: FC = () => {
  const [showModal, setShowModal] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const avatarUrl = useAppSelector(state => state.user.currentUser?.avatar)
  const dispatch = useAppDispatch()

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault()

    if (file) {
      const formData = new FormData()
      formData.append('avatar', file)

      dispatch(changeAvatar(formData))
    }
  }

  return (
    <>
      <button
        className={styles.avatarUpload}
        onClick={() => setShowModal(true)}>
        {avatarUrl && (
          <img
            src={`${process.env.API_URL}/resources/${avatarUrl}`}
            className={styles.image}
            alt="user avatar"
          />
        )}
      </button>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <form onSubmit={onSubmit}>
            <Space gap="32px" align="center">
              <Typography fontSize="xl" tag="h2" color="white">
                Change avatar
              </Typography>

              <input
                autoFocus
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
