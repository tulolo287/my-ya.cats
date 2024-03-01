import { Entity, IEntity } from './entity'

export interface IHeart extends IEntity {
  update: (xVelocity: number) => void
}

export class Heart extends Entity implements IHeart {
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
