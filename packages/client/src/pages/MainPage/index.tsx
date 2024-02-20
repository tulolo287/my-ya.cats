import { Button } from '@components/button'
import { Background } from '@components/background'
import { CatImage } from '@components/catImage'
import { Center } from '@components/center'
import { Space } from '@components/space'
import { Typography } from '@components/typography'
import { useNavigate } from 'react-router-dom'
import { SyntheticEvent } from 'react'
import AuthController from '@controllers/auth-controller'
import { routerPaths } from '@core/constants'

const MainPage = () => {
  const navigate = useNavigate()

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault()

    try {
      await AuthController.logout()
      // TODO: перенести в стор когда появится редакс
      localStorage.removeItem('isAuth')
      navigate(routerPaths.login)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Background>
      <Center>
        <Space gap="60px">
          <Space align="center">
            <CatImage />
            <Space>
              <Typography align="center" tag="h1" fontSize="xxl">
                Cat Runner
              </Typography>
              <Typography align="center" tag="h2" fontSize="l">
                Endless runner game
              </Typography>
            </Space>
          </Space>
          <Space gap="25px">
            <Button w="300px" onClick={() => navigate(routerPaths.profile)}>
              PROFILE
            </Button>
            <Button w="300px" onClick={() => navigate(routerPaths.game)}>
              PLAY
            </Button>
            <Button w="300px" onClick={() => navigate(routerPaths.leaderBoard)}>
              LEADERBOARD
            </Button>
            <Button w="300px" onClick={() => navigate(routerPaths.forum)}>
              FORUM
            </Button>
            <Button w="300px" onClick={submitHandler}>
              LOG OUT
            </Button>
          </Space>
        </Space>
      </Center>
    </Background>
  )
}

export default MainPage
