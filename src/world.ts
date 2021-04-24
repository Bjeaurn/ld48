import { Gine, SpriteAsset } from 'gine'

import { Map } from './map'

export class World {
  private world: SpriteAsset
  private tilesX: number = Math.ceil(Gine.CONFIG.width / Gine.CONFIG.tileSize)
  private tilesY: number = Math.ceil(Gine.CONFIG.height / Gine.CONFIG.tileSize)
  constructor(private map: Map) {
    this.world = Gine.store.getSprite("world")
    this.world.calculatePerIndex(3)
  }

  init() {}

  draw() {
    for (var i = 0; i < this.tilesX; i++) {
      //   Gine.handle.drawSprite(this.world, i * Gine.CONFIG.tileSize, 0)
      for (var j = 0; j < this.tilesY; j++) {
        const p = this.map.getPosXY(j, i)
        if (p != undefined) {
          this.world.calculatePerIndex(p)
        } else {
          this.world.calculatePerIndex(3)
        }
        Gine.handle.handle.drawImage(
          this.world.image,
          this.world.sourceX,
          this.world.sourceY,
          this.world.sizeX - 1,
          this.world.sizeY,
          i * Gine.CONFIG.tileSize,
          j * Gine.CONFIG.tileSize,
          this.world.sizeX,
          this.world.sizeY
        )
      }
    }
    this.map.entities.forEach((e) => {
      if (e.x == null || e.y == null) {
        return
      }
      let type = e.type
      Gine.handle.draw(
        Gine.store.get(type),
        e.x * Gine.CONFIG.tileSize,
        e.y * Gine.CONFIG.tileSize
      )
    })
  }
}
