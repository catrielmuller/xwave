import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {}

  create () {
    this.game.add.tileSprite(0, 0, 1280, 720, 'versus');
    setTimeout(() => {
      this.state.start('Game')
    }, 2000)
  }

}
