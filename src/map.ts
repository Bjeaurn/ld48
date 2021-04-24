import { Gine } from 'gine'

import * as level0 from './levels/level0.json'
import * as level1 from './levels/level1.json'
import * as level2 from './levels/level2.json'
import * as level3 from './levels/level3.json'
import * as level4 from './levels/level4.json'
import * as level5 from './levels/level5.json'
import * as level6 from './levels/level6.json'
import * as level7 from './levels/level7.json'

export class Map {
  levels = [level0, level1, level2, level3, level4, level5, level6, level7]
  maxY: number = Math.ceil(Gine.CONFIG.width / Gine.CONFIG.tileSize)
  map: number[]
  entities: any[]
  constructor() {
    this.loadLevel(4)
  }

  getPosXY(x: number, y: number): number {
    return this.map[x * this.maxY + y]
  }

  loadLevel(level: number) {
    this.map = this.levels[level].map
    this.entities = this.levels[level].entities ?? []
  }
}
