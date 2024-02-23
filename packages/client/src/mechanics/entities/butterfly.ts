import { Entity } from './entity'

export interface IButterfly extends Entity {
  x_velocity: number
  y_velocity: number
  velocity: number
  curve: number
  angle: number
  angleSpeed: number
  update: () => void
  initial_x_velocity: number
  wiggle: number
}

export class Butterfly extends Entity implements IButterfly {
  x_velocity: number
  y_velocity: number
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
    this.x_velocity = 0
    this.initial_x_velocity = Math.random() * 8 - 4
    this.y_velocity = Math.random() * 4 - 2
    this.velocity = Math.random() * 2 - 1
    this.curve = Math.random() * 8 - 4
    this.angle = 0
    this.angleSpeed = 0.02
    this.wiggle = 0
  }

  update() {
    this.wiggle = Math.random() * 20 - 10
    this.y_velocity = this.wiggle
    this.x_velocity = -this.gameSettings.gameSpeed * 5 + this.initial_x_velocity
    this.x += this.x_velocity
    this.y += this.curve * Math.sin(this.angle) + this.y_velocity
    this.angle += this.angleSpeed
    if (this.x + this.width < 0) {
      this.delete = true
    }
  }
}
