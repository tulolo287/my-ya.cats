import { TGameSettings } from '../types'

const gameSettings: TGameSettings = {
  width: 1920,
  height: 1080,
  debug: false,
  gameSpeed: 1.5,
  walkSpeed: 1.5,
  runSpeed: 2,
  playerAnimation: {
    walk: {
      frameY: 4,
      totalFrames: 7,
    },
    run: {
      frameY: 6,
      totalFrames: 3,
    },
    jump: {
      frameY: 19,
      totalFrames: 3,
    },
    fall: {
      frameY: 20,
      totalFrames: 3,
    },
  },
}

export default gameSettings
