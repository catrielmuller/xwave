/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player'
import Ball from '../sprites/Ball'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {

    //Start P2JS
    game.physics.startSystem(Phaser.Physics.ARCADE);


    const bannerText = 'X-Wave'
    let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText)
    banner.font = 'Bangers'
    banner.padding.set(10, 16)
    banner.fontSize = 40
    banner.fill = '#77BFA3'
    banner.smoothed = false
    banner.anchor.setTo(0.5)

    this.playerone = new Player({
      game: this,
      x: this.world.centerX - 300,
      y: this.world.centerY,
      keys: [game.input.keyboard.addKey(Phaser.Keyboard.A),
            game.input.keyboard.addKey(Phaser.Keyboard.Z),
            game.input.keyboard.addKey(Phaser.Keyboard.X)]
    })

    this.playertwo = new Player({
        game: this,
        x: this.world.centerX + 300,
        y: this.world.centerY,
        keys: [game.input.keyboard.addKey(Phaser.Keyboard.UP),
          game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
          game.input.keyboard.addKey(Phaser.Keyboard.LEFT)]
    })

    this.ball = new Ball({
        game: this,
        x: this.world.centerX,
        y: this.world.centerY,
        asset: 'ball'
    })

    this.game.physics.enable(this.playerone, Phaser.Physics.ARCADE);
    this.playerone.setGravity()
    this.game.add.existing(this.playerone)

    this.game.physics.enable(this.playertwo, Phaser.Physics.ARCADE);
    this.playertwo.setGravity()
    this.game.add.existing(this.playertwo)

    this.game.physics.enable(this.ball, Phaser.Physics.ARCADE);
    this.ball.setGravity()
    this.game.add.existing(this.ball)
  }

  update () {
    this.game.physics.arcade.collide(this.ball, this.playerone, this.ballHit, null, this);
    this.game.physics.arcade.collide(this.ball, this.playertwo, this.ballHit, null, this);
  }

  ballHit (_ball, _player) {
    var diff = 0;
    if(_ball.sticky){
      _ball.body.velocity.x = 0
      _ball.body.velocity.y = 0
      _ball.y = _player.y
      _player.locked = true;
    } else {
      if (_ball.x < _player.x) {
        diff = _player.x - _ball.x
        console.log()
      } else if (_ball.x > _player.x) {
        diff = _ball.x - _player.x
        _ball.body.velocity.x = (10*diff)
        _ball.body.velocity.y = -100
        _ball.sticky = true
      } else {
        _ball.body.velocity.x = 2 + Math.random() * 8
        _ball.body.velocity.y = -100
        _ball.sticky = true
      }
    }
  }

  render () {
    if (__DEV__) {
      //this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  }


}
