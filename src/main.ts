import { Config, DEFAULT_CONFIG, Gine, IConfigArguments } from 'gine'

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

Gine.store.image("dwarf", "assets/dwarf.png", {})

console.log(Gine.store.getImage("dwarf"))
const mainScene = new MainScene()
game.changeScene(mainScene)
game.start()
