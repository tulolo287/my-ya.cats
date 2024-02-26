import { FC, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from '@components/button'
import { Input } from '@components/input'
import { Space } from '@components/space'
import { Typography } from '@components/typography'
import { Background } from '@components/background'
import { Center } from '@components/center'
import { Paper } from '@components/paper'
import AuthController from '@controllers/auth-controller'
import { AuthLoginData, InputTypes } from '@core/types'
import { routerPaths, validation } from '@core/constants'

import styles from './styles.module.css'
import { SubmitHandler, useForm } from 'react-hook-form'

const LoginPage: FC = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthLoginData>()

  const onSubmit: SubmitHandler<AuthLoginData> = async data => {
    try {
      await AuthController.login(data)
      setError('')
      // TODO: перенести в стор когда появится редакс
      localStorage.setItem('isAuth', 'true')
      navigate(routerPaths.main)
    } catch (error) {
      setError(error as string)
    }
  }

  return (
    <Background>
      <Center>
        <Paper>
          <Space gap="62px" align="center">
            <Typography
              align="center"
              tag="h2"
              fontSize="xxxl"
              color="grey-with-shadow">
              LOGIN
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Space gap="62px" align="center">
                <Space gap="16px">
                  <Input
                    type={InputTypes.text}
                    label="Login"
                    w="300px"
                    h="48px"
                    placeholder="Login"
                    {...register('login', { ...validation.login })}
                    errorMessage={errors.login?.message}
                  />
                  <Input
                    type={InputTypes.password}
                    label="Password"
                    w="300px"
                    h="48px"
                    placeholder="Password"
                    {...register('password', { ...validation.password })}
                    errorMessage={errors.password?.message}
                  />
                </Space>
                <Space>
                  {error && <Typography align="center">{error}</Typography>}
                  <Button type="submit" color="orange" w="300px">
                    LOG IN
                  </Button>
                </Space>
              </Space>
            </form>
            <Typography align="center" color="grey" fontSize="m">
              Don’t have an account yet?
              <Link to={routerPaths.signup} className={styles.link}>
                Register
              </Link>
            </Typography>
          </Space>
        </Paper>
      </Center>
    </Background>
  )
}

export default LoginPage
