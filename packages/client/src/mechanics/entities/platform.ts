import { Entity } from './entity'

export interface IPlatform extends Entity {
  update: (x_velocity: number) => void
}
export class Platform extends Entity implements IPlatform {
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

  update(x_velocity: number) {
    this.x -= x_velocity //Math.floor(this.x_velocity * this.gameSettings.gameSpeed);
    if (this.x + this.width < 0) {
      this.delete = true
    }
  }
}
