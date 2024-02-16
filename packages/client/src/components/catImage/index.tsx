export const CatImage = (props: React.ComponentPropsWithoutRef<'img'>) => {
  const { className } = props
  return <img src="/public/cat-image.png" className={`${className || ''}`} />
}
