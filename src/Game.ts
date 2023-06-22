import Phaser from "phaser";
import SceneKeys from "./consts/SceneKeys";
import AnimationKeys from "./consts/AnimationKeys";
import TextureKeys from "./consts/TextureKeys";

export default class Game extends Phaser.Scene {
    constructor() {
        super(SceneKeys.Game)
    }


    create() {
        //store the width and height of the game screen:
        const width = this.scale.width
        const height = this.scale.height

        //creating the background TileSprite
        this.add.tileSprite(0,0,width,height,'background').setOrigin(0)

        const mouse = this.physics.add.sprite(width * 0.5, height * 0.5, TextureKeys.RocketMouse, 'rocketmouse_fly01.png').play(AnimationKeys.RocketMouseRun)

        const body = mouse.body as Phaser.Physics.Arcade.Body
        body.setCollideWorldBounds(true)

        this.physics.world.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height - 30)
    }
}