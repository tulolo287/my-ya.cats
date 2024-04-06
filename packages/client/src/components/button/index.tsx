import { DimensionsProp, TFontSize } from '@core/types'
import styles from './styles.module.css'
import stylesFontSize from '@style/font-size.module.css'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

type ButtonProps = {
  /**
   * цвет кнопки
   * @default 'white'
   */
  color?: 'orange' | 'white'
  /**
   * размер текста внутри кнопки
   * @default 'l'
   */
  fontSize?: TFontSize
  /**
   * стиль кпопки
   * @default 'button'
   */
  displayStyle?: 'button' | 'link'
  /**
   * ширина кнопки
   * @default '200px'
   */
  w?: DimensionsProp
  /**
   * высота кнопки
   * @default '41px'
   */
  h?: DimensionsProp
  /**
   * react router to
   * навигация по роутеру
   */
  to?: string
}

export const Button: React.FC<
  React.ComponentPropsWithoutRef<'button'> & ButtonProps
> = ({
  children,
  className,
  displayStyle = 'button',
  color = 'white',
  fontSize = 'l',
  h = '41px',
  w = '200px',
  to,
  ...props
}) => {
  const styleButton = {
    height: h,
    width: w,
  }

  if (to) {
    return (
      <Link to={to} className={styles.link}>
        {children}
      </Link>
    )
  }

  const defaultClassNames = () => {
    if (displayStyle === 'link') {
      return classNames(styles.link, stylesFontSize[fontSize])
    }
    return classNames(
      styles.button,
      className,
      styles[color],
      stylesFontSize[fontSize]
    )
  }

  return (
    <button {...props} className={defaultClassNames()} style={styleButton}>
      {children}
    </button>
  )
}
