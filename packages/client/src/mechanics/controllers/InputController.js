export class InputController {
  static {
    this.KEYS = {
      space: false,
      run: false,
    };
  }
  constructor() {
    if (InputController._instance) {
      return this;
    }
    InputController._instance = this;

    window.addEventListener("keydown", (e) => {
      switch (e.code) {
        case "Space":
          if (!e.repeat) {
            InputController.KEYS.space = true;
          }
          break;
        case "KeyR":
        case "ArrowUp":
          if (!e.repeat) {
            InputController.KEYS.run = true;
          }
          break;
      }
    });
    window.addEventListener("keyup", (e) => {
      switch (e.code) {
        case "Space":
          InputController.KEYS.space = false;
          break;
        case "KeyR":
        case "ArrowUp":
          InputController.KEYS.run = false;
          break;
      }
    });
  }

  static init() {
    new this();
  }
}
