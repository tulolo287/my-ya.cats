import { Button } from '@components/button'
import { Background } from '@components/background'
import { CatImage } from '@components/catImage'
import { Center } from '@components/center'
import { Space } from '@components/space'
import { Typography } from '@components/typography'
import { useNavigate } from 'react-router-dom'
import { FC, SyntheticEvent } from 'react'
import { routerPaths } from '@core/constants'
import { useAppDispatch } from '@store/hooks'
import { logout } from '@store/user/user-thunks'

const MainPage: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const submitHandler = (e: SyntheticEvent) => {
    e.preventDefault()

    dispatch(logout())
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
