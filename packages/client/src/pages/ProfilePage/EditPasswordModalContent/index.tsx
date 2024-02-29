import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@components/button'
import { Input } from '@components/input'
import { Space } from '@components/space'
import { Typography } from '@components/typography'
import { InputTypes, UserPasswordData } from '@core/types'
import { validation } from '@core/constants'
import { useAppDispatch } from '@store/hooks'
import { changePassword } from '@store/user/user-thunks'

import styles from './styles.module.css'

const validationPassword = {
  newPassword: (value: string, formValues: ChangePassword) =>
    value !== formValues.oldPassword ||
    'The new password must be different from the old password',
  secondNewPassword: (value: string, formValues: ChangePassword) =>
    value === formValues.newPassword || 'Must match new password',
}

type ChangePassword = UserPasswordData & { secondNewPassword: string }

export const EditPasswordModalContent: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePassword>()

  const dispatch = useAppDispatch()

  const onSubmit: SubmitHandler<ChangePassword> = data => {
    const { oldPassword, newPassword } = data
    dispatch(changePassword({ oldPassword, newPassword }))
  }

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
              validate: validationPassword.newPassword,
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
              validate: validationPassword.secondNewPassword,
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
