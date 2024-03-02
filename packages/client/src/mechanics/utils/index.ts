import { Entity } from '../entities/entity'
import { IPlayer } from '../entities/player'

export function isCollided<T extends Entity>(
  player: IPlayer,
  obstacle: T
): T | false {
  if (
    player.collisionArea.x + player.collisionArea.width < obstacle.x ||
    player.collisionArea.x > obstacle.x + obstacle.width ||
    player.collisionArea.y + player.collisionArea.height < obstacle.y ||
    player.collisionArea.y > obstacle.y + obstacle.height
  ) {
    return false
  }
  return obstacle
}

export function getRandom(from: number, to: number): number {
  const random =
    from < 0
      ? Math.floor(Math.random() * (to + 1 + -from) - -from)
      : Math.floor(Math.random() * (to + 1 - from) + from)
  return random
}
