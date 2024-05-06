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
    document
      .querySelector('#canvas')!
      .addEventListener('touchstart', InputController.touchStart)
    document
      .querySelector('#canvas')!
      .addEventListener('touchend', InputController.touchEnd)
  }

  static keyDown(e: KeyboardEvent): void {
    switch (e.code) {
      case 'Space': {
        if (!e.repeat) {
          InputController.KEYS.jump = true
        }
        break
      }
      case 'KeyR': {
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
      case 'KeyR': {
        InputController.KEYS.run = false
        break
      }
    }
  }

  static init() {
    new this()
  }

  static touchStart() {
    InputController.KEYS.jump = true
  }

  static touchEnd() {
    InputController.KEYS.jump = false
  }

  static removeEvents() {
    window.removeEventListener('keydown', InputController.keyDown)
    window.removeEventListener('keyup', InputController.keyUp)
    window.removeEventListener('touchstart', InputController.touchStart)
    window.removeEventListener('touchend', InputController.touchEnd)
  }
}
