import React from 'react'
import styles from './styles.module.css'
import stylesFontSize from '@style/font-size.module.css'
import { DimensionsProp, InputTypes, TFontSize } from '@core/types'

type InputProps = {
  /**
   * тип инпута
   */
  type?: InputTypes
  /**
   * текст лейбла
   */
  label?: string
  /**
   * текст ошибки
   */
  errorMessage?: string
  /**
   * ширина импута
   * @default '200px'
   */
  w?: DimensionsProp
  /**
   * высота импута
   * @default '33px'
   */
  h?: DimensionsProp
  /**
   * размер тектса лейбла и внутри импута
   * @default 'm'
   */
  fontSize?: TFontSize
}

export const Input = React.forwardRef<
  HTMLInputElement,
  Omit<React.ComponentPropsWithoutRef<'input'>, 'type'> & InputProps
>((props, ref) => {
  const { label, errorMessage, h = '33px', w = '200px', fontSize = 'm' } = props

  const inputProps = {}
  for (const key in props) {
    if (!['errorMessage', 'label', 'h', 'w', 'fontSize'].includes(key)) {
      Object.assign(inputProps, {
        [key]: (props as Record<string, string>)[key],
      })
    }
  }

  const stylesLabel = {
    width: w,
  }

  const stylesInput = {
    height: h,
  }

  return (
    <label
      className={`${styles.label} ${props.className || ''} ${
        stylesFontSize[fontSize || 'm']
      }`}
      style={stylesLabel}>
      {label}
      <input
        {...inputProps}
        className={styles.input}
        ref={ref}
        style={stylesInput}></input>
      <span className={styles.error}>{errorMessage}</span>
    </label>
  )
})
