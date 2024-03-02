import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { Background } from '@components/background'
import { Button } from '@components/button'
import { CatImage } from '@components/catImage'
import { Center } from '@components/center'
import { Paper } from '@components/paper'
import { Space } from '@components/space'
import { Typography } from '@components/typography'
import { routerPaths } from '@core/constants'
import { GAME_BACKGROUNDS } from '../constants'

import styles from './styles.module.css'
import { formatScoreNumber } from '@utils/format-score-number'

type GameOverProps = {
  score: number
  handleReplay: () => void
}

const GameOver: FC<GameOverProps> = ({ score, handleReplay }) => {
  const navigate = useNavigate()

  return (
    <Background images={GAME_BACKGROUNDS}>
      <Center>
        <Paper background="blue" className={styles.gameOver}>
          <Space gap="80px" align="center">
            <Space gap="40px" align="center">
              <CatImage imageName="cat-image-dead" />
              <Typography
                children={'GAME OVER'}
                fontSize="xxxl"
                tag="h1"
                color="grey-with-shadow"
              />
              <Typography
                children={`YOUR SCORE: ${formatScoreNumber(score)}`}
                fontSize="xxl"
                tag="h2"
                color="orange"
              />
            </Space>
            <Space gap="32px" align="center">
              <Button children="REPLAY" onClick={handleReplay} />
              <Button
                children="MAIN"
                onClick={() => navigate(routerPaths.main)}
              />
            </Space>
          </Space>
        </Paper>
      </Center>
    </Background>
  )
}

export default GameOver
