import { TGameSettings } from '../types'

const gameSettings: TGameSettings = {
  width: 1600,
  height: 900,
  debug: false,
  gameSpeed: 0.9,
  walkSpeed: 0.9,
  runSpeed: 1.3,
  gameOver: false,
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
