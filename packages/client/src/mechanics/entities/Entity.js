import gameSettings from "../settings/gameSettings";

export class Entity {
   constructor(x, y, width, height, scaleWidth, scaleHeight, imgSrc) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.scaleWidth = scaleWidth;
      this.scaleHeight = scaleHeight;
      this.delete = false
      this.image = new Image();
      this.image.src = imgSrc;
      this.gameSettings = gameSettings;
   }

   drawCollisionArea(ctx) {
      ctx.beginPath();
      ctx.lineWidth = "4";
      ctx.strokeStyle = "green";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
      ctx.closePath();
   }

   draw(ctx) {
      ctx.drawImage(
         this.image,
         0, 0,
         this.width,
         this.height,
         this.x,
         this.y,
         this.width,
         this.height
      );

      if (this.gameSettings.debug) {
         this.drawCollisionArea(ctx);
      }
   }
}
