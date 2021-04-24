import { Gine } from 'gine'

import * as level0 from './levels/level0.json'
import * as level1 from './levels/level1.json'
import * as level2 from './levels/level2.json'
import * as level3 from './levels/level3.json'

export class Map {
  levels = [level0, level1, level2, level3]
  maxY: number = Math.ceil(Gine.CONFIG.width / Gine.CONFIG.tileSize)
  map: number[]
  entities: any[]
  constructor() {
    this.loadLevel(3)
  }

  getPosXY(x: number, y: number): number {
    return this.map[x * this.maxY + y]
  }

  loadLevel(level: number) {
    this.map = this.levels[level].map
    this.entities = this.levels[level].entities ?? []
  }
}
