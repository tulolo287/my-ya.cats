import { DimensionsProp } from '@/core/types'
import styles from './styles.module.css'

type SpaceProps = {
  /**
   * как расположен контент - горизонтально или вертикально
   * @default 'column'
   */
  direction?: 'column' | 'row'
  /**
   * величина отступа между элементами внутри
   * @default 0
   */
  gap?: DimensionsProp
}

export const Space = (
  props: React.ComponentPropsWithoutRef<'div'> & SpaceProps
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
