import { FC, PropsWithChildren, ReactNode, SyntheticEvent } from 'react'
import { createPortal } from 'react-dom'

import styles from './styles.module.css'

type Props = {
  onClose: () => void
  children: ReactNode
}

export const Modal: FC<PropsWithChildren<Props>> = ({ onClose, children }) => {
  const closeByOverlayOnly = (e: SyntheticEvent) => {
    if ((e.target as HTMLElement).closest(`.${styles.modal}`)) {
      return
    }

    onClose()
  }

  return createPortal(
    <div className={styles.overlay} onClick={closeByOverlayOnly}>
      <section className={styles.modal}>{children}</section>
    </div>,
    document.body
  )
}
