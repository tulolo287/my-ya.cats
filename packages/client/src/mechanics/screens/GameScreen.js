
export class GameScreen {
  constructor(game) {
    this.game = game;
    this.gameSettings = game.gameSettings;

    this.width = this.gameSettings.width;
    this.height = this.gameSettings.height;

    this.score = this.gameSettings.score;
    this.lives = this.gameSettings.lives

    this.bg1_x = 0;
    this.bg2_x = 0;
    this.bg3_x = 0;

    this.bg1_2_x = this.width;
    this.bg2_2_x = this.width;
    this.bg3_2_x = this.width;

    this.bg1_xv = 1
    this.bg2_xv = 2
    this.bg3_xv = 4;

    this.bg1 = new Image();
    this.bg2 = new Image();
    this.bg3 = new Image();

    this.init();
  }

  init() {
    this.bg1.src = "./background_layer_1.png";
    this.bg2.src = "./background_layer_2.png";
    this.bg3.src = "./background_layer_3.png";
  }

  draw(ctx) {
    ctx.drawImage(this.bg1, this.bg1_x, 0, this.width, this.height);
    ctx.drawImage(this.bg1, this.bg1_2_x, 0, this.width, this.height);
    ctx.drawImage(this.bg2, this.bg2_x, 0, this.width, this.height);
    ctx.drawImage(this.bg2, this.bg2_2_x, 0, this.width, this.height);
    ctx.drawImage(this.bg3, this.bg3_x, 0, this.width, this.height);
    ctx.drawImage(this.bg3, this.bg3_2_x, 0, this.width, this.height);
    
    this.drawUI(ctx);

    if(this.game.gameOver) {
      this.gameOver(ctx)
    }
  }

  update(dt) {
    let offset1 = Math.floor(this.bg1_xv * this.gameSettings.gameSpeed);
    let offset2 = Math.floor(this.bg2_xv * this.gameSettings.gameSpeed);
    let offset3 = Math.floor(this.bg3_xv * this.gameSettings.gameSpeed);

    this.bg1_x -= offset1
    this.bg2_x -= offset2
    this.bg3_x -= offset3

    this.bg1_2_x -= offset1
    this.bg2_2_x -= offset2
    this.bg3_2_x -= offset3

    if (this.bg1_x <= -this.width) {
      this.bg1_x = 0
      this.bg1_2_x = this.width
    }
    if (this.bg2_x <= -this.width) {
      this.bg2_x = 0
      this.bg2_2_x = this.width
    }
    if (this.bg3_x <= -this.width) {
      this.bg3_x = 0
      this.bg3_2_x = this.width
    }
  }

  drawUI(ctx) {
    ctx.font = "24px serif"
    ctx.strokeStyle = "yellow";
    ctx.strokeText("LIVES: " + this.gameSettings.lives, 20, 50)
    ctx.strokeText("SCORE: " + this.gameSettings.score, this.gameSettings.width / 2 - 30, 50)
  }

  gameOver(ctx) {
    ctx.font = "60px serif"
    ctx.fillStyle = "red";
    ctx.fillText("GAME OVER", this.gameSettings.width / 2 - 160, this.gameSettings.height / 2)
    //ctx.strokeText("SCORE: " + this.gameSettings.score, this.gameSettings.width / 2 - 30, 50)
  }

}
