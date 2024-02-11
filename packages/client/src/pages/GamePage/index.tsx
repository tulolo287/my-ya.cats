import React, { useEffect, useRef } from 'react'
import { Game } from '../../mechanics/Game'
import gameSettings from '../../mechanics/settings/gameSettings'
import styles from './game-page.module.css'

const GamePage = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas) return
    canvas.width = gameSettings.width
    canvas.height = gameSettings.height
    let loopId = 0
    let lastTime = performance.now()

    const game = new Game()

    const loop = () => {
      //const fps = 1 / 60
      const nowTime = performance.now()
      const delta = (nowTime - lastTime) / 1000
      lastTime = nowTime

      //console.log(fps)
      //console.log('FPS', 1 / delta)

      game.update(delta)
      game.draw(context)
      loopId = window.requestAnimationFrame(loop)
    }
    loop()

    return () => {
      window.cancelAnimationFrame(loopId)
    }
  }, [])

  return (
    <main>
      <h1>Game</h1>
      <canvas id="canvas" className={styles.canvas} ref={canvasRef}></canvas>
    </main>
  )
}

export default GamePage
