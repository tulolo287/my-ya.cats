import { InputController } from './controllers/InputController.js'
import { Butterfly } from './entities/Butterfly.js'
import { Platform } from './entities/Platform.js'
import { Player } from './entities/Player.js'
import { GameScreen } from './screens/GameScreen.js'
import gameSettings from './settings/gameSettings.js'

export class Game {
  constructor(canvasRef) {
    this.canvas = canvasRef.current
    this.context = canvas?.getContext('2d')
    this.canvas.width = gameSettings.width
    this.canvas.height = gameSettings.height

    this.loopId = 0
    this.prevTime = performance.now()
    this.accTime = 0
    this.msPerFrame = 16
    this.maxMsFrame = 30
    this.gameOver = false
    InputController.init()
    this.gameSettings = gameSettings
    this.gameScreen = new GameScreen(this)
    this.player = new Player(this)

    this.prevTime = 0
    this.accTime = 0
    this.dt = 0
    this.lastRun = 0

    this.platforms = new Array();
    this.butterflies = new Array();

    let platform1 = new Platform(this.player.x, gameSettings.height - 50, 500, 50)
    this.platforms.push(platform1);

    this.createPlatforms(5)

    setInterval(() => {
      if (this.gameSettings.gameSpeed < 3.9) {
        //this.gameSettings.gameSpeed += .01;
      }
      //this.levelUp();
    }, 1000)

  }

  createPlatforms(qty) {
    let x = this.platforms[this.platforms.length - 1].x;
    let y = this.platforms[this.platforms.length - 1].y;
    let dir = 0;

    for (let i = 0; i < qty; i++) {

      let x;
      let y;
      let lastPlatform = this.platforms[this.platforms.length - 1];

      let diff = Math.floor(Math.random() * 170 + 10);

      let up = lastPlatform.y >= this.gameSettings.height - 50 - diff ? true : false;
      let down = lastPlatform.y <= 400 ? true : false;

      if (up) {
        dir = -1
      } else if (down) {
        dir = 1
      } else {
        dir = (Math.random() * 1) ? 1 : -1
      }

      y = lastPlatform.y + (diff * dir);
      x = lastPlatform.x + lastPlatform.width + Math.floor(Math.random() * 280);

      this.platforms.push(new Platform(x, y, 500, 50))

      if (this.platforms[i].x > this.gameSettings.width) {
        this.createButterfly(this.platforms[i]);
      }
    }
  }

  createButterfly(platform) {
    let x = platform.x //Math.floor(Math.random() * (platform.x + platform.width - platform.x) + platform.x);
    let y = Math.floor(Math.random() * (platform.y - 100 - 400) + 400);
    this.butterflies.push(new Butterfly(x, y, 50, 50))
  }

  createButterflies(qty, platform) {
    for (let i = 0; i < qty; i++) {
      let x = Math.floor(Math.random() * (platform.x + platform.width - platform.x) + platform.width);
      let y = Math.floor(Math.random() * (platform.y - 50 - 300) + 300);
      this.butterflies.push(new Butterfly(x, y, 50, 50))
    }
  }

  update(dt) {
    this.gameScreen.update(dt)
    this.platforms.forEach((platform, idx) => {
      if (platform.delete) {
        this.platforms.splice(idx, 1)
      }
      platform.update()
    })
    this.player.update(dt)
    if (this.platforms.length < 5) {
      this.createPlatforms(5)
    }
    this.butterflies.forEach((butterfly, idx) => {
      if (butterfly.delete) {
        this.butterflies.splice(idx, 1)
      }
      butterfly.update()
    })

    if (this.gameSettings.lives < 1) {
      //this.gameScreen.gameOver(this.context)
      this.stop()
    }
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.gameScreen.width, this.gameScreen.height)
    this.gameScreen.draw(ctx)
    this.platforms.forEach(platform => {
      platform.draw(ctx)
    })
    this.butterflies.forEach(butterfly => {
      butterfly.draw(ctx)
    })
    this.player.draw(ctx)
  }

  loop = () => {
    const nowTime = performance.now()
    const delta = nowTime - this.prevTime
    this.prevTime = nowTime

    this.accTime = delta

    /*     if (this.accTime > this.maxMsFrame) {
          while (this.accTime > this.msPerFrame) {
            this.accTime -= this.msPerFrame
            this.update()
          }
        }  */
    console.log('FPS', 1000 / delta)

    if (!this.gameOver) {
      this.update()
      this.draw(this.context)
      this.loopId = window.requestAnimationFrame(this.loop)
    }
  }

  start() {
    this.gameOver = false
    this.prevTime = performance.now()
    this.accTime = 0
    this.msPerFrame = 16
    this.maxMsFrame = 30
    this.loop()
  }

  stop() {
    this.gameOver = true
    window.cancelAnimationFrame(this.loopId)
  }


}

