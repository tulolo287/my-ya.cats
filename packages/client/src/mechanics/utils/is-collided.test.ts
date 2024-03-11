import { isCollided } from './index'
import { Game } from '@mechanics/engine/game'
import { GameScreen } from '@mechanics/screens/game-screen'
import { Player } from '@mechanics/entities/player'
import { Butterfly } from '@mechanics/entities/butterfly'

describe('isCollided', () => {
  const canvasRef = { current: document.createElement('canvas') }
  const handleEnd = jest.fn()
  const handleScore = jest.fn()
  let game: Game
  let gameScreen: GameScreen
  let player: Player

  beforeEach(() => {
    game = new Game({ canvasRef, handleEnd, handleScore })
    gameScreen = new GameScreen(game)
    player = new Player(gameScreen)
    player.collisionArea.x = 10
    player.collisionArea.y = 10
    player.collisionArea.width = 10
    player.collisionArea.height = 10
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Должно вернуть false, нет столкновения', () => {
    const obstacle1 = new Butterfly(50, 50, 10, 10, 10, 10, '')
    const result = isCollided(player, obstacle1)
    expect(result).toBe(false)
  })

  test('Должно вернуть obstacle, есть столкновение', () => {
    const obstacle2 = new Butterfly(15, 15, 10, 10, 10, 10, '')
    const result = isCollided(player, obstacle2)
    expect(result).toEqual(obstacle2)
  })
})
