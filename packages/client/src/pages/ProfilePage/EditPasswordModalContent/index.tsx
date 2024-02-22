
import { FC, SyntheticEvent } from 'react'

import { Button } from '@components/button'
import { Input } from '@components/input'
import { Space } from '@components/space'
import { Typography } from '@components/typography'
import UserController from '@controllers/user-controller'
import { InputTypes, UserPasswordData } from '@core/types'

import styles from './styles.module.css'
import { SubmitHandler, useForm } from 'react-hook-form'
import { validation } from '@core/constants'

const changePassword = async (data: UserPasswordData) => {
  await UserController.changePassword(data)
}

const onSubmit: SubmitHandler<ChangePassword> = async data => {
  const { oldPassword, newPassword } = data
  try {
    await changePassword({ oldPassword, newPassword })
  } catch (error) {
    console.log(error)
  }
}

type ChangePassword = UserPasswordData & { secondNewPassword: string }

export const EditPasswordModalContent: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePassword>()

  return (
    <Space gap="32px">
      <Typography align="center" tag="h2" fontSize="xl" color="white">
        Change password
      </Typography>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Space gap="24px" className={styles.content} align="center">

          <Input
            type={InputTypes.password}
            label="Old password"
            w="100%"
            h="48px"
            {...register('oldPassword', { ...validation.password })}
            errorMessage={errors.oldPassword?.message}
          />
          <Input
            type={InputTypes.password}
            label="New password"
            w="100%"
            h="48px"
            {...register('newPassword', {
              ...validation.password,
              validate: (value, formValues) =>
                value !== formValues.oldPassword ||
                'The new password must be different from the old password',
            })}
            errorMessage={errors.newPassword?.message}
          />
          <Input
            type={InputTypes.password}
            label="Repeat new password"
            w="100%"
            h="48px"
            {...register('secondNewPassword', {
              ...validation.password,
              validate: (value, formValues) =>
                value === formValues.newPassword || 'Must match new password',
            })}
            errorMessage={errors.secondNewPassword?.message}
          />

          <Button type="submit" color="orange">
            Save
          </Button>
        </Space>
      </form>
    </Space>
  )
}
