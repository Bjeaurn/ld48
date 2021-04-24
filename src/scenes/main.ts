import { Scene } from 'gine'

import { Map } from './../map'
import { Player } from './../player'
import { World } from './../world'

const hole = { x: 4, y: 5 }
export class MainScene extends Scene {
  player: Player = new Player()
  map: Map = new Map()
  world: World = new World(this.map)
  constructor() {
    super()
    this.world.init()
  }

  switchLevel(level: number = 0) {
    this.map = new Map()
    if (level === 1) {
      this.map.map = [3, 3, 3, 3, 3, 3, 3]
    }
    this.world = new World(this.map)
  }

  frame() {
    this.world.draw()
    this.player.draw()
  }

  second() {
    // console.log(this.player.getTilePosition())
    console.log(this.player.x, this.player.y)
  }

  tick(deltaTime: number) {
    this.player.tick(deltaTime)
    if (this.player.isPlayerOnTile(hole.x, hole.y)) {
      this.switchLevel(1)
    }
  }
}
