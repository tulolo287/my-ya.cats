import { InputController } from './controllers/InputController.js'
import { Platform } from './entities/Platform.js'
import { Player } from './entities/Player.js'
import { GameScreen } from './screens/GameScreen.js'
import gameSettings from './settings/gameSettings.js'

export class Game {
  constructor() {
    InputController.init()
    this.gameSettings = gameSettings
    this.gameScreen = new GameScreen(this.gameSettings)
    this.player = new Player(this)
    this.platform = new Platform(600, 550, 1400, 50)
    this.prevTime = 0
    this.accTime = 0
    this.dt = 0
    this.lastRun = 0

    this.platforms = new Array();

    let platform1 = new Platform(this.player.x, gameSettings.height - 50, 600, 50)
    this.platforms.push(platform1);

    let platform2 = new Platform(platform1.x + 800, gameSettings.height - 50, 400, 50)
    this.platforms.push(platform2);

    let platform3 = new Platform(platform2.x + 600, gameSettings.height - 50, 400, 50)
    this.platforms.push(platform3);

    this.createPlatforms(5)

    setInterval(() => {
      if (this.gameSettings.gameSpeed < 3.9) {
        this.gameSettings.gameSpeed += .01;
      }
      //this.levelUp();
    }, 1000)
  }

  createPlatforms(qty) {
    let x = this.player.x + this.gameSettings.width / 2;

    for (let i = 1; i < qty; i++) {
      x += this.platforms[i - 1].width + Math.floor(Math.random() * 250);
      let y = Math.floor(Math.random() * (this.gameSettings.height - 50 - 500) + 500);
      //let y = this.gameSettings.height - 50;
      //let width = Math.floor(Math.random() *
      this.platforms.push(new Platform(x, y, 500, 50))
    }

  }

  update() {
    this.gameScreen.update()
    this.platforms.forEach((platform, idx) => {
      if (platform.delete) {
        this.platforms.splice(idx, 1)
      }
      platform.update()
    })
    this.player.update()
    if (this.platforms.length < 3) {
      this.createPlatforms(5)
    }
    //console.log(this.platforms.length)

  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.gameScreen.width, this.gameScreen.height)

    this.gameScreen.draw(ctx)
    this.platforms.forEach(platform => {
      platform.draw(ctx)
    })
    this.player.draw(ctx)
  }

}

