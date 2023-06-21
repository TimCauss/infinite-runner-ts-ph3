import Phaser from "phaser";

export default class Game extends Phaser.Scene {
    constructor() {
        super('game')
    }

    preload() {
        //load background image
        this.load.image('background', 'house/bg_repeat_340x640.png')

        //lad sprite sheet with texturePacker:
        this.load.atlas('rocket-mouse', 'characters/rocket-mouse.png', 'characters/rocket-mouse.json')
    }

    create() {
        this.anims.create({
            key: 'rocket-mouse-run', //name key of the animation
            //helper to generate frames
            frames: this.anims.generateFrameNames('rocket-mouse', {
                start: 1,
                end: 4,
                prefix: 'rocketmouse_run',
                zeroPad: 2,
                suffix: '.png'
            }),
            frameRate: 10,
            repeat: -1 // -1 to loop forever
        })
        //store the width and height of the game screen:
        const width = this.scale.width
        const height = this.scale.height

        //creating the background TileSprite
        this.add.tileSprite(0,0,width,height,'background').setOrigin(0)

        this.add.sprite(width * 0.5, height * 0.5, 'rocket-mouse', 'rocketmouse_fly01.png').play('rocket-mouse-run')
    }
}