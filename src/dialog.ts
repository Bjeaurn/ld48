import { Gine } from 'gine'

export class Dialog {
  static dialogs: Dialog[] = []
  static drawAll() {
    this.dialogs.forEach((d) => d.draw())
  }
  static tickAll(dt: number) {
    this.dialogs.forEach((d) => d.tick(dt))
  }

  private width: number
  private id: number = 0
  constructor(public message: string = "", public duration: number = 6) {
    this.width = Gine.handle.handle.measureText(this.message).width
    Dialog.dialogs.push(this)
  }

  draw() {
    Gine.handle.text(
      this.message,
      20,
      //   (Gine.CONFIG.width - this.width) / 2,
      Gine.CONFIG.height - 4
    )
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
