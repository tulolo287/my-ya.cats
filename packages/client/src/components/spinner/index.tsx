import { FC } from 'react'
import styles from './styles.module.css'

export const Spinner: FC = () => {
  return (
    <div className={styles.container}>
      <svg className={styles.spinner} viewBox="0 0 50 50">
        <circle
          className={styles.path}
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="5"></circle>
      </svg>
    </div>
  )
}
