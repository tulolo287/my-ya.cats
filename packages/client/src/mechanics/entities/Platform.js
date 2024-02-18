import { Entity } from "./Entity";

export class Platform extends Entity {
   constructor(x, y, width, height, scaleWidth, scaleHeight, imgSrc) {
      super(x, y, width, height, scaleWidth, scaleHeight, imgSrc);
   }

   update(x_velocity) {
      this.x -= x_velocity//Math.floor(this.x_velocity * this.gameSettings.gameSpeed);
      if (this.x + this.width < 0) {
         this.delete = true;
      }
   }
}
