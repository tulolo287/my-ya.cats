import { Background } from '@components/background'
import { Button } from '@components/button'
import { CatImage } from '@components/catImage'
import { Center } from '@components/center'
import { Paper } from '@components/paper'
import { Space } from '@components/space'
import { Typography } from '@components/typography'
import { GAME_BACKGROUNDS } from '../constants'
import { FC } from 'react'

type GameStartProps = {
  handleStart: () => void
}

export const GameStart: FC<GameStartProps> = ({ handleStart }) => (
  <Background images={GAME_BACKGROUNDS}>
    <Center>
      <Paper background="blue">
        <Space align="center" children={<CatImage />} />
        <Space gap="40px" align="center">
          <Typography
            children={'Start'}
            fontSize="xxxl"
            tag="h1"
            color="grey-with-shadow"
          />
          <Space align="center">
            <Typography
              children={'press SPACE for jump'}
              fontSize="xl"
              color="grey"
            />
            <Typography
              children={'press R or ARROW UP to speed up'}
              fontSize="xl"
              color="grey"
            />
            <Typography
              children={'try to get as many points as you can'}
              fontSize="xl"
              color="grey"
            />
          </Space>
          <Button children="START" onClick={handleStart} />
        </Space>
      </Paper>
    </Center>
  </Background>
)
