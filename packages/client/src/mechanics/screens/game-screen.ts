import { InputController } from '../controllers/input-controller'
import { IGame } from '../engine/game'
import { Butterfly, IButterfly } from '../entities/butterfly'
import { IObstacle, Obstacle } from '../entities/obstacle'
import { IPlatform, Platform } from '../entities/platform'
import { IPlayer, Player } from '../entities/player'
import { Background, IBackground } from '../system/background'
import { TGameSettings } from '../types'

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
    this.player = <IPlayer>{}
    this.gameOver = false

    this.player = new Player(this)
    this.platforms = []
    this.butterflies = new Array<IButterfly>()
    this.mushrooms = new Array<IObstacle>()
    this.hearts = new Array<IObstacle>()
    this.parallaxBg = new Array<IBackground>()

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
    this.butterflies = new Array<IButterfly>()
    this.mushrooms = new Array<IObstacle>()
    this.hearts = new Array<IObstacle>()
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (const bg of this.parallaxBg) {
      bg.draw(ctx)
    }
    this.drawUI(ctx)

    for (const platform of this.platforms) {
      platform.draw(ctx)
    }
    for (const butterfly of this.butterflies) {
      butterfly.draw(ctx)
    }
    for (const mushroom of this.mushrooms) {
      mushroom.draw(ctx)
    }
    for (const heart of this.hearts) {
      heart.draw(ctx)
    }
    this.player.draw(ctx)

    if (this.player.lives < 1) {
      this.drawGameOver(ctx)
    }
  }

  update(dt: number) {
    if (!this.gameOver) {
      this.player.update(dt)
      for (const bg of this.parallaxBg) {
        bg.update(this.gameSettings.gameSpeed)
      }

      this.gameSettings.gameSpeed = InputController.KEYS.run
        ? this.runSpeed
        : this.walkSpeed

      for (const [idx, platform] of this.platforms.entries()) {
        if (platform.delete) {
          this.platforms.splice(idx, 1)
        }
        platform.update(Math.floor(this.bg3_xv * this.gameSettings.gameSpeed))
      }

      if (this.platforms.length < 8 || this.platforms.length === 0) {
        this.createPlatforms(8)
      }
      for (const [idx, butterfly] of this.butterflies.entries()) {
        if (butterfly.delete) {
          this.butterflies.splice(idx, 1)
        }
        butterfly.update()
      }
      for (const [idx, mushroom] of this.mushrooms.entries()) {
        if (mushroom.delete) {
          this.mushrooms.splice(idx, 1)
        }
        mushroom.update(Math.floor(this.bg3_xv * this.gameSettings.gameSpeed))
      }
      for (const [idx, heart] of this.hearts.entries()) {
        if (heart.delete) {
          this.hearts.splice(idx, 1)
        }
        heart.update(Math.floor(this.bg3_xv * this.gameSettings.gameSpeed))
      }
    }
    if (InputController.KEYS.jump && this.gameOver) {
      this.restart()
    }
  }

  private drawUI(ctx: CanvasRenderingContext2D) {
    ctx.font = '24px serif'
    ctx.strokeStyle = 'yellow'
    ctx.strokeText('LIVES: ' + this.player.lives, 20, 50)
    ctx.textBaseline = 'middle'
    const textString = 'SCORE: ',
      textWidth =
        ctx.measureText(textString).width +
        ctx.measureText(this.player.score.toString()).width
    ctx.strokeText(
      textString + this.player.score,
      this.gameSettings.width / 2 - textWidth / 2,
      50
    )
  }

  private drawGameOver(ctx: CanvasRenderingContext2D) {
    ctx.font = '60px serif'
    ctx.fillStyle = 'red'
    let textString = 'GAME OVER',
      textWidth = ctx.measureText(textString).width
    ctx.fillText(
      textString,
      this.gameSettings.width / 2 - textWidth / 2,
      this.gameSettings.height / 2 - 50
    )

    ctx.font = '48px serif'
    ctx.fillStyle = 'white'
    ;(textString = 'To start again press SPACE'),
      (textWidth = ctx.measureText(textString).width)
    ctx.fillText(
      textString,
      this.gameSettings.width / 2 - textWidth / 2,
      this.gameSettings.height / 2 + 50
    )
    this.gameOver = true
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
      const x =
        lastPlatform.x + lastPlatform.width + Math.floor(Math.random() * 280)
      const width = Math.random() * 400 + 100

      this.platforms.push(
        new Platform(x, y, width, 45, 500, 45, './platform.png')
      )
      if (this.platforms[i].x > this.gameSettings.width) {
        this.createButterfly(this.platforms[i])
        if (this.platforms[i].width > 250 && Math.random() > 0.7)
          this.createMushroom(this.platforms[i])
        if (Math.random() > 0.9) this.createHeart(this.platforms[i])
      }
    }
  }

  private createButterfly(platform: IPlatform) {
    const x = platform.x
    const y = Math.floor(Math.random() * (platform.y - 200 - 600) + 600)
    this.butterflies.push(
      new Butterfly(x, y, 50, 50, 50, 50, './butterfly.png')
    )
  }

  private createMushroom(platform: IPlatform) {
    const x =
      platform.x + 100 + Math.floor((platform.width - 200) * Math.random())
    const y = platform.y - platform.height + 20
    this.mushrooms.push(new Obstacle(x, y, 40, 40, 40, 40, './mushroom_1.png'))
  }

  private createHeart(platform: IPlatform) {
    const x =
      platform.x + 100 + Math.floor((platform.width - 200) * Math.random())
    const y = platform.y - platform.height + 10
    this.hearts.push(new Obstacle(x, y, 40, 40, 40, 40, './heart.png'))
  }
}
