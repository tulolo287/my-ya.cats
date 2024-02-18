import { InputController } from './controllers/InputController.js'
import { GameScreen } from './screens/GameScreen.js'
import gameSettings from './settings/gameSettings.js'

export class Game {
  constructor(canvasRef) {
    this.canvas = canvasRef.current
    this.context = canvas?.getContext('2d')
    this.canvas.width = gameSettings.width
    this.canvas.height = gameSettings.height
    InputController.init()
  }

  update(dt) {
    this.gameScreen.update(dt)
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.gameScreen.width, this.gameScreen.height)
    this.gameScreen.draw(ctx)
  }

  loop = () => {
    const nowTime = performance.now()
    const delta = nowTime - this.prevTime
    this.prevTime = nowTime
    this.accTime = delta

    while (this.accTime > this.maxMsFrame) {
      this.accTime -= this.msPerFrame
      this.update()
    }
    //console.log('FPS', 1000 / delta)

    if (!this.gameOver) {
      this.draw(this.context)
    }
    this.update()
    this.loopId = window.requestAnimationFrame(this.loop)
  }

  init() {
    this.gameOver = false
    this.gameSettings = gameSettings
    this.gameScreen = new GameScreen(this)
  }

  start = () => {
    this.accTime = 0
    this.msPerFrame = 16
    this.maxMsFrame = 32
    this.prevTime = performance.now()
    this.loop()
  }
}

