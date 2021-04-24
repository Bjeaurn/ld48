import { Gine, ImageAsset, KEYCODES } from 'gine'

export class Player {
  image: ImageAsset
  x: number = 144
  y: number = 50
  speed = 0.4
  constructor() {
    this.image = Gine.store.get("dwarf")
  }

  getTilePosition(): { x: number; y: number } {
    return {
      x: Math.floor(this.x / Gine.CONFIG.tileSize),
      y: Math.floor(this.y / Gine.CONFIG.tileSize),
    }
  }

  isPlayerOnTile(x: number, y: number): boolean {
    const pos = this.getTilePosition()
    return x === pos.x && y === pos.y
  }

  draw() {
    Gine.handle.draw(
      this.image,
      this.x - Gine.CONFIG.tileSize / 2,
      this.y - Gine.CONFIG.tileSize / 2
    )
  }

  tick(deltaTime: number) {
    this.handleKeyboard(deltaTime)
  }

  handleKeyboard(deltaTime: number) {
    const vector = { x: 0, y: 0 }
    if (Gine.keyboard.allPressed()[KEYCODES.D]) {
      vector.x += this.speed
    }
    if (Gine.keyboard.allPressed()[KEYCODES.A]) {
      vector.x -= this.speed
    }
    if (Gine.keyboard.allPressed()[KEYCODES.W]) {
      vector.y -= this.speed
    }
    if (Gine.keyboard.allPressed()[KEYCODES.S]) {
      vector.y += this.speed
    }

    this.x += vector.x
    this.y += vector.y
    if (this.x < 0) this.x = 0
    if (this.x > Gine.CONFIG.width) this.x = Gine.CONFIG.width
    if (this.y < 0) this.y = 0
    if (this.y > Gine.CONFIG.height) this.y = Gine.CONFIG.height
  }
}
