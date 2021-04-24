import { Gine, ImageAsset, KEYCODES } from 'gine'

export class Player {
  image: ImageAsset
  x: number = 50
  y: number = 50
  speed = 0.4
  constructor() {
    this.image = Gine.store.get("dwarf")
  }

  draw() {
    Gine.handle.draw(this.image, this.x, this.y)
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
  }
}
