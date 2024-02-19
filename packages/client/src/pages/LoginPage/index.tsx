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

const LoginPage = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    const formJson = Object.fromEntries(formData.entries())

    try {
      const res = await AuthController.login(formJson as AuthLoginData)
      if (res?.status === 200) {
        setError('')
        // TODO: перенести в стор когда появится редакс
        localStorage.setItem('isAuth', 'true')
        navigate(routerPaths.main)
      }
    } catch (error) {
      setError(error as string)
    }
  }

  // TODO: верстка страницы (YAC-15)
  return (
    <Background>
      <Center>
        <Paper>
          <Space gap="32px">
            <Typography align="center" tag="h2" fontSize="xl" color="black">
              LOGIN
            </Typography>
            <form onSubmit={submitHandler}>
              <Space gap="64px">
                <Space gap="16px">
                  <Input
                    type="text"
                    label="login"
                    name="login"
                    w="100%"
                    h="48px"
                  />
                  <Input
                    type="text"
                    label="password"
                    name="password"
                    w="100%"
                    h="48px"
                  />
                </Space>
                <Space>
                  {error && <Typography align="center">{error}</Typography>}
                  <Button color="orange">Login</Button>
                </Space>
              </Space>
            </form>
            <Typography align="center">
              Don’t have an account yet?
              <Link to={routerPaths.signup}>Register</Link>
            </Typography>
          </Space>
        </Paper>
      </Center>
    </Background>
  )
}

export default LoginPage
