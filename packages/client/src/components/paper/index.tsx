import { useEffect } from 'react'
import styles from './styles.module.css'

type PaperProps = {
  children: React.ReactNode
  /**
   * фон контейнера
   * @default 'transparent'
   */
  background?: 'blue' | 'transparent'
  className?: string
}

enum backroundColors {
  blue = '#B5C0F6',
  transparent = 'rgba(255, 255, 255, 0.3)',
}

export const Paper = (props: PaperProps) => {
  useEffect(() => {
    if (props.background) {
      const root = document.documentElement
      root.style.setProperty(
        '--paper-background-color',
        backroundColors[props.background]
      )
    }
  }, [])

  return (
    <div className={`${styles.paper} ${props.className || ''}`}>
      {props.children}
    </div>
  )
}
