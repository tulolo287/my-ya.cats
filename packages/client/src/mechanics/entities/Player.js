import { InputController } from "../controllers/InputController";

export class Player {
  constructor(gameSettings) {
    this.gameSettings = gameSettings;
    this.width = 618 / 8;
    this.height = 618 / 8;
    this.scaleWidth = 120;
    this.scaleHeight = 120;
    this.x = this.gameSettings.width / 2 - this.width / 2;
    this.y = this.gameSettings.height / 2 - this.height;
    this.gravity = 1 * this.gameSettings.gameSpeed;
    this.y_velocity = 0;
    this.x_velocity = 5;
    this.friction = 0.5;
    this.frameX = 0;
    this.frameY = 0;
    this.maxY_velocity = 30 * this.gameSettings.gameSpeed;
    this.minY_velocity = 5;
    this.speed = 10;
    this.jumpHeight = this.gravity * 25;
    this.acceleration = 3;
    this.image = new Image();
    this.image.src = "./Cat-Sheet_1.png";
    this.animationSpeed = Math.floor(100 / this.gameSettings.gameSpeed);
    this.frameCount = 0;
    this.currentAnimation = "walk";
  }

  update(dt) {
    this.animate(dt);
    //this.gravity = 0.5 * this.gameSettings.gameSpeed;
    //this.maxY_velocity = 30 * this.gameSettings.gameSpeed;
    //this.animationSpeed = Math.floor(150 / this.gameSettings.gameSpeed);
    this.y_velocity += this.gravity;
    if (this.y_velocity > this.maxY_velocity) {
      this.y_velocity = this.maxY_velocity;
    }
    this.isGround();
    if (InputController.KEYS.space) {
      this.jump();
    }
    this.y += this.y_velocity * dt;
  }

  animate = () => {
    if (this.y_velocity > 0) this.currentAnimation = "fall";

    this.frameY =
      this.gameSettings.playerAnimation[this.currentAnimation].frameY;
    if (this.frameCount % this.animationSpeed === 0) {
      if (
        this.frameX ===
        this.gameSettings.playerAnimation[this.currentAnimation].totalFrames
      ) {
        if (
          this.currentAnimation === "fall" ||
          this.currentAnimation === "jump"
        ) {
          this.frameX =
            this.gameSettings.playerAnimation[
              this.currentAnimation
            ].totalFrames;
        } else this.frameX = 0;
      } else this.frameX++;
    }
    this.frameCount++;
  };

  jump() {
    //InputController.KEYS.space = false;
    if (!this.isGround()) {
      return;
    }
    this.frameX = 0;
    this.currentAnimation = "jump";
    if (
      this.frameX ===
      this.gameSettings.playerAnimation[this.currentAnimation].totalFrames
    ) {
      this.frameX =
        this.gameSettings.playerAnimation[this.currentAnimation].totalFrames;
    }
    this.y_velocity = -this.jumpHeight;
  }

  isGround() {
    if (this.y + this.scaleHeight >= this.gameSettings.height) {
      this.y = this.gameSettings.height - this.scaleHeight;
      this.y_velocity = 0;
      this.currentAnimation = "walk";
      return true;
    }
    return false;
  }

  drawPlayer(ctx) {
    ctx.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.width,
      Math.floor(this.x),
      Math.floor(this.y),
      this.scaleWidth,
      this.scaleHeight
    );
  }

  draw(ctx) {
    this.drawPlayer(ctx);
  }
}
