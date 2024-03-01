import { Game } from '@mechanics/engine/game'
import { FC, useEffect, useRef } from 'react'
import styles from './canvas.module.css'

type CanvasProps = {
  handleScore: (points: number) => void
  handleEnd: () => void
}

export const Canvas: FC<CanvasProps> = ({ handleScore, handleEnd }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!canvasRef) throw new Error('Canvas not found')
    const game = new Game({ canvasRef, handleEnd, handleScore })
    game.start()

    return () => {
      game.destroy()
    }
  }, [])
  return <canvas id="canvas" className={styles.canvas} ref={canvasRef}></canvas>
}
