import { SyntheticEvent } from 'react'
import { Button } from '../../../components/button'
import { Input } from '../../../components/input'
import { UserPasswordData } from '../../../types/user-password-data'
import UserController from '../../../controllers/user-controller'

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

export const EditPasswordModalContent = () => {
  return (
    <>
      <h2 className={styles.title}>изменение пароля</h2>

      <form className={styles.form} onSubmit={onSubmit}>
        <Input type="password" label="Старый пароль" name="oldPassword" />
        <Input type="password" label="Новый пароль" name="newPassword" />
        <Input
          type="password"
          label="Новый пароль (еще раз)"
          name="repeatPassword"
        />

        <Button className={styles.button} color="orange">
          Сохранить
        </Button>
      </form>
    </>
  )
}
