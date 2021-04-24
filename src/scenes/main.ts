import { Scene } from 'gine'

import { Map } from './../map'
import { Player } from './../player'
import { World } from './../world'

export class MainScene extends Scene {
  player: Player = new Player()
  map: Map = new Map()
  world: World = new World(this.map)
  constructor() {
    super()
    this.world.init()
  }

  frame() {
    this.world.draw()
    this.player.draw()
  }

  tick(deltaTime: number) {
    this.player.tick(deltaTime)
  }
}
