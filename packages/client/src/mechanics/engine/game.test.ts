import { Game } from './game'
import { InputController } from '@mechanics/controllers/input-controller'

describe('Game', () => {
  const canvasRef = { current: document.createElement('canvas') }
  const handleEnd = jest.fn()
  const handleScore = jest.fn()
  let game: Game

  beforeEach(() => {
    game = new Game({ canvasRef, handleEnd, handleScore })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Игра инициализируется корректно', () => {
    test('canvas должен быть инстансом HTMLCanvasElement', () => {
      expect(game.canvas).toBeInstanceOf(HTMLCanvasElement)
    })

    test('context должен быть инстансом CanvasRenderingContext2D', () => {
      expect(game.context).toBeInstanceOf(CanvasRenderingContext2D)
    })

    test('gameScreen должен быть инстансом GameScreen', () => {
      expect(game.context).toBeInstanceOf(CanvasRenderingContext2D)
    })
  })

  describe('destroy', () => {
    test('destroy должен вызвать window.cancelAnimationFrame()', () => {
      window.cancelAnimationFrame = jest.fn()
      game.destroy()

      expect(window.cancelAnimationFrame).toHaveBeenCalledWith(game.loopId)
    })

    test('destroy должен вызвать removeEvents', () => {
      InputController.removeEvents = jest.fn()
      game.destroy()

      expect(InputController.removeEvents).toHaveBeenCalled()
    })
  })

  describe('gameover', () => {
    test('gameover должен вызвать handleScore со счетом', () => {
      game.gameScreen.player.score = 50
      game.gameScreen.gameOver = true
      game.start()

      expect(game.handleScore).toHaveBeenCalledWith(50)
    })

    test('gameover должен вызвать handleEnd', () => {
      game.gameScreen.gameOver = true
      game.start()

      expect(game.handleEnd).toHaveBeenCalled()
    })
  })

  describe('Старт игры', () => {
    test('start должен вызывать window.requestAnimationFrame', () => {
      const spy = jest.spyOn(window, 'requestAnimationFrame')
      game.start()

      expect(spy).toHaveBeenCalled()
    })

    test('loopId должен меняться', () => {
      game.loopId = 0
      game.start()

      expect(game.loopId).not.toBe(0)
    })
  })
})
