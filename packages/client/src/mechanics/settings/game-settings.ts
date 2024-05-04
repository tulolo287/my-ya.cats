import { TGameSettings } from '../types'

const gameSettings: TGameSettings = {
  width: 1920,
  height: 1080,
  debug: false,
  gameSpeed: 40,
  walkSpeed: 40,
  runSpeed: 60,
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
  obstacle: {
    mushroom: {
      chanseAppearing: 0.7,
      additionalY: 20,
      minPlatformWidth: 250,
    },
    heart: {
      chanseAppearing: 0.9,
      additionalY: 10,
    },
  },
}

export default gameSettings
