import { InputController } from '../controllers/input-controller'
import { IGame } from '../engine/game'
import { Butterfly, IButterfly } from '../entities/butterfly'
import { IObstacle, Obstacle } from '../entities/obstacle'
import { IPlatform, Platform } from '../entities/platform'
import { IPlayer, Player } from '../entities/player'
import { Background, IBackground } from '../system/background'
import { IParticles, Particles } from '../system/particles'
import { TGameSettings } from '../types'
import { getRandom } from '../utils'

export type TGameScreen = {
  game: IGame
  width: number
  height: number
  gameSettings: TGameSettings
  parallaxBg: IBackground[]
  platforms: IPlatform[]
  butterflies: IButterfly[]
  mushrooms: IObstacle[]
  hearts: IObstacle[]
  butterflyParticles: IParticles[]
  player: IPlayer
  update: (dt: number) => void
  draw: (ctx: CanvasRenderingContext2D) => void
  gameOver: boolean
}

export class GameScreen {
  game: IGame
  gameSettings: TGameSettings
  walkSpeed: number
  runSpeed: number
  width: number
  height: number
  private bg1_xv: number
  private bg2_xv: number
  private bg3_xv: number
  parallaxBg: IBackground[]
  platforms: IPlatform[]
  player: IPlayer
  butterflies: IButterfly[]
  mushrooms: IObstacle[]
  hearts: IObstacle[]
  butterflyParticles: IParticles[]
  gameOver: boolean

  constructor(game: IGame) {
    this.game = game
    this.gameSettings = game.gameSettings
    this.width = this.gameSettings.width
    this.height = this.gameSettings.height
    this.walkSpeed = this.gameSettings.walkSpeed
    this.runSpeed = this.gameSettings.runSpeed
    this.bg1_xv = 2
    this.bg2_xv = 3
    this.bg3_xv = 5
    this.parallaxBg = []
    this.butterflies = []
    this.platforms = []
    this.butterflyParticles = []
    this.player = <IPlayer>{}
    this.gameOver = false

    this.player = new Player(this)
    this.platforms = []
    this.butterflies = []
    this.mushrooms = []
    this.hearts = []
    this.parallaxBg = []
    this.butterflyParticles = []

    const bg1 = new Background(
      0,
      0,
      this.width,
      this.height,
      './background_layer_1.png',
      this.bg1_xv
    )
    const bg2 = new Background(
      0,
      0,
      this.width,
      this.height,
      './background_layer_2.png',
      this.bg2_xv
    )
    const bg3 = new Background(
      0,
      0,
      this.width,
      this.height,
      './background_layer_3.png',
      this.bg3_xv
    )
    this.parallaxBg.push(bg1, bg2, bg3)
  }

  private restart() {
    this.gameOver = false
    this.player = new Player(this)
    this.platforms = []
    this.butterflies = []
    this.mushrooms = []
    this.hearts = []
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.parallaxBg.forEach(e => e.draw(ctx))

    this.drawUI(ctx)

    this.platforms.forEach(e => e.draw(ctx))
    this.butterflies.forEach(e => e.draw(ctx))
    this.mushrooms.forEach(e => e.draw(ctx))
    this.hearts.forEach(e => e.draw(ctx))

    this.player.draw(ctx)

    this.butterflyParticles.forEach(e => e.draw(ctx))

    if (this.player.lives < 1) {
      this.gameOver = true
      InputController.KEYS.run = false
    }
  }

