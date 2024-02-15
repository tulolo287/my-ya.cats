import { useEffect, useState } from 'react'

import { TableItem } from './TableItem'
import { LeaderboardRecord } from '@core/types'
import { leaderboardController } from '@controllers/leaderboard-controller'

import styles from './styles.module.css'

const LeaderBoardTable = () => {
  const [records, setRecords] = useState<LeaderboardRecord[]>([])

  const getRecords = async () => {
    const data = leaderboardController.getRecords()
    setRecords(data)
  }

  useEffect(() => {
    getRecords()
  }, [])

  return (
    <ol className={styles.recordList}>
      {records.map(item => (
        <TableItem key={item.login} {...item} />
      ))}
    </ol>
  )
}

export default LeaderBoardTable