import { useNavigate } from 'react-router-dom'
import LeaderBoardTable from './LeaderBoardTable'
import styles from './index.module.css'

// todo: поменять на компонент заголовка из ui-кита
const PageTitle = () => {
  return <h1 className={styles.title}>Leaderboard</h1>
}

// todo: поменять на компонент кнопки
const Button = () => {
  const navigate = useNavigate()
  return <button onClick={() => navigate('/')}>Back</button>
}

const LeaderBoardPage = () => {
  return (
    <section className={styles.container}>
      <PageTitle />
      <LeaderBoardTable />
      <Button />
    </section>
  )
}

export default LeaderBoardPage
