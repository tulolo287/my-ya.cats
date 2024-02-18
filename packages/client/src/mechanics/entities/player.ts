import { InputController } from '../controllers/input-controller'
import { IGameScreen } from '../screens/game-screen'
import { TGameSettings, TPlayerAnimation } from '../types'
import { isCollided } from '../utils'

export interface IPlayer {
  gameScreen: IGameScreen
  gameSettings: TGameSettings
  lives: number
  score: number
  width: number
  height: number
  scaleWidth: number
  scaleHeight: number
  x: number
  y: number
  collisionArea: {
    y: number
    x: number
    width: number
    height: number
  }
  gravity: number
  y_velocity: number
  x_velocity: number
  frameX: number
  frameY: number
  maxY_velocity: number
  minY_velocity: number
  jumpHeight: number
  isJumping: boolean
  image: HTMLImageElement
  animationSpeed: number
  frameCount: number
  currentAnimation: string
}
export class Player implements IPlayer {
  gameScreen: IGameScreen
  gameSettings: TGameSettings
  lives: number
  score: number
  width: number
  height: number
  scaleWidth: number
  scaleHeight: number
  x: number
  y: number
  collisionArea: { y: number; x: number; width: number; height: number }
  gravity: number
  y_velocity: number
  x_velocity: number
  frameX: number
  frameY: number
  maxY_velocity: number
  minY_velocity: number
  jumpHeight: number
  isJumping: boolean
  image: HTMLImageElement
  animationSpeed: number
  frameCount: number
  currentAnimation: string

  constructor(gameScreen: IGameScreen) {
    this.gameScreen = gameScreen
    this.gameSettings = gameScreen.gameSettings

    this.lives = 3
    this.score = 0

    this.width = 618 / 8
    this.height = 3940 / 51
    this.scaleWidth = 120
    this.scaleHeight = 120

    this.x = this.gameSettings.width / 2 - this.width / 2
    this.y = this.gameSettings.height / 2 - this.height

    this.collisionArea = {
      y: this.y + 20,
      x: this.x + 25,
      width: this.scaleWidth * 0.4,
      height: this.scaleHeight * 0.4,
    }

    this.gravity = 0.3
    this.y_velocity = 0
    this.x_velocity = 5
    this.frameX = 0
    this.frameY = 0
    this.maxY_velocity = 18 * this.gameSettings.gameSpeed
    this.minY_velocity = 5
    this.jumpHeight = this.gravity * 35
    this.isJumping = false
    this.image = new Image()
    this.image.src = './Cat-Sheet_1.png'
    this.animationSpeed = Math.floor(4 / this.gameSettings.gameSpeed)
    this.frameCount = 0
    this.currentAnimation = 'walk'
  }

  update(dt: number) {
    this.animate()
    this.animationSpeed = Math.floor(4 / this.gameSettings.gameSpeed)
    this.y_velocity += this.gravity
    if (this.y_velocity > this.maxY_velocity) {
      this.y_velocity = this.maxY_velocity
    }
    this.isGround()
    this.isButterflyHit()
    if (InputController.KEYS.space) {
      this.jump()
    }
    /*     if (!InputController.KEYS.space) {
      this.isJumping = false
    }
    if (!this.isJumping && this.y_velocity < 0) {
      InputController.KEYS.space = false
      this.y_velocity += 0.5
    } */

    this.collisionArea.y += this.y_velocity
    this.y = this.collisionArea.y - 63

    if (this.y > this.gameSettings.height) {
      this.lives--
      this.collisionArea.y = 300
    }
  }

  animate = () => {
    if (this.y_velocity > this.gravity) {
      this.currentAnimation = 'fall'
    }
    if (
      this.frameX >
      this.gameSettings.playerAnimation[
        this.currentAnimation as keyof TPlayerAnimation
      ].totalFrames
    ) {
      this.frameX = 0
    }
    this.frameY =
      this.gameSettings.playerAnimation[
        this.currentAnimation as keyof TPlayerAnimation
      ].frameY
    if (this.frameCount % this.animationSpeed === 0) {
      if (
        this.frameX ===
        this.gameSettings.playerAnimation[
          this.currentAnimation as keyof TPlayerAnimation
        ].totalFrames
      ) {
        this.frameX =
          this.currentAnimation === 'fall' || this.currentAnimation === 'jump'
            ? this.gameSettings.playerAnimation[this.currentAnimation]
                .totalFrames
            : 0
      } else this.frameX++
    }
    this.frameCount++
  }

  jump() {
    InputController.KEYS.space = false
    if (!this.isGround()) {
      return
    }
    this.isJumping = true
    //this.game.sound.play()
    this.isJumping = true
    this.frameX = 0
    this.currentAnimation = 'jump'
    if (
      this.frameX ===
      this.gameSettings.playerAnimation[
        this.currentAnimation as keyof TPlayerAnimation
      ].totalFrames
    ) {
      this.frameX =
        this.gameSettings.playerAnimation[
          this.currentAnimation as keyof TPlayerAnimation
        ].totalFrames
    }
    this.y_velocity = -this.jumpHeight
  }

  isGround() {
    for (let i = 0; i < this.gameScreen.platforms.length; i++) {
      const obstacle = isCollided(this, this.gameScreen.platforms[i])
      if (obstacle && typeof obstacle === 'object') {
        if (this.y + 50 < obstacle.y) {
          this.y_velocity = 0
          this.collisionArea.y = obstacle.y - this.collisionArea.height
          this.currentAnimation =
            this.gameSettings.gameSpeed > 1.1 ? 'run' : 'walk'
        }
        this.isJumping = false
        return true
      }
    }
    return false
  }

  isButterflyHit() {
    for (let i = 0; i < this.gameScreen.butterflies.length; i++) {
      const obstacle = isCollided(this, this.gameScreen.butterflies[i])
      if (obstacle) {
        this.gameScreen.butterflies[i].delete = true
        this.score++
        return true
      }
    }
    return false
  }

  drawPlayer(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      Math.floor(this.x),
      Math.floor(this.y),
      this.scaleWidth,
      this.scaleHeight
    )
  }

  drawCollisionArea(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.lineWidth = 4
    ctx.strokeStyle = 'green'
    ctx.rect(
      this.collisionArea.x,
      this.collisionArea.y,
      this.collisionArea.width,
      this.collisionArea.height
    )
    ctx.stroke()
    ctx.closePath()
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.drawPlayer(ctx)
    if (this.gameSettings.debug) {
      this.drawCollisionArea(ctx)
    }
  }
}
