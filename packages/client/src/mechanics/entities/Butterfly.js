import gameSettings from "../settings/gameSettings";

export class Butterfly {
   constructor(x, y, width, height) {
      this.gameSettings = gameSettings;
      this.width = width
      this.height = height
      this.x = x
      this.y = y
      this.x_velocity = Math.random() * 3 + 5;
      this.y_velocity = Math.random() * 2 - 1;
      this.velocity = Math.random() * 2 - 1;
      this.delete = false
      this.curve = Math.random() * 7
      this.angle = 0;
      this.angleSpeed = Math.random() * .2

      this.image = new Image();
      this.image.src = "./butterfly.gif";

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
         Math.floor(this.x),
         Math.floor(this.y),
         this.width, this.height
      );
      if (this.gameSettings.debug) {
         this.drawCollisionArea(ctx);
      }
   }

}
