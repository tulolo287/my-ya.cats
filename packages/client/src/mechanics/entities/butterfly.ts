import { getRandom } from '../utils'
import { Entity, IEntity } from './entity'

export interface IButterfly extends IEntity {
  xVelocity: number
  yVelocity: number
  velocity: number
  curve: number
  angle: number
  angleSpeed: number
  update: (dt: number) => void
  initial_x_velocity: number
  wiggle: number
}

export class Butterfly extends Entity implements IButterfly {
  xVelocity: number
  yVelocity: number
  velocity: number
  curve: number
  angle: number
  angleSpeed: number
  initial_x_velocity: number
  wiggle: number

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    scaleWidth: number,
    scaleHeight: number,
    imgSrc: string
  ) {
    super(x, y, width, height, scaleWidth, scaleHeight, imgSrc)
    this.xVelocity = 0
    this.initial_x_velocity = getRandom(-4, 4)
    this.yVelocity = getRandom(-2, 2)
    this.velocity = getRandom(-1, 1)
    this.curve = getRandom(-4, 4)
    this.angle = 0
    this.angleSpeed = 0.02
    this.wiggle = 0
  }

  update(speed: number) {
    this.wiggle = getRandom(-10, 10)
    this.yVelocity = this.wiggle
    this.xVelocity = -speed + this.initial_x_velocity
    if (this.y < 0) {
      this.yVelocity += 10
    }
    if (this.y + this.width > this.gameSettings.height) {
      this.yVelocity -= 10
    }

    this.x += this.xVelocity
    this.y += this.curve * Math.sin(this.angle) + this.yVelocity
    this.angle += this.angleSpeed
    if (this.x + this.width < 0) {
      this.delete = true
    }
  }
}
