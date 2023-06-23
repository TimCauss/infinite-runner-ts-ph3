import Phaser from "phaser";
import SceneKeys from "./consts/SceneKeys";
import AnimationKeys from "./consts/AnimationKeys";
import TextureKeys from "./consts/TextureKeys";

export default class Game extends Phaser.Scene {
    constructor() {
        super(SceneKeys.Game)
    }

    private background!: Phaser.GameObjects.TileSprite
    private mouseHole!: Phaser.GameObjects.Image

    create() {
        //store the width and height of the game screen:
        const width = this.scale.width
        const height = this.scale.height

        //add background, setting it to the size of the game screen and fixed to the camera:
        this.background = this.add.tileSprite(0, 0, width, height, TextureKeys.Background).setOrigin(0, 0).setScrollFactor(0, 0)

        //add mouse hole:
        this.mouseHole = this.add.image(Phaser.Math.Between(900, 1500), 501, TextureKeys.MouseHole)

        const mouse = this.physics.add.sprite(width * 0.5, height - 30, TextureKeys.RocketMouse, 'rocketmouse_fly01.png')
            .setOrigin(0.5 , 1)
            .play(AnimationKeys.RocketMouseRun)

        const body = mouse.body as Phaser.Physics.Arcade.Body
        body.setCollideWorldBounds(true)

        //Set mouse x velocity:
        body.setVelocityX(200)

        this.physics.world.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height - 30)

        this.cameras.main.startFollow(mouse)
        this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height)

    }

    update() {
        this.background.setTilePosition(this.cameras.main.scrollX)
    }

    private wrapMouseHole() {
        const scrollX = this.cameras.main.scrollX
        const rightEdge = scrollX + this.scale.width

        if (this.mouseHole.x + this.mouseHole.width < scrollX) {
            this.mouseHole.x = Phaser.Math.Between(rightEdge + 100, rightEdge + 1000)
        }
    }
}