import { DimensionsProp, TFontSize } from '@/core/types'
import styles from './styles.module.css'
import stylesFontSize from '@style/font-size.module.css'

type ButtonProps = {
  color?: 'orange' | 'white'
  fontSize?: TFontSize
  w?: DimensionsProp
  h?: DimensionsProp
}

export const Button = (
  props: React.ComponentPropsWithoutRef<'button'> & ButtonProps
) => {
  const {
    children,
    className,
    color = 'white',
    fontSize = 'l',
    h = '41px',
    w = '200px',
  } = props

  Object.fromEntries(
    Object.entries(props).filter(
      el => !['color', 'fontSize', 'h', 'w'].includes(el[0])
    )
  )

  const styleButton = {
    height: h,
    width: w,
  }

  return (
    <button
      {...props}
      className={`${styles.button} ${className || ''} ${styles[color]} ${
        stylesFontSize[fontSize]
      }`}
      style={styleButton}>
      {children}
    </button>
  )
}
