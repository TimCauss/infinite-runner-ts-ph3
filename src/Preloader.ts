import Phaser from 'phaser'
import TextureKeys from './consts/TextureKeys'
import SceneKeys from './consts/SceneKeys'
import AnimationKeys from './consts/AnimationKeys'

export default class Preloader extends Phaser.Scene{
    constructor(){
        super(SceneKeys.Preloader)
    }

    preload() {
        //load background image
        this.load.image(TextureKeys.Background, 'house/bg_repeat_340x640.png')
        this.load.image(TextureKeys.MouseHole, 'house/object_mousehole.png')

        //lad sprite sheet with texturePacker:
        this.load.atlas(TextureKeys.RocketMouse, 'characters/rocket-mouse.png', 'characters/rocket-mouse.json')
    }

    create() {
        //Mouse run animation
        this.anims.create({
            key: AnimationKeys.RocketMouseRun, //name key of the animation
            //helper to generate frames
            frames: this.anims.generateFrameNames(TextureKeys.RocketMouse, {
                start: 1,
                end: 4,
                prefix: 'rocketmouse_run',
                zeroPad: 2,
                suffix: '.png'
            }),
            frameRate: 10,
            repeat: -1 // -1 to loop forever
        })

        this.scene.start(SceneKeys.Game)
    }
}