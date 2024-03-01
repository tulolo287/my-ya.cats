import { Entity, IEntity } from './entity'

export interface IMushroom extends IEntity {
  update: (xVelocity: number) => void
}

export class Mushroom extends Entity implements IMushroom {
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
  }
  update(xVelocity: number) {
    this.x -= xVelocity
    if (this.x + this.width < 0) {
      this.delete = true
    }
  }
}