  update(dt: number) {
    if (!this.gameOver) {
      if (this.butterflyParticles.length > 0) {
        for (const [idx, particle] of this.butterflyParticles.entries()) {
          particle.update()
          if (particle.radius < 1) {
            this.butterflyParticles.splice(idx, 1)
          }
        }
      }

      this.player.update(dt)
      this.parallaxBg.forEach(e => e.update(this.gameSettings.gameSpeed))

      this.gameSettings.gameSpeed = InputController.KEYS.run
        ? this.runSpeed
        : this.walkSpeed

      for (let i = 0; i < this.platforms.length; i++) {
        this.platforms[i].update(
          Math.floor(this.bg3_xv * this.gameSettings.gameSpeed)
        )
        if (this.platforms[i].delete) {
          this.platforms.splice(i, 1)
          i--
        }
      }

      if (this.platforms.length < 8 || this.platforms.length === 0) {
        this.createPlatforms(8)
      }
      for (let i = 0; i < this.butterflies.length; i++) {
        this.butterflies[i].update()
        if (this.butterflies[i].delete) {
          for (let j = 0; j < 10; j++) {
            this.butterflyParticles.push(
              new Particles(this.butterflies[i].x, this.butterflies[i].y, 10)
            )
          }
          this.butterflies.splice(i, 1)
          i--
        }
      }
      for (let i = 0; i < this.mushrooms.length; i++) {
        this.mushrooms[i].update(
          Math.floor(this.bg3_xv * this.gameSettings.gameSpeed)
        )
        if (this.mushrooms[i].delete) {
          this.mushrooms.splice(i, 1)
          i--
        }
      }
      for (let i = 0; i < this.hearts.length; i++) {
        this.hearts[i].update(
          Math.floor(this.bg3_xv * this.gameSettings.gameSpeed)
        )
        if (this.hearts[i].delete) {
          this.hearts.splice(i, 1)
          i--
        }
      }
    }
    if (InputController.KEYS.jump && this.gameOver) {
      this.restart()
    }
  }

  private drawUI(ctx: CanvasRenderingContext2D) {
    ctx.font = '24px serif'
    ctx.fillStyle = 'white'
    ctx.fillText('LIVES: ' + this.player.lives, 20, 50)
    ctx.textBaseline = 'middle'
    const textString = 'SCORE: ',
      textWidth =
        ctx.measureText(textString).width +
        ctx.measureText(this.player.score.toString()).width
    ctx.fillText(
      textString + this.player.score,
      this.gameSettings.width / 2 - textWidth / 2,
      50
    )
  }

  private createPlatforms(qty: number) {
    let dir = 0
    for (let i = 0; i < qty; i++) {
      if (this.platforms.length === 0) {
        this.platforms.push(
          new Platform(
            this.player.x,
            this.gameSettings.height - 50,
            500,
            40,
            500,
            40,
            './platform.png'
          )
        )
      }
      const lastPlatform = this.platforms.at(-1)
      const diff = Math.floor(Math.random() * 170 + 10)
      if (!lastPlatform) return
      const up =
        lastPlatform.y >= this.gameSettings.height - 50 - diff ? true : false
      const down = lastPlatform.y <= 400 ? true : false

      if (up) {
        dir = -1
      } else if (down) {
        dir = 1
      } else {
        dir = Math.random() < 0.5 ? 1 : -1
      }

      const y = lastPlatform.y + diff * dir
      const x = lastPlatform.x + lastPlatform.width + getRandom(1, 280)
      const width = getRandom(100, 500)

      this.platforms.push(
        new Platform(x, y, width, 45, 500, 45, './platform.png')
      )
      if (this.platforms[i].x > this.gameSettings.width) {
        this.createButterfly(this.platforms[i])
        if (
          this.platforms[i].width >
            this.gameSettings.obstacle.mushroom.minPlatformWidth &&
          Math.random() > this.gameSettings.obstacle.mushroom.chanseAppearing
        )
          this.createMushroom(this.platforms[i])
        if (Math.random() > this.gameSettings.obstacle.heart.chanseAppearing)
          this.createHeart(this.platforms[i])
      }
    }
  }

  private createButterfly(platform: IPlatform) {
    const x = platform.x
    const y = platform.y - 50
    this.butterflies.push(
      new Butterfly(x, y, 50, 50, 50, 50, './butterfly.png')
    )
  }

  private createMushroom({ x: platX, y: platY, width, height }: IPlatform) {
    const x = platX + 100 + ~~((width - 200) * Math.random())
    const y = platY - height + this.gameSettings.obstacle.mushroom.additionalY
    this.mushrooms.push(new Obstacle(x, y, 40, 40, 40, 40, './mushroom_1.png'))
  }

  private createHeart({ x: platX, y: platY, width, height }: IPlatform) {
    const x = platX + 100 + ~~((width - 200) * Math.random())
    const y = platY - height + this.gameSettings.obstacle.heart.additionalY
    this.hearts.push(new Obstacle(x, y, 40, 40, 40, 40, './heart.png'))
  }
}
