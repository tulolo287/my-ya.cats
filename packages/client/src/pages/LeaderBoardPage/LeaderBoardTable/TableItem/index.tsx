import { Typography } from '@components/typography'
import { LeaderboardRecord } from '@core/types'
import { formatScoreNumber } from '@utils/format-score-number'

import styles from './styles.module.css'

export const TableItem = ({ login, score }: LeaderboardRecord) => {
  return (
    <li className={styles.record}>
      {/* className={styles.login} */}
      <Typography fontSize="xl">{login}</Typography>
      {/* className={styles.score} */}
      <Typography fontSize="xl">{formatScoreNumber(score)}</Typography>
    </li>
  )
}
