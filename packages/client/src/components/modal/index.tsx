import { ReactNode, SyntheticEvent } from 'react'

import styles from './styles.module.css'

type Props = {
  onClose: () => void
  children: ReactNode
}

export const Modal = ({ onClose, children }: Props) => {
  const closeByOverlayOnly = (e: SyntheticEvent) => {
    if ((e.target as HTMLElement).closest(`.${styles.modal}`)) {
      return
    }

    onClose()
  }

  return (
    <div className={styles.overlay} onClick={closeByOverlayOnly}>
      <section className={styles.modal}>{children}</section>
    </div>
  )
}
