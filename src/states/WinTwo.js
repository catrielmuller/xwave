import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {}

  create () {
    this.game.add.tileSprite(0, 0, 1280, 720, 'wintwo');
    setTimeout(() => {
      this.state.start('Start')
    }, 2000)
  }

}
