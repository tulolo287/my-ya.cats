import { Background } from '@components/background'
import { Button } from '@components/button'
import { CatImage } from '@components/catImage'
import { Center } from '@components/center'
import { Paper } from '@components/paper'
import { Space } from '@components/space'
import { Typography } from '@components/typography'
import React from 'react'
import { useState } from 'react'

const GamePage = () => {
  const [start, setStart] = useState<boolean>(false) // флаг начала игры

  const handleStart = () => setStart(true)

  return (
    <React.Fragment>
      {start ? (
        <>{/* игра */}</>
      ) : (
        <Background
          images={[
            'background_layer_3.png',
            'background_layer_2.png',
            'background_layer_1.png',
          ]}>
          <Center>
            <Paper background="blue">
              <Space align="center" children={<CatImage />} />
              <Space gap="40px" align="center">
                <Typography
                  children={'Start'}
                  fontSize="xxxl"
                  tag="h1"
                  color="grey-with-shadow"
                />
                <Space align="center">
                  <Typography
                    children={'press SPACE for jump'}
                    fontSize="xl"
                    color="grey"
                  />
                  <Typography
                    children={'try to get as many points as you can'}
                    fontSize="xl"
                    color="grey"
                  />
                </Space>
                <Button children="START" onClick={handleStart} />
              </Space>
            </Paper>
          </Center>
        </Background>
      )}
    </React.Fragment>
  )
}

export default GamePage
