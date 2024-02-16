import { useNavigate } from 'react-router-dom'

import { Background } from '@components/background'
import { Button } from '@components/button'
import { CatImage } from '@components/catImage'
import { Center } from '@components/center'
import { Paper } from '@components/paper'
import { Space } from '@components/space'
import { Typography } from '@components/typography'
import LeaderBoardTable from './LeaderBoardTable'

import styles from './styles.module.css'

const LeaderBoardPage = () => {
  const navigate = useNavigate()

  return (
    <Background>
      <Center>
        <Space className={styles.container} gap="40px">
          <Space>
            <CatImage className={styles.image} />
            <Typography
              tag="h1"
              align="center"
              fontSize="xxl"
              className={styles.title}>
              Leaderboard
            </Typography>
          </Space>

          <Paper className={styles.table}>
            <LeaderBoardTable />
          </Paper>

          <Button onClick={() => navigate('/')}>Back</Button>
        </Space>
      </Center>
    </Background>
  )
}

export default LeaderBoardPage
