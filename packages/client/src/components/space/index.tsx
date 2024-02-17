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
   * выравнивание дочерних элементов
   * @default 'normal'
   */
  align?:
    | 'normal'
    | 'center'
    | 'start'
    | 'end'
    | 'baseline'
    | 'stretch'
    | 'flex-start'
    | 'flex-end'
    | 'initial'
    | 'inherit'
}

export const Space = (
  props: React.ComponentPropsWithoutRef<'div'> & SpaceProps
) => {
  const { direction = 'column', gap, align } = props
  const spaceStyle = {
    flexDirection: direction,
    gap: gap,
    alignItems: align,
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
