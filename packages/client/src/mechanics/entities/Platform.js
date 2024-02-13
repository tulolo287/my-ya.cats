import gameSettings from "../settings/gameSettings";

export class Platform {
   constructor(x, y, width, height) {
      this.gameSettings = gameSettings;
      this.width = width
      this.height = height
      this.x = x
      this.y = y
      this.x_velocity = 4;
      this.delete = false

      this.image = new Image();
      this.image.src = "./platform.png";

   }

   update() {
      this.x -= this.x_velocity * this.gameSettings.gameSpeed;
      if (this.x + this.width < 0) {
         this.delete = true;
      }
   }

   draw(ctx) {
      ctx.drawImage(
         this.image,
         this.x,
         this.y,
         this.width, this.height
      );

      /*  ctx.beginPath();
          ctx.lineWidth = "4";
          ctx.strokeStyle = "green";
          ctx.rect(this.x, this.y, this.width, this.height);
          ctx.stroke();
          ctx.closePath(); */

   }

}
