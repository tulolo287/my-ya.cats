export class Background {
   constructor(x, y, width, height, src, x_offset) {
      this.bg1 = {
         x: x,
         y: y,
         width: width,
         height: height,
         image: new Image()
      }
      this.bg2 = {
         x: width,
         y: y,
         width: width,
         height: height,
         image: new Image()
      }
      this.x_offset = x_offset;
      this.x_velocity = 0;
      this.src = src;
      this.createImage()
   }

   createImage() {
      this.bg1.image.src = this.src
      this.bg2.image.src = this.src
   }

   update(speed) {
      this.x_velocity = Math.floor(this.x_offset * speed);
      this.bg1.x -= this.x_velocity
      this.bg2.x -= this.x_velocity
      if (this.bg1.x <= -this.bg1.width) {
         this.bg1.x = 0
         this.bg2.x = this.bg1.width
      }
   }

   draw(ctx) {
      ctx.drawImage(this.bg1.image, this.bg1.x, this.bg1.y, this.bg1.width, this.bg1.height);
      ctx.drawImage(this.bg2.image, this.bg2.x, this.bg2.y, this.bg2.width, this.bg2.height);
   }
}
