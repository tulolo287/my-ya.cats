import { InputController } from "../controllers/InputController";
import { Butterfly } from "../entities/Butterfly";
import { Platform } from "../entities/Platform";
import { Player } from "../entities/Player";
import { Background } from "../system/Background";
import { Sound } from "../system/Sound";

export class GameScreen {
  constructor(game) {
    this.game = game;
    this.gameSettings = game.gameSettings;
    this.width = this.gameSettings.width;
    this.height = this.gameSettings.height;
    //this.sound = new Sound('./sound/jump.mp3');
    this.bg1_xv = 2
    this.bg2_xv = 3
    this.bg3_xv = 5;
    this.init();
  }

  init() {
    this.player = new Player(this)
    this.platforms = new Array();
    this.butterflies = new Array();
    this.parallaxBg = new Array();

    let bg1 = new Background(0, 0, this.width, this.height, "./background_layer_1.png", this.bg1_xv)
    let bg2 = new Background(0, 0, this.width, this.height, "./background_layer_2.png", this.bg2_xv)
    let bg3 = new Background(0, 0, this.width, this.height, "./background_layer_3.png", this.bg3_xv)
    this.parallaxBg.push(bg1, bg2, bg3)

    let platform1 = new Platform(this.player.x, this.gameSettings.height - 50, 500, 40, 500, 40, "./platform.png")
    this.platforms.push(platform1);
    this.createPlatforms(7)
  }

  draw(ctx) {
    this.parallaxBg.forEach(bg => {
      bg.draw(ctx);
    })
    this.drawUI(ctx);

    this.platforms.forEach(platform => {
      platform.draw(ctx)
    })
    this.butterflies.forEach(butterfly => {
      butterfly.draw(ctx)
    })
    this.player.draw(ctx)

    if (this.player.lives < 1) {
      this.gameOver(ctx)
    }
  }

  update(dt) {
    this.parallaxBg.forEach(bg => {
      bg.update(this.gameSettings.gameSpeed)
    })
    if (InputController.KEYS.space && this.game.gameOver) {
      window.clearInterval(this.speedChangeIntervalID)
      this.game.init()
      InputController.KEYS.space = false
    }
    if (InputController.KEYS.run) {
      this.gameSettings.gameSpeed = 1.3
    } else this.gameSettings.gameSpeed = .7

    this.platforms.forEach((platform, idx) => {
      if (platform.delete) {
        this.platforms.splice(idx, 1)
      }
      platform.update(Math.floor(this.bg3_xv * this.gameSettings.gameSpeed))
    })
    this.player.update(dt)
    if (this.platforms.length < 7) {
      this.createPlatforms(7)
    }
    this.butterflies.forEach((butterfly, idx) => {
      if (butterfly.delete) {
        this.butterflies.splice(idx, 1)
      }
      butterfly.update()
    })
  }

  drawUI(ctx) {
    ctx.font = "24px serif"
    ctx.strokeStyle = "yellow";
    ctx.strokeText("LIVES: " + this.player.lives, 20, 50)
    ctx.textBaseline = 'middle';
    let textString = "SCORE: 1",
      textWidth = ctx.measureText(textString).width;
    ctx.strokeText("SCORE: " + this.player.score, this.gameSettings.width / 2 - textWidth / 2, 50)
  }

  gameOver(ctx) {
    ctx.font = "60px serif"
    ctx.fillStyle = "red";
    let textString = "GAME OVER",
      textWidth = ctx.measureText(textString).width;
    ctx.fillText("GAME OVER", this.gameSettings.width / 2 - textWidth / 2, this.gameSettings.height / 2 - 50)

    ctx.font = "48px serif"
    ctx.fillStyle = "white";
    textString = "To start again press SPACE",
      textWidth = ctx.measureText(textString).width;
    ctx.fillText("To start again press SPACE", this.gameSettings.width / 2 - textWidth / 2, this.gameSettings.height / 2 + 50)

    this.game.gameOver = true
  }

  createPlatforms(qty) {
    let dir = 0;
    for (let i = 0; i < qty; i++) {
      let x, y;
      let lastPlatform = this.platforms[this.platforms.length - 1];
      let diff = Math.floor(Math.random() * 170 + 10);
      let up = lastPlatform.y >= this.gameSettings.height - 50 - diff ? true : false;
      let down = lastPlatform.y <= 400 ? true : false;

      if (up) {
        dir = -1
      } else if (down) {
        dir = 1
      } else {
        dir = (Math.random() < .5) ? 1 : -1
      }

      y = lastPlatform.y + (diff * dir);
      x = lastPlatform.x + lastPlatform.width + Math.floor(Math.random() * 280);
      let width = Math.random() * 400 + 100

      this.platforms.push(new Platform(x, y, width, 45, 500, 45, "./platform.png"))
      if (this.platforms[i].x > this.gameSettings.width) {
        this.createButterfly(this.platforms[i]);
      }
    }
  }

  createButterfly(platform) {
    let x = platform.x //Math.floor(Math.random() * (platform.x + platform.width - platform.x) + platform.x);
    let y = Math.floor(Math.random() * (platform.y - 100 - 400) + 400);
    this.butterflies.push(new Butterfly(x, y, 50, 50, 50, 50, "./butterfly.png"))
  }
}
