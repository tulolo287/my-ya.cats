import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@components/button'
import { Input } from '@components/input'
import { Space } from '@components/space'
import { Typography } from '@components/typography'
import { Background } from '@components/background'
import { Center } from '@components/center'
import { Paper } from '@components/paper'
import { AuthLoginData, InputTypes, LoadStatus } from '@core/types'
import { redirectUri, routerPaths, validation } from '@core/constants'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { login, oAuthServiceId } from '@store/user/user-thunks'
import { Spinner } from '@components/spinner'

import styles from './styles.module.css'

const LoginPage: FC = () => {
  const dispatch = useAppDispatch()
  const { error, status } = useAppSelector(state => state.user)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthLoginData>()

  const onSubmit: SubmitHandler<AuthLoginData> = data => {
    dispatch(login(data))
  }

  const onOAuthLogin = () => {
    dispatch(
      oAuthServiceId({
        redirect_uri: redirectUri,
      })
    )
  }

  return (
    <Background>
      <Center>
        {status === LoadStatus.LOADING && <Spinner />}
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
                  <Space direction="row" gap="12px">
                    <Button type="submit" color="orange" w="240px">
                      LOG IN
                    </Button>
                    <Button type="button" color="orange" w="41px">
                      <img
                        alt="log in with yandex"
                        src="/ya-icon.png"
                        className={styles.oAuthButton}
                        onClick={onOAuthLogin}
                      />
                    </Button>
                  </Space>
                </Space>
              </Space>
            </form>
            <Typography align="center" color="grey" fontSize="m">
              Don’t have an account yet?{' '}
              <Button
                displayStyle="link"
                to={routerPaths.signup}
                fontSize="m"
                w="auto">
                Register
              </Button>
            </Typography>
          </Space>
        </Paper>
      </Center>
    </Background>
  )
}

export default LoginPage
