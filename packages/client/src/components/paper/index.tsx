import styles from './styles.module.css'

type PaperProps = {
  children: React.ReactNode
  background?: 'blue' | 'transparent'
}

enum backroundColors {
  blue = '#B5C0F6',
  transparent = 'rgba(255, 255, 255, 0.3)',
}

export const Paper = (props: PaperProps) => {
  if (props.background) {
    const root = document.documentElement
    root.style.setProperty(
      '--paper-background-color',
      backroundColors[props.background]
    )
  }

  return <div className={styles.paper}>{props.children}</div>
}
