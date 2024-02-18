export type TPlayerAnimation = {
  walk: {
    frameY: number
    totalFrames: number
  }
  run: {
    frameY: number
    totalFrames: number
  }
  jump: {
    frameY: number
    totalFrames: number
  }
  fall: {
    frameY: number
    totalFrames: number
  }
}

export type TGameSettings = {
  width: number
  height: number
  debug: boolean
  gameSpeed: number
  walkSpeed: number
  runSpeed: number
  gameOver: boolean
  playerAnimation: TPlayerAnimation
}
