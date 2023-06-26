import Phaser from "phaser";
import TextureKeys from "./consts/TextureKeys";
import SceneKeys from "./consts/SceneKeys";
import AnimationKeys from "./consts/AnimationKeys";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Preloader);
  }

  preload() {
    //load background image
    this.load.image(TextureKeys.Background, "house/bg_repeat_340x640.png");
    //load moushoule image
    this.load.image(TextureKeys.MouseHole, "house/object_mousehole.png");
    //load window image
    this.load.image(TextureKeys.Window1, "house/object_window1.png");
    this.load.image(TextureKeys.Window2, "house/object_window2.png");

    //load bookcase
    this.load.image(TextureKeys.Bookcase1, "house/object_bookcase1.png");
    this.load.image(TextureKeys.Bookcase2, "house/object_bookcase2.png");

    //lad sprite sheet with texturePacker:
    this.load.atlas(
      TextureKeys.RocketMouse,
      "characters/rocket-mouse.png",
      "characters/rocket-mouse.json"
    );
  }

  create() {
    //Mouse run animation
    this.anims.create({
      key: AnimationKeys.RocketMouseRun, //name key of the animation
      //helper to generate frames
      frames: this.anims.generateFrameNames(TextureKeys.RocketMouse, {
        start: 1,
        end: 4,
        prefix: "rocketmouse_run",
        zeroPad: 2,
        suffix: ".png",
      }),
      frameRate: 10,
      repeat: -1, // -1 to loop forever
    });

    //Flame animation:
    this.anims.create({
      key: AnimationKeys.RocketFlamesOn,
      //generate frames:
      frames: this.anims.generateFrameNames(TextureKeys.RocketMouse, {
        start: 1,
        end: 2,
        prefix: "flame",
        suffix: ".png",
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.start(SceneKeys.Game);
  }
}
