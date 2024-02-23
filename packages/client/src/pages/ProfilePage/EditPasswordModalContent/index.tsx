import { FC, SyntheticEvent } from 'react'

import { Button } from '@components/button'
import { Input } from '@components/input'
import { Space } from '@components/space'
import { Typography } from '@components/typography'
import UserController from '@controllers/user-controller'
import { InputTypes, UserPasswordData } from '@core/types'

import styles from './styles.module.css'

const changePassword = async (data: UserPasswordData) => {
  await UserController.changePassword(data)
}

const onSubmit = async (e: SyntheticEvent) => {
  e.preventDefault()

  const form = e.target as HTMLFormElement
  const formData = new FormData(form)

  const formJson = Object.fromEntries(formData.entries())

  try {
    await changePassword(formJson as UserPasswordData)
  } catch (error) {
    console.log(error)
  }
}

export const EditPasswordModalContent: FC = () => {
  return (
    <Space gap="32px">
      <Typography align="center" tag="h2" fontSize="xl" color="white">
        Change password
      </Typography>

      <form className={styles.form} onSubmit={onSubmit}>
        <Space gap="24px" className={styles.content} align="center">
          <Input
            type={InputTypes.password}
            label="Old password"
            name="oldPassword"
            w="100%"
            h="48px"
          />
          <Input
            type={InputTypes.password}
            label="New password"
            name="newPassword"
            w="100%"
            h="48px"
          />
          <Input
            type={InputTypes.password}
            label="Repeat new password"
            name="repeatPassword"
            w="100%"
            h="48px"
          />

          <Button color="orange">Save</Button>
        </Space>
      </form>
    </Space>
  )
}
