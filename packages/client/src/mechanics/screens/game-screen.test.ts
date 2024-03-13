import { Game } from '@mechanics/engine/game'
import { GameScreen } from './game-screen'
import { Player } from '@mechanics/entities/player'
import { InputController } from '@mechanics/controllers/input-controller'
import { Background } from '@mechanics/system/background'
import { Platform } from '@mechanics/entities/platform'
import { Butterfly } from '@mechanics/entities/butterfly'
import { Particles } from '@mechanics/system/particles'

describe('GameScreen', () => {
  const mockCanvas = document.createElement('canvas')
  const mockContext = mockCanvas.getContext('2d')
  const canvasRef = { current: mockCanvas }
  const handleEnd = jest.fn()
  const handleScore = jest.fn()
  let game: Game
  let gameScreen: GameScreen

  beforeEach(() => {
    game = new Game({ canvasRef, handleEnd, handleScore })
    gameScreen = new GameScreen(game)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('player должен быть инстансом Player', () => {
    expect(gameScreen.player).toBeInstanceOf(Player)
  })

  test('draw устанавливает конец игры если у player кончились жизни', () => {
    gameScreen.player.lives = 0

    gameScreen.draw(mockContext!)

    expect(gameScreen.gameOver).toBeTruthy()
    expect(InputController.KEYS.run).toBeFalsy()
  })

  test('draw должен отрисовывать все игровые элементы', () => {
    const getBackground = () => new Background(0, 0, 0, 0, '', 0)
    const getPlatform = () => new Platform(0, 0, 0, 0, 0, 0, '')
    const getButterfly = () => new Butterfly(0, 0, 0, 0, 0, 0, '')
    const getParticle = () => new Particles(0, 0, 0)

    Background.prototype.draw = jest.fn()
    Platform.prototype.draw = jest.fn()
    Butterfly.prototype.draw = jest.fn()
    Player.prototype.draw = jest.fn()
    Particles.prototype.draw = jest.fn()
    gameScreen['drawUI'] = jest.fn()

    gameScreen.parallaxBg = [getBackground(), getBackground()]
    gameScreen.platforms = [getPlatform(), getPlatform(), getPlatform()]
    gameScreen.butterflies = [getButterfly(), getButterfly()]
    gameScreen.butterflyParticles = [
      getParticle(),
      getParticle(),
      getParticle(),
    ]

    gameScreen.draw(mockContext!)

    gameScreen.parallaxBg.forEach(() => {
      expect(Background.prototype.draw).toHaveBeenCalledWith(mockContext)
    })

    gameScreen.platforms.forEach(() => {
      expect(Platform.prototype.draw).toHaveBeenCalledWith(mockContext)
    })

    gameScreen.butterflies.forEach(() => {
      expect(Butterfly.prototype.draw).toHaveBeenCalledWith(mockContext)
    })

    expect(Player.prototype.draw).toHaveBeenCalledWith(mockContext)

    gameScreen.butterflyParticles.forEach(() => {
      expect(Particles.prototype.draw).toHaveBeenCalledWith(mockContext)
    })

    expect(gameScreen['drawUI']).toHaveBeenCalledWith(mockContext)
  })

  test('update должен обновлять платформы', () => {
    const initialPlatformCount = gameScreen.platforms.length

    gameScreen.update(16)

    expect(gameScreen.platforms.length).toBeGreaterThan(initialPlatformCount)
  })

  test('createPlatforms должен создавать указанное количество платформ', () => {
    const initialPlatformCount = gameScreen.platforms.length

    gameScreen['createPlatforms'](5)

    expect(gameScreen.platforms.length).toBe(initialPlatformCount + 5)

    for (const platform of gameScreen.platforms) {
      expect(platform).toBeInstanceOf(Platform)
    }
  })

  test('createButterfly должен был вызван для каждой платформы, которая выходит за пределы ширины игрового экрана', () => {
    gameScreen['createButterfly'] = jest.fn()

    gameScreen['createPlatforms'](8)

    for (const platform of gameScreen.platforms) {
      if (platform.x > gameScreen.width) {
        expect(gameScreen['createButterfly']).toHaveBeenCalledWith(platform)
      }
    }
  })
})
