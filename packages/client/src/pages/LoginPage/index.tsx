import { SyntheticEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from '@components/button'
import { Input } from '@components/input'
import { Space } from '@components/space'
import { Typography } from '@components/typography'
import { Background } from '@components/background'
import { Center } from '@components/center'
import { Paper } from '@components/paper'
import AuthController from '@controllers/auth-controller'
import { AuthLoginData } from '@core/types'
import { routerPaths } from '@core/constants'

import styles from './styles.module.css'

const LoginPage = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    const formJson = Object.fromEntries(formData.entries())

    try {
      await AuthController.login(formJson as AuthLoginData)
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
            <form onSubmit={submitHandler}>
              <Space gap="62px" align="center">
                <Space gap="16px">
                  <Input
                    type="text"
                    label="Login"
                    name="login"
                    w="300px"
                    h="48px"
                  />
                  <Input
                    type="password"
                    label="Password"
                    name="password"
                    w="300px"
                    h="48px"
                  />
                </Space>
                <Space>
                  {error && <Typography align="center">{error}</Typography>}
                  <Button color="orange" w="300px">
                    Login
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
