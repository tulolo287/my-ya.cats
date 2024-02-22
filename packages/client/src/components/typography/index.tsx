import stylesFontSize from '@style/font-size.module.css'
import { TFontSize } from '@core/types'

import styles from './styles.module.css'

type TypographyProps = {
  children: React.ReactNode
  /**
   * размер текста
   * @default 'm'
   */
  fontSize?: TFontSize
  /**
   * выранивание текста по центру, справа или слева
   * @default 'left'
   */
  align?: 'center' | 'left' | 'right'
  /**
   * тэг
   * @default 'p'
   */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p'
  /**
   * цвет заголовка
   * @default 'grey'
   */
  color?: 'white' | 'black' | 'grey' | 'grey-with-shadow' | 'orange'
  className?: string
}

export const Typography = (props: TypographyProps) => {
  const CustomTag = props.tag || 'p'
  const fontStyles = {
    textAlign: props.align || 'left',
  }
  const color = props.color || 'grey'

  return (
    <CustomTag
      style={fontStyles}
      className={`${stylesFontSize[props.fontSize || 'm']} ${styles[color]} ${
        props.className || ''
      }`}>
      {props.children}
    </CustomTag>
  )
}
