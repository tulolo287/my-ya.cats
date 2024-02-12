type TypographyProps = {
  size: 'xl' | 'l' | 'm' | 's'
  children: React.ReactNode
  align?: 'center' | 'left' | 'right'
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p'
}

enum FontSize {
  'xl' = '95px',
  'l' = '40px',
  'm' = '28px',
  's' = '14px',
}

export const Typography = (props: TypographyProps) => {
  const CustomTag = props.tag || 'p'
  const fontStyles = {
    fontSize: FontSize[props.size],
    textAlign: props.align || 'right',
  }
  return <CustomTag style={fontStyles}>{props.children}</CustomTag>
}
