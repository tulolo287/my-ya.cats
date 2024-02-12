import styles from './styles.module.css'

type ButtonProps = {
  color?: 'orange' | 'white'
}

export const Button = (
  props: React.ComponentPropsWithoutRef<'button'> & ButtonProps
) => {
  const { children, className, color = 'white' } = props
  return (
    <button
      {...props}
      className={`${styles.button} ${className || ''} ${styles[color]}`}>
      {children}
    </button>
  )
}
