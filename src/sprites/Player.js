import Phaser from 'phaser'

export default class extends Phaser.Sprite {



  constructor ({ game, x, y, keys }) {
    super(game, x, y, 'mushroom')
    this.anchor.setTo(0.5)

    this.vel = 5
    this.lock = false

    this.keyUp = keys[0]
    this.keyDown = keys[1]
    this.keyFire = keys[2]
  }

  update () {
    if(this.lock !== true){
      if (this.keyDown.isDown)
      {
        this.y = this.y + this.vel;
      }
      else if (this.keyUp.isDown)
      {
        this.y = this.y - this.vel;
      }
    }
  }

  setGravity () {
    this.body.collideWorldBounds = true
    this.body.bounce.set(1)
    this.body.immovable = true
  }

}
