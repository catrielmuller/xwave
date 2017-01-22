import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {}

  create () {
    this.game.add.tileSprite(0, 0, 1280, 720, 'start');
    this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
  }

  update () {
    if (this.space.isDown)
    {
      this.state.start('Versus')
    }
  }

}
