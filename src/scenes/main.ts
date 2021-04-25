import { Gine, Scene } from 'gine'
import { map } from 'rxjs/operators'

import { Dialog } from '../dialog'
import { Map } from './../map'
import { Player } from './../player'
import { World } from './../world'

const hole = { x: 4, y: 5 }
export class MainScene extends Scene {
  isColliding = false
  player: Player = new Player()
  map: Map = new Map()
  world: World = new World(this.map)
  bestLevel: number = 0
  constructor() {
    super()
    this.world.init()

    new Dialog("We lost contact with a team of miners.", 6, 20)
    new Dialog("You need to find them!", 9, 20, Gine.CONFIG.height / 2 + 20)
  }

  switchLevel(level: number = 0) {
    if (level === 10 && this.bestLevel < 10) {
      this.bestLevel = 10
      new Dialog("Oh you found us!", 7, 40, 95)
      new Dialog("Our batteries died, can you show us the way?", 9, 30, 115)
    }
    if (level === 0 && this.bestLevel === 10) {
      new Dialog("Well done! You deserve a promotion!", 8, 40, 115)
      this.endGame()
    }
    if (level > this.bestLevel) {
      this.bestLevel = level
    }
    this.map.loadLevel(level)
    this.world = new World(this.map)
  }

  checkEntities() {
    this.player.resetCollision()
    const tileSize = Gine.CONFIG.tileSize
    const pos = {
      x: this.player.x - this.player.width / 2,
      y: this.player.y - this.player.height / 2,
      w: this.player.width,
      h: this.player.height,
    }
    this.map.entities.forEach((e) => {
      if (e.goTo >= 0 && this.player.isPlayerOnTile(e.x, e.y)) {
        if (e.setX >= 0 && e.setY >= 0) {
          this.player.x = e.setX
          this.player.y = e.setY
        }
        this.switchLevel(e.goTo)
      }
      if (e.type === "rock") {
        const data = {
          x: e.x * tileSize,
          y: e.y * tileSize,
          yh: e.y * tileSize + tileSize,
          xw: e.x * tileSize + tileSize,
          cx: e.x * tileSize + tileSize / 2,
          cy: e.y * tileSize + tileSize / 2,
        }
        if (
          pos.x < data.x + tileSize &&
          pos.x + pos.w > data.x &&
          pos.y < data.y + tileSize &&
          pos.y + pos.h > data.y
        ) {
          if (pos.x + pos.w < data.cx) this.player.isColliding[1] = true // right
          if (pos.x > data.cx) this.player.isColliding[3] = true // left
          if (pos.y > data.cy) this.player.isColliding[0] = true // top
          if (pos.y + pos.h < data.cy) this.player.isColliding[2] = true // bottom
        }
      }
    })
  }

  endGame() {
    console.log("gg")
  }

  frame() {
    this.world.draw()
    this.player.draw()
    Dialog.drawAll()
  }

  tick(deltaTime: number) {
    this.checkEntities()
    this.player.tick(deltaTime)
    Dialog.tickAll(deltaTime)
  }
}
