import Phaser from "phaser";

export default class Game extends Phaser.Scene {
    constructor() {
        super('game')
    }

    preload() {
        //load background image
        this.load.image('background', 'house/bg_repeat_340x640.png')

        //lad sprite sheet with texturePacker:
        this.load.atlas('rocket-mouse', 'characters.rocket-mouse.png', 'characters/rocket-mouse.json')
    }

    create() {

        //store the width and height of the game screen:
        const width = this.scale.width
        const height = this.scale.height

        //creating the background TileSprite
        this.add.tileSprite(0,0,width,height,'background').setOrigin(0)
    }
}