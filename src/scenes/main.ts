import { Gine, Scene } from 'gine'
import { filter, map, tap } from 'rxjs/operators'

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

    Gine.mouse.mouse$
      .pipe(
        filter((a) => a.type === "mousedown"),
        tap((a) => {
          if (a.button === 1) {
            this.map.entities = this.map.entities.filter(
              (b) =>
                b.x !== Math.floor(a.x / Gine.CONFIG.tileSize) ||
                b.y !== Math.floor(a.y / Gine.CONFIG.tileSize)
            )
          } else {
            this.map.entities.push({
              x: Math.floor(a.x / Gine.CONFIG.tileSize),
              y: Math.floor(a.y / Gine.CONFIG.tileSize),
              type: a.button === 0 ? "rock" : "ladder-down",
            })
          }
        })
      )
      .subscribe()

    Gine.keyboard.key$
      .pipe(
        filter((a) => a.type === "keyup"),
        filter((a) => a.key === "z"),
        tap(() => console.log(JSON.stringify(this.map.entities)))
      )
      .subscribe()
  }

  switchLevel(level: number = 0) {
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

  frame() {
    this.world.draw()
    this.player.draw()
  }

  second() {
    console.log(this.player.getTilePosition(), this.player.x, this.player.y)
    // console.log({ x: 3 * 32, y: 4 * 32, xw: 3 * 32 + 32, yh: 4 * 32 + 32 })
    // console.log(this.player.isColliding)
  }

  tick(deltaTime: number) {
    this.checkEntities()
    this.player.tick(deltaTime)
  }
}
