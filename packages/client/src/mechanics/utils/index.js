export function isCollided(player, obstacle) {
   if (player.collisionArea.x + player.collisionArea.width < obstacle.x
      || player.collisionArea.x > obstacle.x + obstacle.width
      || player.collisionArea.y + player.collisionArea.height < obstacle.y
      || player.collisionArea.y > obstacle.y + obstacle.height) {
      return false;
   }
   return obstacle;
}
