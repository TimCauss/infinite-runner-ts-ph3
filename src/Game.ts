import Phaser from "phaser";

export default class Game extends Phaser.Scene {
    constructor() {
        super('game')
    }


    create() {
        //store the width and height of the game screen:
        const width = this.scale.width
        const height = this.scale.height

        //creating the background TileSprite
        this.add.tileSprite(0,0,width,height,'background').setOrigin(0)

        this.add.sprite(width * 0.5, height * 0.5, 'rocket-mouse', 'rocketmouse_fly01.png').play('rocket-mouse-run')
    }
}