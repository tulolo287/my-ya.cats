export class Obstacle {
   constructor(width, height, x, y, type = 'ground') {
      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y;
      this.type = type;
   }

   update() {
      //this.x += .2
   }

   draw(ctx) {
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.fill()
      //this.update();
   }
}
