import { Gine } from 'gine'

export class Map {
  maxY: number = Math.ceil(Gine.CONFIG.width / Gine.CONFIG.tileSize)
  map: number[] = [0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  constructor() {}

  getPosXY(x: number, y: number): number {
    return this.map[x * this.maxY + y]
  }
}
