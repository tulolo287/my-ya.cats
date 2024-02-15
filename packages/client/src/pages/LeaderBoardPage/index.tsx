import { useNavigate } from 'react-router-dom'

import { Background } from '@components/background'
import { Button } from '@components/button'
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
            <img src="/public/cat-image.png" className={styles.image} />
            <Typography tag="h1" align="center" fontSize="xxl">
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
