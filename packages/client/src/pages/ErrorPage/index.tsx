import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { Center } from '@components/center'
import { Background } from '@components/background'
import { Button } from '@components/button'
import { CatImage } from '@components/catImage'
import { Space } from '@components/space'
import { Typography } from '@components/typography'
import { ErrorPageType } from './types'
import { errorContent } from './constants'
import { routerPaths } from '@core/constants'

type ErrorPageProps = {
  type: ErrorPageType
  errorMessage?: string
}

const ErrorPage: FC<ErrorPageProps> = ({ type, errorMessage }) => {
  const { title, description } = errorContent[type]
  const navigate = useNavigate()

  return (
    <Background>
      <Center>
        <Space align="center" gap="40px">
          <Space align="center">
            <CatImage imageName="cat-image-error" />
            <Typography
              tag="h1"
              align="center"
              fontSize={type === 'errorBoundary' ? 'xxxl' : '4xl'}>
              {title}
            </Typography>
          </Space>
          <Typography
            tag="p"
            align="center"
            fontSize={type === 'errorBoundary' ? 'xl' : 'xxl'}>
            {errorMessage || description}
          </Typography>
          <Button onClick={() => navigate(routerPaths.main)}>MAIN</Button>
        </Space>
      </Center>
    </Background>
  )
}

export default ErrorPage
