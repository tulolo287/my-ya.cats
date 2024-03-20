import { Typography } from '@components/typography'
import { LeaderboardRecord } from '@core/types'
import { formatScoreNumber } from '@utils/format-score-number'

import styles from './styles.module.css'

export const TableItem = ({ data }: LeaderboardRecord) => {
  return (
    <li className={styles.record}>
      <Typography
        fontSize="xl"
        className={styles.login}
        color="grey-with-shadow">
        {data.login}
      </Typography>
      <Typography fontSize="xl" className={styles.score}>
        {formatScoreNumber(data.yacatsScore)}
      </Typography>
    </li>
  )
}
