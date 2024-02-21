import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
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
import { InputTypes, User } from '@core/types'
import { validation } from '@core/constants'

const onSubmit: SubmitHandler<User> = data => {
  // TODO Поменять на вызов API
  console.log(data)
}

const ProfilePage = () => {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>()

  return (
    <Background>
      <Center>
        <Paper className={styles.container}>
          <Space className={styles.content}>
            <AvatarUpload />
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.inputs}>
                <Input
                  type={InputTypes.text}
                  label="Name"
                  placeholder="Name"
                  w="100%"
                  h="48px"
                  {...register('first_name', {
                    ...validation.first_name,
                  })}
                  errorMessage={errors.first_name?.message}
                />
                <Input
                  type={InputTypes.tel}
                  label="Phone"
                  placeholder="+0(000)000-00-00"
                  w="100%"
                  h="48px"
                  {...register('phone', { ...validation.phone })}
                  errorMessage={errors.phone?.message}
                />
                <Input
                  type={InputTypes.text}
                  label="Second name"
                  placeholder="Second name"
                  w="100%"
                  h="48px"
                  {...register('second_name', {
                    ...validation.second_name,
                  })}
                  errorMessage={errors.second_name?.message}
                />
                <Input
                  type={InputTypes.text}
                  label="Login"
                  placeholder="Login"
                  w="100%"
                  h="48px"
                  {...register('login', { ...validation.login })}
                  errorMessage={errors.login?.message}
                />
                <Input
                  type={InputTypes.email}
                  label="Email"
                  placeholder="test@test.com"
                  w="100%"
                  h="48px"
                  {...register('email', { ...validation.email })}
                  errorMessage={errors.email?.message}
                />
              </div>
              <Button type="submit" color="orange" w="400px" h="66px">
                Edit
              </Button>
            </form>
            <Space className={styles.links} gap="8px">
              <button
                className={styles.link}
                onClick={() => setShowModal(true)}>
                Change password
              </button>
              <button className={styles.link} onClick={() => navigate('/')}>
                Back
              </button>
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
