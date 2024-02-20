import { MutableRefObject } from 'react'
import { InputController } from './controllers/input-controller'
import { GameScreen, IGameScreen } from './screens/game-screen'
import gameSettings from './settings/game-settings'
import type { TGameSettings } from './types/index'

export interface IGame {
  canvas: HTMLCanvasElement | null
  context: CanvasRenderingContext2D | null | undefined
  gameOver: boolean
  gameSettings: TGameSettings
  gameScreen: IGameScreen | undefined
  prevTime: number
  accTime: number
  msPerFrame: number
  maxMsFrame: number
  loopId: number
  init: () => void
}
export class Game implements IGame {
  canvas: HTMLCanvasElement | null
  context: CanvasRenderingContext2D | null | undefined
  gameOver: boolean
  gameSettings: TGameSettings
  gameScreen: IGameScreen | undefined
  prevTime: number
  accTime: number
  msPerFrame: number
  maxMsFrame: number
  loopId: number

  constructor(canvasRef: MutableRefObject<HTMLCanvasElement | null>) {
    this.canvas = canvasRef.current
    this.context = this.canvas?.getContext('2d')
    if (this.canvas) {
      this.canvas.width = gameSettings.width
      this.canvas.height = gameSettings.height
    } else throw new Error('Canvas not loaded')
    this.gameOver = false
    this.gameSettings = gameSettings
    this.gameScreen = undefined
    this.prevTime = 0
    this.accTime = 0
    this.msPerFrame = 16
    this.maxMsFrame = 32
    this.loopId = 0

    InputController.init()
    this.init()
  }

  init = () => {
    this.gameOver = false
    this.gameScreen = new GameScreen(this)
  }

  update(dt: number) {
    this.gameScreen?.update(dt)
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, this.gameScreen!.width, this.gameScreen!.height)
    this.gameScreen?.draw(ctx)
  }

  loop = () => {
    const nowTime = performance.now()
    const delta = nowTime - this.prevTime
    this.prevTime = nowTime
    this.accTime = delta

    while (this.accTime > this.maxMsFrame) {
      this.accTime -= this.msPerFrame
      this.update(delta)
    }
    if (!this.gameOver) {
      this.draw(this.context!)
    }
    this.update(delta)
    this.loopId = window.requestAnimationFrame(this.loop)
  }

  start = () => {
    this.prevTime = performance.now()
    this.loop()
  }
}
