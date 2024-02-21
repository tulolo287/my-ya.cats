import { useEffect, useRef } from 'react'
import { Game } from '../../mechanics/game'
import styles from './game-page.module.css'

const GamePage = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!canvasRef) throw new Error('Canvas not found')

    const game = new Game(canvasRef)
    game.init()
    game.start()

    return () => {
      window.cancelAnimationFrame(game.loopId!)
    }
  }, [])

  return (
    <main>
      <canvas id="canvas" className={styles.canvas} ref={canvasRef}></canvas>
    </main>
  )
}

export default GamePage
