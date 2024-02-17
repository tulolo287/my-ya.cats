import { DimensionsProp } from '@core/types'

import styles from './styles.module.css'

type Props = {
  /**
   * ширина картинки
   * @default '148px'
   */
  w?: DimensionsProp
  /**
   * высота картинки
   * @default '148px'
   */
  h?: DimensionsProp
  /**
   * название картинки
   * @default 'cat-image'
   */
  imageName?: string
}

export const CatImage = (
  props: React.ComponentPropsWithoutRef<'img'> & Props
) => {
  const { className, h = '148px', w = '148px', imageName = 'cat-image' } = props
  const style = { width: w, height: h }

  return (
    <img
      src={`/${imageName}.png`}
      className={`${styles.image} ${className || ''}`}
      style={style}
    />
  )
}
