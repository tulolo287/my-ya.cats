import { Entity } from "./Entity";

export class Butterfly extends Entity {
   constructor(x, y, width, height, scaleWidth, scaleHeight, imgSrc) {
      super(x, y, width, height, scaleWidth, scaleHeight, imgSrc);
      this.x_velocity = Math.random() * 3 + 5;
      this.y_velocity = Math.random() * 2 - 1;
      this.velocity = Math.random() * 2 - 1;
      this.curve = Math.random() * 7
      this.angle = 0;
      this.angleSpeed = Math.random() * .2
   }

   update() {
      this.y_velocity = Math.random() * 20 - 10
      this.x -= this.x_velocity;
      this.y += this.curve * Math.sin(this.angle) + this.y_velocity;
      this.angle += this.angleSpeed
      if (this.x + this.width < 0) {
         this.delete = true;
      }
   }


}
