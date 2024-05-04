export interface IBackground {
  update(gameSpeed: number): unknown
  draw(ctx: CanvasRenderingContext2D): unknown
  bg1: {
    x: number
    y: number
    width: number
    height: number
    image: HTMLImageElement
  }
  bg2: {
    x: number
    y: number
    width: number
    height: number
    image: HTMLImageElement
  }
  x_offset: number
  xVelocity: number
  src: string
  createImage: () => void
}

export class Background implements IBackground {
  bg1 = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    image: new Image(),
  }
  bg2 = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    image: new Image(),
  }
  x_offset = 0
  xVelocity = 0
  src = ''
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    src: string,
    x_offset: number
  ) {
    this.bg1 = {
      x: x,
      y: y,
      width: width,
      height: height,
      image: new Image(),
    }
    this.bg2 = {
      x: width,
      y: y,
      width: width,
      height: height,
      image: new Image(),
    }
    this.x_offset = x_offset
    this.xVelocity = 0
    this.src = src
    this.createImage()
  }

  createImage() {
    this.bg1.image.src = this.src
    this.bg2.image.src = this.src
  }

  update(gameSpeed: number) {
    this.xVelocity = Math.floor(this.x_offset * gameSpeed)
    this.bg1.x -= this.xVelocity
    this.bg2.x -= this.xVelocity
    if (this.bg1.x <= -this.bg1.width) {
      this.bg1.x = 0
      this.bg2.x = this.bg1.width
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.bg1.image,
      this.bg1.x,
      this.bg1.y,
      this.bg1.width,
      this.bg1.height
    )
    ctx.drawImage(
      this.bg2.image,
      this.bg2.x,
      this.bg2.y,
      this.bg2.width,
      this.bg2.height
    )
  }
}
