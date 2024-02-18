export class InputController {
  static KEYS: { space: boolean; run: boolean }
  private static _instance: InputController

  static {
    InputController.KEYS = {
      space: false,
      run: false,
    }
  }
  constructor() {
    if (InputController._instance) {
      return InputController._instance
    }
    InputController._instance = this

    window.addEventListener('keydown', e => {
      switch (e.code) {
        case 'Space': {
          if (!e.repeat) {
            InputController.KEYS.space = true
          }
          break
        }
        case 'KeyR':
        case 'ArrowUp': {
          if (!e.repeat) {
            InputController.KEYS.run = true
          }
          break
        }
      }
    })
    window.addEventListener('keyup', e => {
      switch (e.code) {
        case 'Space': {
          InputController.KEYS.space = false
          break
        }
        case 'KeyR':
        case 'ArrowUp': {
          InputController.KEYS.run = false
          break
        }
      }
    })
  }

  static init() {
    new this()
  }
}
