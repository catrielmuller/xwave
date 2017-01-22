import Phaser from 'phaser'

export default class extends Phaser.Sprite {

    constructor ({ game, x, y }) {
        super(game, x, y, 'indicator')
        this.anchor.setTo(0.5,0.5)
    }

    update () {}

}
