import { InputController } from '../controllers/input-controller'
import { TGameScreen } from '../screens/game-screen'
import { TGameSettings, TPlayerAnimation } from '../types'
import { isCollided } from '../utils'
import { Entity } from './entity'

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
  frameX: number
  frameY: number
  maxY_velocity: number
  jumpHeight: number
  image: HTMLImageElement
  animationSpeedFactor: number
  animationSpeed: number
  animationWalkSpeed: number
  animationRunSpeed: number
  animationTime: number
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
  frameX: number
  frameY: number
  maxY_velocity: number
  jumpHeight: number
  image: HTMLImageElement
  animationSpeedFactor: number
  animationSpeed: number
  animationWalkSpeed: number
  animationRunSpeed: number
  animationTime: number
  currentAnimation: string
  scaleFactor: number
  isJump: boolean
  jumpFriction: number

  constructor(gameScreen: TGameScreen) {
    this.gameScreen = gameScreen
    this.gameSettings = gameScreen.gameSettings

    this.lives = 3
    this.score = 0

    this.width = Math.ceil(1236 / 8)
    this.height = Math.ceil(7880 / 51)
    this.scaleFactor = 0.9

    this.scaleWidth = Math.floor(this.width * this.scaleFactor)
    this.scaleHeight = Math.floor(this.height * this.scaleFactor)

    this.x = Math.floor(this.gameSettings.width / 2 - this.width / 2)
    this.y = Math.floor(this.gameSettings.height / 2 - this.height)

    this.collisionArea = {
      y: this.y + 30,
      x: this.x + 35,
      width: Math.floor(this.scaleWidth * 0.4),
      height: Math.floor(this.scaleHeight * 0.4),
      initialOffset: 73,
      offset: 73,
      jumpOffset: 20,
    }

    this.gravity = 35
    this.yVelocity = 0
    this.frameX = 0
    this.frameY = 0
    this.maxY_velocity = 100
    this.jumpHeight = 120
    this.jumpFriction = 0.1
    this.isJump = false

    this.image = new Image()
    this.image.src = './Cat-Sheet.png'
    this.animationSpeedFactor = 0
    this.animationWalkSpeed = 13
    this.animationRunSpeed = 25
    this.animationSpeed = 1
    this.animationTime = 0
    this.currentAnimation = 'walk'
  }

  update(dt: number) {
    this.animate(dt)
    this.yVelocity += this.gravity * dt
    if (this.yVelocity > this.maxY_velocity) {
      this.yVelocity = this.maxY_velocity
    }
    this.isObjectHit(this.gameScreen.butterflies, () => this.score++)
    this.isObjectHit(this.gameScreen.mushrooms, () => this.lives--)
    this.isObjectHit(this.gameScreen.hearts, () => this.lives++)
    if (InputController.KEYS.jump && this.isJump) {
      this.jump()
    }
    if (!InputController.KEYS.jump) {
      this.isJump = true
    }

    if (this.isJump && this.yVelocity < 0 && !InputController.KEYS.jump) {
      this.yVelocity *= this.jumpFriction
    }

    this.collisionArea.y += Math.floor(this.yVelocity * dt)
    this.isGround()
    this.y = this.collisionArea.y - this.collisionArea.offset

    if (this.collisionArea.y > this.gameSettings.height) {
      this.lives--
      const targetPlatform = this.gameScreen.getMiddlePlatform()
      if (targetPlatform) {
        this.x = targetPlatform.x - this.collisionArea.width
        this.collisionArea.x = this.x + 35
        this.collisionArea.y = targetPlatform.y - this.collisionArea.height - 50
      } else {
        this.collisionArea.y = 100
      }
    }
  }

  animate = (dt: number) => {
    this.animationTime += dt
    this.animationSpeedFactor =
      this.currentAnimation === 'run'
        ? this.animationRunSpeed / this.gameSettings.gameSpeed
        : this.animationWalkSpeed / this.gameSettings.gameSpeed
    this.animationSpeed = this.animationSpeedFactor
    if (this.yVelocity > 0) {
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
    if (this.animationTime >= this.animationSpeed) {
      this.animationTime = 0
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
        this.yVelocity = 0
        this.collisionArea.y = obstacle.y - this.collisionArea.height
        this.currentAnimation =
          this.gameSettings.gameSpeed > 50 ? 'run' : 'walk'
        return true
      }
    }
    return false
  }

  isObjectHit<T extends Entity>(objects: Array<T>, callback: () => void) {
    for (const object of objects) {
      const obstacle = isCollided(this, object)
      if (obstacle) {
        object.delete = true
        callback()
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
      this.x,
      this.y,
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
