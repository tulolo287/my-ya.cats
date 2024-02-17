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
  /**
   * выравнвание внутри флекса
   * @default 'start'
   */
  flexAlign?: 'start' | 'center' | 'end'
}

export const Space = (
  props: React.ComponentPropsWithoutRef<'div'> & SpaceProps
) => {
  const { direction = 'column', gap, flexAlign, ...rest } = props
  const alignItems = flexAlign === 'center' ? 'center' : `flex-${flexAlign}`

  const spaceStyle = {
    flexDirection: direction,
    gap,
    alignItems,
  } as Record<string, string>

  return (
    <div
      {...rest}
      className={`${styles.space} ${props.className || ''}`}
      style={spaceStyle}>
      {props.children}
    </div>
  )
}
