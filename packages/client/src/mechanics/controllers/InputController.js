export class InputController {
  static {
    this.KEYS = {
      space: false,
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
      }
    });
    window.addEventListener("keyup", (e) => {
      switch (e.code) {
        case "Space":
          InputController.KEYS.space = false;
          break;
      }
    });
  }

  static init() {
    new this();
  }
}
