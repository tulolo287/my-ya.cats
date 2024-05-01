import { MutableRefObject } from 'react'
import { InputController } from '../controllers/input-controller'
import { GameScreen, TGameScreen } from '../screens/game-screen'
import gameSettings from '../settings/game-settings'
import type { TGameSettings } from '../types/index'

export interface IGame {
  canvas: HTMLCanvasElement | null
  context: CanvasRenderingContext2D | null | undefined
  gameSettings: TGameSettings
  gameScreen: TGameScreen
  prevTime: number | undefined
  loopId: number
  destroy: () => void
  handleEnd: () => void
  handleScore: (points: number) => void
}

type GameProps = {
  canvasRef: MutableRefObject<HTMLCanvasElement | null>
  handleEnd: () => void
  handleScore: (points: number) => void
}
export class Game implements IGame {
  canvas: HTMLCanvasElement | null
  context: CanvasRenderingContext2D | null | undefined
  gameSettings: TGameSettings
  gameScreen: TGameScreen
  prevTime: number | undefined
  loopId: number
  handleEnd: () => void
  handleScore: (points: number) => void

  constructor({ canvasRef, handleEnd, handleScore }: GameProps) {
    this.canvas = canvasRef.current
    this.handleEnd = handleEnd
    this.handleScore = handleScore
    this.context = this.canvas?.getContext('2d')
    if (this.canvas) {
      this.canvas.width = gameSettings.width
      this.canvas.height = gameSettings.height
    } else throw new Error('Canvas not loaded')

    this.gameSettings = gameSettings

    this.prevTime = undefined
    this.loopId = 0

    InputController.init()
    this.gameScreen = new GameScreen(this)
  }

  destroy() {
    window.cancelAnimationFrame(this.loopId)
    InputController.removeEvents()
    InputController._instance = undefined
  }

  getScore() {
    return this.gameScreen.player.score
  }

  private update(dt: number) {
    this.gameScreen?.update(dt)
  }

  private draw(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, this.gameScreen!.width, this.gameScreen!.height)
    this.gameScreen?.draw(ctx)
  }

  private loop = (timestamp: number) => {
    if (this.gameScreen.gameOver) {
      this.handleScore(this.getScore())
      this.handleEnd()
    } else {
      if (!this.prevTime) {
        this.prevTime = timestamp
      }
      const delta = Math.floor(timestamp - this.prevTime) / 1000
      this.prevTime = timestamp

      this.update(delta)
      this.draw(this.context!)

      this.loopId = window.requestAnimationFrame(this.loop)
    }
  }

  start() {
    this.loop(0)
  }
}
