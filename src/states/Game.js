/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player'
import Ball from '../sprites/Ball'
import Indicator from '../sprites/Indicator'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {

    this.game.add.tileSprite(0, 0, 1280, 720, 'bg');

    //Start P2JS
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.bannerText = 'X-Wave'
    this.banner = this.add.text(this.world.centerX, 40, this.bannerText)
    this.banner.font = 'Bangers'
    this.banner.padding.set(10, 16)
    this.banner.fontSize = 80
    this.banner.fill = '#77BFA3'
    this.banner.smoothed = false
    this.banner.anchor.setTo(0.5)

    console.log(this.world.centerX - 550)
    console.log(this.world.centerX + 550)

    this.playerone = new Player({
      game: this,
      x: this.world.centerX - 550,
      y: this.world.centerY,
      keys: [this.game.input.keyboard.addKey(Phaser.Keyboard.A),
            this.game.input.keyboard.addKey(Phaser.Keyboard.Z),
            this.game.input.keyboard.addKey(Phaser.Keyboard.X)],
      name: 'one'
    })

    this.playertwo = new Player({
        game: this,
        x: this.world.centerX + 550,
        y: this.world.centerY,
        keys: [this.game.input.keyboard.addKey(Phaser.Keyboard.UP),
          this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
          this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT)],
      name: 'two'
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

    this.mainBar = this.game.add.graphics(0, 0);
    this.mainBarData = this.game.math.sinCosGenerator(1280, 40, 1, 10)
    this.mainBar.lineStyle(5, 0xcdcdcd, 1);
    this.mainBar.moveTo(0, 660 + this.mainBarData.sin[0])

    for (let i = 0; i < this.mainBarData.sin.length; i++) {
      this.mainBar.lineTo(i, 660 + this.mainBarData.sin[i]);
    }

    this.indicator = new Indicator({
      game: this,
      x: 0,
      y: 650 + this.mainBarData.sin[0]
    })
    this.game.add.existing(this.indicator)
    this.i = 0
    this.idown = false

    this.score = []
    this.score['One'] = 0
    this.score['Two'] = 0
  }

  win(player) {
    this.playerone.locked = false
    this.playertwo.locked = false
    this.score[player]++

    if(this.score[player] >= 10){
      this.state.start('Win'+player)
    }

    this.ball.x = this.world.centerX
    this.ball.y = this.world.centerY

    let plusOrMinus = Math.random() < 0.5 ? -1 : 1
    this.ball.body.velocity.x = 250 * plusOrMinus
    this.ball.body.velocity.y = 250 * plusOrMinus

  }

  ballHit (_ball, _player) {
    if(_player.locked === false){
      _ball.body.velocity.x = 0
      _ball.body.velocity.y = 0
      _ball.y = _player.y
      _player.locked = true
      _player.ball = _ball
    }
  }

  update () {
    if(this.idown === false){
      this.i = this.i + 10
      if(this.i >= this.mainBarData.sin.length){
        this.i = 1279
        this.idown = true
      }
    } else {
      this.i = this.i - 10
      if(this.i <= 0){
        this.i = 0
        this.idown = false
      }
    }

    this.indicator.x = this.i;
    this.indicator.y = 660 + this.mainBarData.sin[this.i];

    this.banner.setText(this.score['One'] + '           ' + this.score['Two'])

    this.game.physics.arcade.collide(this.ball, this.playerone, this.ballHit, null, this);
    this.game.physics.arcade.collide(this.ball, this.playertwo, this.ballHit, null, this);

    if(this.ball.x < this.playerone.x){
      this.win('Two')
    }

    if(this.ball.x > this.playertwo.x){
      this.win('One')
    }
  }



  render () {
    if (__DEV__) {
      //this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  }


}
