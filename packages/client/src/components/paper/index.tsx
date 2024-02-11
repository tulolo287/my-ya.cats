import styles from './styles.module.css'

interface IPaperProps {
  children: React.ReactNode
  image?: string[]
  background?: 'blue' | 'transparent'
}

enum backroundColors {
  blue = '#B5C0F6',
  transparent = 'rgba(255, 255, 255, 0.3)',
}

export const Paper = (props: IPaperProps) => {
  if (props.image) {
    const urls = props.image
      .reduce((acc, el) => acc + `url('../../../public/${el}') `, '')
      .trim()
      .replaceAll(' ', ', ')
    const root = document.documentElement
    root.style.setProperty('--image', urls)
  }
  if (props.background) {
    const root = document.documentElement
    root.style.setProperty(
      '--paper-background-color',
      backroundColors[props.background]
    )
  }

  return (
    <div className={styles.display}>
      <div className={styles.paper}>{props.children}</div>
    </div>
  )
}
