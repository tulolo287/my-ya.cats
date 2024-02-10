import styles from './styles.module.css'

interface IButtonProps {
  color?: 'orange' | 'white'
}

export const Button = (
  props: React.ComponentPropsWithoutRef<'button'> & IButtonProps
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
