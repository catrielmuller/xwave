import 'pixi'
import 'p2'
import Phaser from 'phaser'

import BootState from './states/Boot'
import SplashState from './states/Splash'
import GameState from './states/Game'
import StartState from './states/Start'
import VersusState from './states/Versus'
import WinOneState from './states/WinOne'
import WinTwoState from './states/WinTwo'

import config from './config'

class Game extends Phaser.Game {

  constructor () {
    const docElement = document.documentElement
    const width = docElement.clientWidth > config.gameWidth ? config.gameWidth : docElement.clientWidth
    const height = docElement.clientHeight > config.gameHeight ? config.gameHeight : docElement.clientHeight

    super(width, height, Phaser.CANVAS, 'content', null)

    this.state.add('Boot', BootState, false)
    this.state.add('Splash', SplashState, false)
    this.state.add('Game', GameState, false)
    this.state.add('Start', StartState, false)
    this.state.add('Versus', VersusState, false)
    this.state.add('WinOne', WinOneState, false)
    this.state.add('WinTwo', WinTwoState, false)


    this.state.start('Boot')
  }
}

window.game = new Game()
