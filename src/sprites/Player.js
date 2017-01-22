import Phaser from 'phaser'

export default class extends Phaser.Sprite {



  constructor ({ game, x, y, keys, name }) {
    super(game, x, y, 'p' + name)
    this.name = name
    this.anchor.setTo(0.5)

    this.vel = 5
    this.locked = false

    this.keyUp = keys[0]
    this.keyDown = keys[1]
    this.keyFire = keys[2]
  }

  update () {
    if(this.locked !== true){
      if (this.keyDown.isDown)
      {
        this.y = this.y + this.vel
      }
      else if (this.keyUp.isDown)
      {
        this.y = this.y - this.vel
      }
    }
    else {
      if (this.keyFire.isDown) {
        var diff = this.ball.x - this.x

        var force = 0
        if(this.game.indicator.x >= 640){
          force = this.game.indicator.x - 640
          force = 640 - force
        } else {
          force = this.game.indicator.x
        }

        force = force * 2;
        
        if(force <= 150){
          force = 300;
        }

        var height = this.game.indicator.y - 660;

        height = height * 10

        console.log(height)

        if(this.name == 'two'){
          this.ball.body.velocity.x = force * -1
          this.ball.body.velocity.y = height
        } else {
          this.ball.body.velocity.x = force
          this.ball.body.velocity.y = height
        }


        setTimeout(() => {
          this.locked = false
        }, 10);
      }
    }
  }

  setGravity () {
    this.body.collideWorldBounds = true
    this.body.bounce.set(1)
    this.body.immovable = true
  }

}
