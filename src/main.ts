import { Config, DEFAULT_CONFIG, Gine, IConfigArguments, SpriteOptions } from 'gine'

import { MainScene } from './scenes/main'

const cfg: Config = new Config(
  document.querySelector("#game") as HTMLCanvasElement,
  Object.assign(DEFAULT_CONFIG, {
    width: 300,
    height: 200,
    tileSize: 32,
  } as IConfigArguments)
)
const game = new Gine(cfg)
Gine.handle.handle.imageSmoothingEnabled = false

Gine.store.image("dwarf", "dwarf.png", {})
Gine.store.image("dwarf-2", "dwarf-2.png", {})
Gine.store.sprite("world", "world.png", new SpriteOptions(32, 32, 5, 3))
Gine.store.image("rock", "rock.png")
Gine.store.image("ladder-up", "ladder-up.png")
Gine.store.image("ladder-down", "ladder-down.png")
Gine.store.image("dialog", "dialog.png")
const mainScene = new MainScene()
game.changeScene(mainScene)
Gine.keyboard.key$.subscribe()

game.start()
