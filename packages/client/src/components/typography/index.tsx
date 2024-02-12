type TypographyProps = {
  size: 'xl' | 'l' | 'm' | 's'
  children: React.ReactNode
  align?: 'center' | 'left' | 'right'
}

enum FontSize {
  'xl' = '95px',
  'l' = '40px',
  'm' = '28px',
  's' = '14px',
}

export const Typography = (props: TypographyProps) => {
  const fontStyles = {
    fontSize: FontSize[props.size],
    textAlign: props.align || 'right',
  }
  return <p style={fontStyles}>{props.children}</p>
}
