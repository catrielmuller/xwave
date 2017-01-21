import Phaser from 'phaser'

export default class extends Phaser.Sprite {

    constructor ({ game, x, y }) {
        super(game, x, y, 'ball')
        this.anchor.setTo(0.5,0.5)
        this.sticky = false
    }

    setGravity () {
      console.log(this.body)

      this.body.velocity.setTo(100,-100)
      this.body.collideWorldBounds = true
      this.body.bounce.set(1)
    }

    update () {
    }

}
