import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    this.load.image('bg', 'assets/images/bg.jpg')
    this.load.image('start', 'assets/images/start.jpg')
    this.load.image('versus', 'assets/images/versus.png')
    this.load.image('winone', 'assets/images/winone.jpg')
    this.load.image('wintwo', 'assets/images/wintwo.jpg')
    this.load.image('pone', 'assets/images/pone.png')
    this.load.image('ptwo', 'assets/images/ptwo.png')
    this.load.image('ball', 'assets/images/ball.png')
    this.load.image('pad', 'assets/images/pad.png')
    this.load.image('indicator', 'assets/images/indicator.png')

    this.load.audio('main', ['assets/music/music.ogg']);

  }

  create () {
    this.music = this.game.add.audio('main');
    this.music.loop = true;
    this.music.play();
    this.state.start('Start')
  }

}
