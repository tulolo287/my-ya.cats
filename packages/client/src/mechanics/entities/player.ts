import { InputController } from '../controllers/input-controller'
import { TGameScreen } from '../screens/game-screen'
import { TGameSettings, TPlayerAnimation } from '../types'
import { isCollided } from '../utils'

export interface IPlayer {
  gameScreen: TGameScreen
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
    initialOffset: number
    offset: number
    jumpOffset: number
  }
  gravity: number
  yVelocity: number
  xVelocity: number
  frameX: number
  frameY: number
  maxY_velocity: number
  jumpHeight: number
  image: HTMLImageElement
  animationSpeedFactor: number
  animationSpeed: number
  frameCount: number
  currentAnimation: string
  update: (dt: number) => void
  draw: (ctx: CanvasRenderingContext2D) => void
  scaleFactor: number
  isJump: boolean
  jumpFriction: number
}
export class Player implements IPlayer {
  gameScreen: TGameScreen
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
    initialOffset: number
    offset: number
    jumpOffset: number
  }
  gravity: number
  yVelocity: number
  xVelocity: number
  frameX: number
  frameY: number
  maxY_velocity: number
  jumpHeight: number
  image: HTMLImageElement
  animationSpeedFactor: number
  animationSpeed: number
  frameCount: number
  currentAnimation: string
  scaleFactor: number
  isJump: boolean
  jumpFriction: number

  constructor(gameScreen: TGameScreen) {
    this.gameScreen = gameScreen
    this.gameSettings = gameScreen.gameSettings

    this.lives = 1
    this.score = 0

    this.width = 1236 / 8
    this.height = 7880 / 51
    this.scaleFactor = 0.9

    this.scaleWidth = this.width * this.scaleFactor
    this.scaleHeight = this.height * this.scaleFactor

    this.x = this.gameSettings.width / 2 - this.width / 2
    this.y = this.gameSettings.height / 2 - this.height

    this.collisionArea = {
      y: this.y + 30,
      x: this.x + 35,
      width: this.scaleWidth * 0.4,
      height: this.scaleHeight * 0.4,
      initialOffset: 73,
      offset: 73,
      jumpOffset: 20,
    }

    this.gravity = 0.7
    this.yVelocity = 0
    this.xVelocity = 5
    this.frameX = 0
    this.frameY = 0
    this.maxY_velocity = 17
    this.jumpHeight = 17
    this.jumpFriction = 0.7
    this.isJump = false

    this.image = new Image()
    this.image.src = './Cat-Sheet.png'
    this.animationSpeedFactor = 4
    this.animationSpeed = 1
    this.frameCount = 0
    this.currentAnimation = 'walk'
  }

  update(dt: number) {
    this.animate()
    this.yVelocity += this.gravity
    if (this.yVelocity > this.maxY_velocity) {
      this.yVelocity = this.maxY_velocity
    }
    this.isGround()
    this.isButterflyHit()
    if (InputController.KEYS.jump && this.isJump) {
      this.jump()
    }
    if (!InputController.KEYS.jump) {
      this.isJump = true
    }

    if (this.isJump && this.yVelocity < 0 && !InputController.KEYS.jump) {
      this.yVelocity *= this.jumpFriction
    }

    this.collisionArea.y += this.yVelocity
    this.y = this.collisionArea.y - this.collisionArea.offset

    if (this.y > this.gameSettings.height) {
      this.lives--
      this.collisionArea.y = 300
    }
  }

  animate = () => {
    this.animationSpeedFactor = this.currentAnimation === 'run' ? 7 : 5
    this.animationSpeed = Math.floor(
      this.animationSpeedFactor / this.gameSettings.gameSpeed
    )
    if (this.yVelocity > this.gravity) {
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
    this.collisionArea.offset =
      this.currentAnimation === 'jump'
        ? this.collisionArea.jumpOffset
        : this.collisionArea.initialOffset
    this.frameCount++
  }

  jump() {
    if (!this.isGround()) {
      return
    }
    this.isJump = false
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
    this.yVelocity = -this.jumpHeight
  }

  isGround() {
    for (let i = 0; i < this.gameScreen.platforms.length; i++) {
      const obstacle = isCollided(this, this.gameScreen.platforms[i])
      if (obstacle) {
        if (this.y + 70 < obstacle.y) {
          this.yVelocity = 0
          this.collisionArea.y = obstacle.y - this.collisionArea.height
          this.currentAnimation =
            this.gameSettings.gameSpeed > 1.7 ? 'run' : 'walk'
        }
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
