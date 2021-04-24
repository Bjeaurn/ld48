import { Gine, Scene } from 'gine'

import { Map } from './../map'
import { Player } from './../player'
import { World } from './../world'

const hole = { x: 4, y: 5 }
export class MainScene extends Scene {
  isColliding = false
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
      this.map.loadLevel(1)
    }
    this.world = new World(this.map)
  }

  checkEntities() {
    this.player.resetCollision()
    const tileSize = Gine.CONFIG.tileSize
    const pos = { x: this.player.x, y: this.player.y }
    this.map.entities.forEach((e) => {
      if (e.goTo && this.player.isPlayerOnTile(e.x, e.y)) {
        this.switchLevel(e.goTo)
      }
      if (e.type === "rock") {
        if (e.x * tileSize + tileSize >= pos.x)
          this.player.isColliding[3] = true // left
        if (e.x * tileSize <= pos.x) this.player.isColliding[1] = true // right
        if (e.y * tileSize <= pos.y) this.player.isColliding[0] = true // top
        if (e.y * tileSize + tileSize >= pos.y)
          this.player.isColliding[2] = true // bottom
      }
    })
  }

  frame() {
    this.world.draw()
    this.player.draw()
  }

  second() {
    // console.log(this.player.getTilePosition())
    // console.log(this.player.x, this.player.y)
    // console.log(this.player.isColliding)
  }

  tick(deltaTime: number) {
    this.player.tick(deltaTime)
    this.checkEntities()
  }
}
