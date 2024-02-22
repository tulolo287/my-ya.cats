import styles from './styles.module.css'

type BackgroundProps = {
  children: React.ReactNode
  className?: string
  /**
   * массив картинок фона страницы
   * должна находлиться в папке public
   * если указать несколько самой верхней будет первая
   * картинки указывать в формате 'picture_name.png'
   */
  images?: string[]
}

export const Background = ({
  children,
  className,
  images = ['background_layer_1.png'],
}: BackgroundProps) => {
  const urls = images
    .reduce((acc, el) => acc + `url(/${el}) `, '')
    .trim()
    .replaceAll(' ', ', ')
  const root = document.documentElement
  root.style.setProperty('--background-images', urls)

  return (
    <div className={`${styles.background} ${className || ''}`}>{children}</div>
  )
}
