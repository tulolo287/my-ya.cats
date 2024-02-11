import { useEffect, useState } from 'react'

import { leaderboardController } from '@/controllers/leaderboard-controller'
import { formatScoreNumber } from '@/utils/format-score-number'

import styles from './index.module.css'

type Record = {
  name: string
  record: string
}

const LeaderBoardTable = () => {
  const [records, setRecords] = useState<Record[]>([])

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
        <li className={styles.record} key={item.name}>
          <span className={styles.name}>{item.name}</span>
          <span>{formatScoreNumber(item.record)}</span>
        </li>
      ))}
    </ol>
  )
}

export default LeaderBoardTable
