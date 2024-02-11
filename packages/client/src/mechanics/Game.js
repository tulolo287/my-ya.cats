import { InputController } from './controllers/InputController.js'
import { Player } from './entities/Player.js'
import { GameScreen } from './screens/GameScreen.js'
import gameSettings from './settings/gameSettings.js'

export class Game {
  constructor() {
    InputController.init()
    this.gameSettings = gameSettings
    this.gameScreen = new GameScreen(this.gameSettings)
    this.player = new Player(this.gameSettings)
    this.prevTime = 0
    this.accTime = 0
    this.dt = 0
    this.lastRun = 0

    setInterval(() => {
      //this.gameSettings.gameSpeed += 5;
      //this.levelUp();
    }, 2000)
  }

  update(delta) {
    this.player.update(delta)
    this.gameScreen.update(delta)
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.gameScreen.width, this.gameScreen.height)
    this.gameScreen.draw(ctx)
    this.player.draw(ctx)
  }

  start() {
    this.lastRun = performance.now()
    window.requestAnimationFrame(this.loop)
  }

  loop = newTime => {
    let fps = 1000 / 60
    const now = performance.now()
    let delta1 = (newTime - this.prevTime) / 1000
    this.dt = newTime - this.prevTime
    this.prevTime = newTime

    this.accTime += this.dt

    let delta = (performance.now() - this.lastRun) / 1000
    this.lastRun = performance.now()
    fps = 1 / delta

    //console.log(delta)

    this.update(delta)
    this.draw()
    requestAnimationFrame(this.loop)
  }
}

