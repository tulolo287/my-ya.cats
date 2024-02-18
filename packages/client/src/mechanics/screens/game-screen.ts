import { InputController } from '../controllers/input-controller'
import { Butterfly, IButterfly } from '../entities/butterfly'
import { IPlatform, Platform } from '../entities/platform'
import { IPlayer, Player } from '../entities/player'
import { IGame } from '../game'
import { Background, IBackground } from '../system/background'
import { TGameSettings } from '../types'

export interface IGameScreen {
  game: IGame
  gameSettings: TGameSettings
  walkSpeed: number
  runSpeed: number
  width: number
  height: number
  bg1_xv: number
  bg2_xv: number
  bg3_xv: number
  parallaxBg: IBackground[]
  platforms: IPlatform[]
  butterflies: IButterfly[]
  player: IPlayer
  speedChangeIntervalID: number
  update: (dt: number) => void
  draw: (ctx: CanvasRenderingContext2D) => void
}

export class GameScreen implements IGameScreen {
  game: IGame
  gameSettings: TGameSettings
  walkSpeed: number
  runSpeed: number
  width: number
  height: number
  bg1_xv: number
  bg2_xv: number
  bg3_xv: number
  parallaxBg: IBackground[]
  platforms: IPlatform[]
  player: any
  butterflies: IButterfly[]
  speedChangeIntervalID: number

  constructor(game: IGame) {
    this.game = game
    this.gameSettings = game.gameSettings
    this.width = this.gameSettings.width
    this.height = this.gameSettings.height
    this.walkSpeed = this.gameSettings.walkSpeed
    this.runSpeed = this.gameSettings.runSpeed
    //this.sound = new Sound('./sound/jump.mp3');
    this.bg1_xv = 2
    this.bg2_xv = 3
    this.bg3_xv = 5
    this.parallaxBg = []
    this.butterflies = []
    this.platforms = []
    this.speedChangeIntervalID = 0

    this.init()
  }

  init() {
    this.player = new Player(this)
    this.platforms = []
    this.butterflies = new Array<IButterfly>()
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

    const platform1 = new Platform(
      this.player.x,
      this.gameSettings.height - 50,
      500,
      40,
      500,
      40,
      './platform.png'
    )
    this.platforms.push(platform1)
    this.createPlatforms(7)
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
    this.player.draw(ctx)

    if (this.player.lives < 1) {
      this.gameOver(ctx)
    }
  }

  update(dt: number) {
    for (const bg of this.parallaxBg) {
      bg.update(this.gameSettings.gameSpeed)
    }
    if (InputController.KEYS.space && this.game.gameOver) {
      window.clearInterval(this.speedChangeIntervalID)
      this.game.init()
      InputController.KEYS.space = false
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
    this.player.update(dt)
    if (this.platforms.length < 7) {
      this.createPlatforms(7)
    }
    for (const [idx, butterfly] of this.butterflies.entries()) {
      if (butterfly.delete) {
        this.butterflies.splice(idx, 1)
      }
      butterfly.update()
    }
  }

  drawUI(ctx: CanvasRenderingContext2D) {
    ctx.font = '24px serif'
    ctx.strokeStyle = 'yellow'
    ctx.strokeText('LIVES: ' + this.player.lives, 20, 50)
    ctx.textBaseline = 'middle'
    const textString = 'SCORE: 1',
      textWidth = ctx.measureText(textString).width
    ctx.strokeText(
      'SCORE: ' + this.player.score,
      this.gameSettings.width / 2 - textWidth / 2,
      50
    )
  }

  gameOver(ctx: CanvasRenderingContext2D) {
    ctx.font = '60px serif'
    ctx.fillStyle = 'red'
    let textString = 'GAME OVER',
      textWidth = ctx.measureText(textString).width
    ctx.fillText(
      'GAME OVER',
      this.gameSettings.width / 2 - textWidth / 2,
      this.gameSettings.height / 2 - 50
    )

    ctx.font = '48px serif'
    ctx.fillStyle = 'white'
    ;(textString = 'To start again press SPACE'),
      (textWidth = ctx.measureText(textString).width)
    ctx.fillText(
      'To start again press SPACE',
      this.gameSettings.width / 2 - textWidth / 2,
      this.gameSettings.height / 2 + 50
    )

    this.game.gameOver = true
  }

  createPlatforms(qty: number) {
    let dir = 0
    for (let i = 0; i < qty; i++) {
      const lastPlatform = this.platforms.at(-1)
      if (!lastPlatform) throw new Error('Platform not found')
      const diff = Math.floor(Math.random() * 170 + 10)
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
      }
    }
  }

  createButterfly(platform: IPlatform) {
    const x = platform.x //Math.floor(Math.random() * (platform.x + platform.width - platform.x) + platform.x);
    const y = Math.floor(Math.random() * (platform.y - 100 - 400) + 400)
    this.butterflies.push(
      new Butterfly(x, y, 50, 50, 50, 50, './butterfly.png')
    )
  }
}
