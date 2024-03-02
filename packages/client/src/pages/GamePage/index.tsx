import { Canvas } from '@mechanics/canvas'
import React, { FC } from 'react'
import { useState } from 'react'
import { FullpageButton } from './FullpageButton'
import { GameStart } from './GameStart'
import GameOverPage from './GameOver'
import GameOver from './GameOver'

type GameStatus = 'start' | 'game' | 'end'

const GamePage: FC = () => {
  const [status, setStatus] = useState<GameStatus>('start')
  const [score, setScore] = useState<number>(0)

  const handleGameStatus = (status: GameStatus) => setStatus(status)
  const handleScore = (points: number) => setScore(points)

  return (
    <React.Fragment>
      {status === 'game' && (
        <React.Fragment>
          <Canvas
            handleScore={handleScore}
            handleEnd={() => handleGameStatus('end')}
          />
          <FullpageButton />
        </React.Fragment>
      )}
      {status === 'start' && (
        <GameStart handleStart={() => handleGameStatus('game')} />
      )}
      {status === 'end' && (
        <GameOver score={score} handleReplay={() => handleGameStatus('game')} />
      )}
    </React.Fragment>
  )
}

export default GamePage
