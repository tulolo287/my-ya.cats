import stylesFontSize from '@style/font-size.module.css'
import { TFontSize } from '@core/types'

type TypographyProps = {
  fontSize: TFontSize
  children: React.ReactNode
  align?: 'center' | 'left' | 'right'
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p'
}

export const Typography = (props: TypographyProps) => {
  const CustomTag = props.tag || 'p'
  const fontStyles = {
    textAlign: props.align || 'left',
  }
  return (
    <CustomTag
      style={fontStyles}
      className={stylesFontSize[props.fontSize || 'm']}>
      {props.children}
    </CustomTag>
  )
}
