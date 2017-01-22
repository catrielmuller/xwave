import Phaser from 'phaser'

export default class extends Phaser.Sprite {

    constructor ({ game, x, y }) {
        super(game, x, y, 'pad')
        this.anchor.setTo(0.5,0.5)
        this.sticky = false
    }

    setGravity () {
      console.log(this.body)

      this.body.velocity.setTo(200,-200)
      this.body.collideWorldBounds = true
      this.body.bounce.set(1)
      this.i = 0
    }

    update () {}

}
