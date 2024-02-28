export class InputController {
  static KEYS: { jump: boolean; run: boolean }
  static _instance: InputController | undefined

  static {
    InputController.KEYS = {
      jump: false,
      run: false,
    }
  }
  constructor() {
    if (InputController._instance) {
      return InputController._instance
    }
    InputController._instance = this

    window.addEventListener('keydown', InputController.keyDown)
    window.addEventListener('keyup', InputController.keyUp)
  }

  static keyDown(e: KeyboardEvent): void {
    switch (e.code) {
      case 'Space': {
        if (!e.repeat) {
          InputController.KEYS.jump = true
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
  }

  static keyUp(e: KeyboardEvent): void {
    switch (e.code) {
      case 'Space': {
        InputController.KEYS.jump = false
        break
      }
      case 'KeyR':
      case 'ArrowUp': {
        InputController.KEYS.run = false
        break
      }
    }
  }

  static init() {
    new this()
  }

  static removeEvents() {
    window.removeEventListener('keydown', InputController.keyDown)
    window.removeEventListener('keyup', InputController.keyUp)
  }
}
