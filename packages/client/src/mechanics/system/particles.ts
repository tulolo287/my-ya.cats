import { getRandom } from '../utils'

export interface IParticles {
  x: number
  y: number
  radius: number
  xVelocity: number
  yVelocity: number
  liveTime: number
  color: number
  draw: (ctx: CanvasRenderingContext2D) => void
  update: () => void
}
export class Particles implements IParticles {
  x: number
  y: number
  radius: number
  xVelocity: number
  yVelocity: number
  liveTime: number
  color: number

  constructor(x: number, y: number, radius: number) {
    this.x = x
    this.y = y
    this.radius = getRandom(5, 10)
    this.xVelocity = getRandom(-10, 2)
    this.yVelocity = getRandom(-5, 5)
    this.liveTime = 15
    this.color = getRandom(1, 360)
  }

  update() {
    this.radius -= 0.3
    this.color += 20
    this.x += this.xVelocity
    this.y += this.yVelocity
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'hsl(' + this.color + ', 100%, 50%)'
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fill()
    ctx.closePath()
  }
}
