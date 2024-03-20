import { FC, useEffect, useState } from 'react'

import { TableItem } from './TableItem'
import { LeaderboardRecord } from '@core/types'
import LeaderboardController from '@controllers/leaderboard-controller'

import styles from './styles.module.css'

const LeaderBoardTable: FC = () => {
  const [records, setRecords] = useState<LeaderboardRecord[]>([])

  const getRecords = async () => {
    const response = await LeaderboardController.getRecords(0, 6)
    if (response.data) {
      setRecords(response.data)
    }
  }

  useEffect(() => {
    getRecords()
  }, [])

  return (
    <ol className={styles.recordList}>
      {records.map(item => (
        <TableItem key={item.data.login} {...item} />
      ))}
    </ol>
  )
}

export default LeaderBoardTable
