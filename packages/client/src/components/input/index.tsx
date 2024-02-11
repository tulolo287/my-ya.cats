import React from 'react'
import styles from './styles.module.css'

interface IInputProps {
  type?: 'text' | 'password' | 'email' | 'tel' | 'numder'
  label?: string
  errorMessage?: string
}

export const Input = React.forwardRef<
  HTMLInputElement,
  Omit<React.ComponentPropsWithoutRef<'input'>, 'type'> & IInputProps
>((props, ref) => {
  const { label, errorMessage } = props

  const inputProps = {}
  for (const key in props) {
    if (key !== 'errorMessage' && key !== 'label') {
      Object.assign(inputProps, {
        [key]: (props as Record<string, string>)[key],
      })
    }
  }

  return (
    <label className={`${styles.label} ${props.className || ''}`}>
      {label}
      <input {...inputProps} className={styles.input} ref={ref}></input>
      <span className={styles.error}>{errorMessage}</span>
    </label>
  )
})
