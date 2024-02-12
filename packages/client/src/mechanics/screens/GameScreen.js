
export class GameScreen {
  constructor(gameSettings) {
    this.width = gameSettings.width;
    this.height = gameSettings.height;

    this.gameSettings = gameSettings;

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
    ctx.drawImage(this.bg1, Math.floor(this.bg1_x), 0, this.width, this.height);
    ctx.drawImage(this.bg1, Math.floor(this.bg1_2_x), 0, this.width, this.height);
    ctx.drawImage(this.bg2, Math.floor(this.bg2_x), 0, this.width, this.height);
    ctx.drawImage(this.bg2, Math.floor(this.bg2_2_x), 0, this.width, this.height);
    ctx.drawImage(this.bg3, Math.floor(this.bg3_x), 0, this.width, this.height);
    ctx.drawImage(this.bg3, Math.floor(this.bg3_2_x), 0, this.width, this.height);
  }

  update() {
    this.bg1_x -= this.bg1_xv * this.gameSettings.gameSpeed;
    this.bg2_x -= this.bg2_xv * this.gameSettings.gameSpeed;
    this.bg3_x -= this.bg3_xv * this.gameSettings.gameSpeed;

    this.bg1_2_x -= this.bg1_xv * this.gameSettings.gameSpeed;
    this.bg2_2_x -= this.bg2_xv * this.gameSettings.gameSpeed;
    this.bg3_2_x -= this.bg3_xv * this.gameSettings.gameSpeed;

    if (this.bg1_x <= -this.width) {
      this.bg1_x = this.width - (this.bg1_2_x * -1);
    }
    if (this.bg1_2_x <= -this.width) {
      this.bg1_2_x = this.width - (this.bg1_x * -1);
    }
    if (this.bg2_x <= -this.width) {
      this.bg2_x = this.width - (this.bg2_2_x * -1);
    }
    if (this.bg2_2_x <= -this.width) {
      this.bg2_2_x = this.width - (this.bg2_x * -1);
    }
    if (this.bg3_x <= -this.width) {
      this.bg3_x = this.width - (this.bg3_2_x * -1);
    }
    if (this.bg3_2_x <= -this.width) {
      this.bg3_2_x = this.width - (this.bg3_x * -1);
    }
  }
}
