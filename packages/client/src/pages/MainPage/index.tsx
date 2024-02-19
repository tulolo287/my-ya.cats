import { SyntheticEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { Background } from '@components/background'
import { Button } from '@components/button'
import { Center } from '@components/center'
import AuthController from '@controllers/auth-controller'
import { routerPaths } from '@core/constants'

// TODO: временно только кнопка для выхода (YAC-12)

const MainPage = () => {
  const navigate = useNavigate()

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault()

    try {
      const res = await AuthController.logout()
      if (res?.status === 200) {
        // TODO: перенести в стор когда появится редакс
        localStorage.removeItem('isAuth')
        navigate(routerPaths.login)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Background>
      <Center>
        <Button onClick={submitHandler}>Logout</Button>
      </Center>
    </Background>
  )
}

export default MainPage
