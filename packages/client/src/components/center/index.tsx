import styles from './styles.module.css'

type CenterProps = {
  children: React.ReactNode
  className?: string
}

export const Center = ({ children, className }: CenterProps) => {
  return <div className={`${styles.center} ${className || ''}`}>{children}</div>
}
