import { InputController } from "../controllers/InputController";
import { isCollided } from "../utils";

export class Player {
  constructor(game) {
    this.game = game;
    this.gameSettings = game.gameSettings;

    this.width = 618 / 8;
    this.height = 3940 / 51;
    this.scaleWidth = 120;
    this.scaleHeight = 120;

    this.x = this.gameSettings.width / 2 - this.width / 2;
    this.y = this.gameSettings.height / 2 - this.height;

    this.collisionArea = {
      y: this.y + 20,
      x: this.x + 30,
      width: this.scaleWidth * 0.4,
      height: this.scaleHeight * 0.4,
    }

    this.gravity = .3;
    this.y_velocity = 0;
    this.x_velocity = 5;
    this.friction = 0.5;
    this.frameX = 0;
    this.frameY = 0;
    this.maxY_velocity = 18 * this.gameSettings.gameSpeed;
    this.minY_velocity = 5;
    this.speed = 10;
    this.jumpHeight = this.gravity * 35;
    this.acceleration = 3;
    this.image = new Image();
    this.image.src = "./Cat-Sheet_1.png";
    this.animationSpeed = Math.floor(4 / this.gameSettings.gameSpeed);
    this.frameCount = 0;
    this.currentAnimation = "walk";
  }

  update(dt) {
    this.animate();
    this.animationSpeed = Math.floor(4 / this.gameSettings.gameSpeed);
    this.y_velocity += this.gravity;
    if (this.y_velocity > this.maxY_velocity) {
      this.y_velocity = this.maxY_velocity;
    }
    this.isGround();
    this.isButterflyHit();
    if (InputController.KEYS.space) {
      this.jump();
    }

    this.collisionArea.y += this.y_velocity;
    this.y = this.collisionArea.y - 63

    if (this.y > this.gameSettings.height) {
      this.game.gameSettings.lives--;
      this.collisionArea.y = 300;
    }
  }

  animate = () => {
    if (this.y_velocity > this.gravity) {
      this.currentAnimation = "fall";
    }
    if (this.frameX > this.gameSettings.playerAnimation[this.currentAnimation].totalFrames) {
      this.frameX = 0;
    }

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
    InputController.KEYS.space = false;

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
    for (let i = 0; i < this.game.platforms.length; i++) {
      let obstacle = isCollided(this, this.game.platforms[i])
      if (obstacle) {
        this.y_velocity = 0;
        this.collisionArea.y = obstacle.y - this.collisionArea.height
        this.currentAnimation = "walk";
        return true;
      }
    }
    return false;
  }

  isButterflyHit() {
    for (let i = 0; i < this.game.butterflies.length; i++) {
      let obstacle = isCollided(this, this.game.butterflies[i])
      if (obstacle) {
        this.game.butterflies[i].delete = true;
        this.game.gameSettings.score++
        return true;
      }
    }
    return false;
  }

  drawPlayer(ctx) {
    ctx.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      Math.floor(this.x),
      Math.floor(this.y),
      this.scaleWidth,
      this.scaleHeight
    );
  }

  drawCollisionArea(ctx) {
    ctx.beginPath();
    ctx.lineWidth = "4";
    ctx.strokeStyle = "green";
    ctx.rect(this.collisionArea.x, this.collisionArea.y, this.collisionArea.width, this.collisionArea.height);
    ctx.stroke();
    ctx.closePath();
  }

  draw(ctx) {
    this.drawPlayer(ctx);
    if (this.gameSettings.debug) {
      this.drawCollisionArea(ctx);
    }
  }
}
