import { DimensionsProp, TFontSize } from '@core/types'
import styles from './styles.module.css'
import stylesFontSize from '@style/font-size.module.css'
import classNames from 'classnames'

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
  ...props
}) => {
  const styleButton = {
    height: h,
    width: w,
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
