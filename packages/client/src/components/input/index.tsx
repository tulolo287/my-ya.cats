import React from 'react'
import styles from './styles.module.css'

type InputProps = {
  type?: 'text' | 'password' | 'email' | 'tel' | 'numder'
  label?: string
  errorMessage?: string
  w?: string
  h?: string
}

export const Input = React.forwardRef<
  HTMLInputElement,
  Omit<React.ComponentPropsWithoutRef<'input'>, 'type'> & InputProps
>((props, ref) => {
  const { label, errorMessage, h = '33px', w = '200px' } = props

  const inputProps = {}
  for (const key in props) {
    if (!['errorMessage', 'label', 'h', 'w'].includes(key)) {
      Object.assign(inputProps, {
        [key]: (props as Record<string, string>)[key],
      })
    }
  }

  const styleWidth = {
    width: w,
  }

  const styleHeight = {
    height: h,
  }

  return (
    <label
      className={`${styles.label} ${props.className || ''}`}
      style={styleWidth}>
      {label}
      <input
        {...inputProps}
        className={styles.input}
        ref={ref}
        style={styleHeight}></input>
      <span className={styles.error}>{errorMessage}</span>
    </label>
  )
})
