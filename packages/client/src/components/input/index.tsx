import React from 'react'
import styles from './styles.module.css'
import stylesFontSize from '@style/font-size.module.css'
import { DimensionsProp, TFontSize } from '@core/types'

type InputProps = {
  type?: 'text' | 'password' | 'email' | 'tel' | 'number'
  label?: string
  errorMessage?: string
  w?: DimensionsProp
  h?: DimensionsProp
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
