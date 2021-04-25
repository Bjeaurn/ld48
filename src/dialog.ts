import { Gine, ImageAsset } from 'gine'

export class Dialog {
  static dialogs: Dialog[] = []
  static drawAll() {
    this.dialogs.forEach((d) => d.draw())
  }
  static tickAll(dt: number) {
    this.dialogs.forEach((d) => d.tick(dt))
  }

  private width: number
  private x: number
  private y: number
  private id: number = 0
  private image: ImageAsset
  constructor(
    public message: string = "",
    public duration: number = 6,
    overwriteX?: number,
    overwriteY?: number
  ) {
    // this.image = Gine.store.get("dialog")
    this.width = Gine.handle.handle.measureText(this.message).width
    if (overwriteY) {
      this.y = overwriteY
    } else {
      this.y = Gine.CONFIG.height / 2
    }
    if (overwriteX) {
      this.x = overwriteX
    } else {
      this.x = (Gine.CONFIG.width - this.width) / 2
    }
    Dialog.dialogs.push(this)
  }

  draw() {
    // Gine.handle.draw(this.image, this.x - 60, this.y - 40)
    Gine.handle.setColor(255, 255, 255)
    Gine.handle.text(this.message, this.x, this.y)
  }

  tick(dt: number) {
    this.duration -= dt
    if (this.duration <= 0) {
      this.delete()
    }
  }

  delete() {
    Dialog.dialogs.splice(
      Dialog.dialogs.findIndex((a) => a.id === this.id),
      1
    )
  }
}
