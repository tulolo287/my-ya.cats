import styles from './styles.module.css'

interface ISpaceProps {
  direction?: 'column' | 'row'
  gap?: string
}

export const Space = (
  props: React.ComponentPropsWithoutRef<'div'> & ISpaceProps
) => {
  const { direction = 'column', gap } = props
  const spaceStyle = {
    flexDirection: direction,
    gap: gap,
  } as Record<string, string>

  return (
    <div
      {...props}
      className={`${styles.space} ${props.className || ''}`}
      style={spaceStyle}>
      {props.children}
    </div>
  )
}
