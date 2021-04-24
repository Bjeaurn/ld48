import { Gine } from 'gine'

import * as level0 from './levels/level0.json'
import * as level1 from './levels/level1.json'

export class Map {
  levels = [level0, level1]
  maxY: number = Math.ceil(Gine.CONFIG.width / Gine.CONFIG.tileSize)
  map: number[]
  entities: any[]
  constructor() {
    this.map = level0.map
    this.entities = level0.entities
  }

  getPosXY(x: number, y: number): number {
    return this.map[x * this.maxY + y]
  }

  loadLevel(level: number) {
    this.map = this.levels[level].map
    this.entities = this.levels[level].entities ?? []
  }
}
