export class Screen {

  constructor(width, height) {
    Screen.canvas = document.getElementById("canvas");
    Screen.ctx = canvas.getContext("2d");
    Screen.canvas.width = width;
    Screen.canvas.height = height;
  }
}
