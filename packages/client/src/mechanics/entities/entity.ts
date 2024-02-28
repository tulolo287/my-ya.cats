import gameSettings from '../settings/game-settings'
import { TGameSettings } from '../types'

export interface IEntity {
  x: number
  y: number
  width: number
  height: number
  scaleWidth: number
  scaleHeight: number
  delete: boolean
  image: HTMLImageElement
  gameSettings: TGameSettings
  drawCollisionArea: (ctx: CanvasRenderingContext2D) => void
  draw: (ctx: CanvasRenderingContext2D) => void
}
export abstract class Entity implements IEntity {
  x: number
  y: number
  width: number
  height: number
  scaleWidth: number
  scaleHeight: number
  delete: boolean
  image: HTMLImageElement
  gameSettings: TGameSettings

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    scaleWidth: number,
    scaleHeight: number,
    imgSrc: string
  ) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.scaleWidth = scaleWidth
    this.scaleHeight = scaleHeight
    this.delete = false
    this.image = new Image()
    this.image.src = imgSrc
    this.gameSettings = gameSettings
  }

  drawCollisionArea(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.lineWidth = 4
    ctx.strokeStyle = 'green'
    ctx.rect(this.x, this.y, this.width, this.height)
    ctx.stroke()
    ctx.closePath()
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.image,
      0,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    )

    if (this.gameSettings.debug) {
      this.drawCollisionArea(ctx)
    }
  }
}
